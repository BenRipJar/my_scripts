import axios from "axios";
import fs from "fs";
import path from "path";

/**
 * Streams data from a URL and writes it to a file
 * @param {string} url - The URL to stream from
 * @param {string} outputPath - The file path to write to
 * @param {Object} options - Additional options
 * @param {Object} options.headers - HTTP headers to include
 * @param {Object} options.auth - Authentication credentials
 * @param {number} options.timeout - Request timeout in milliseconds
 * @param {boolean} options.showProgress - Whether to show download progress
 * @param {string} options.method - HTTP method (default: 'GET')
 * @param {Object|string} options.data - Request body data
 * @param {string} options.contentType - Content type for the request body
 * @returns {Promise<void>}
 */
async function streamToFile(url, outputPath, options = {}) {
  const {
    headers = {},
    auth = null,
    timeout = 30000,
    showProgress = true,
    method = "GET",
    data = null,
    contentType = "application/json",
  } = options;

  try {
    console.log(`Starting download from: ${url}`);
    console.log(`Output file: ${outputPath}`);

    // Create directory if it doesn't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Prepare request configuration
    const requestConfig = {
      method: method,
      url: url,
      responseType: "stream",
      headers: {
        "User-Agent": "Node.js Stream Downloader",
        ...headers,
      },
      auth: auth,
      timeout: timeout,
    };

    // Add request body if provided
    if (data !== null) {
      if (typeof data === "string") {
        // Try to parse as JSON if content type is application/json
        if (contentType === "application/json") {
          try {
            requestConfig.data = JSON.parse(data);
          } catch (e) {
            // If parsing fails, send as raw string
            requestConfig.data = data;
          }
        } else {
          requestConfig.data = data;
        }
        requestConfig.headers["Content-Type"] = contentType;
      } else if (typeof data === "object") {
        if (contentType === "application/json") {
          requestConfig.data = JSON.stringify(data);
        } else {
          requestConfig.data = data;
        }
        requestConfig.headers["Content-Type"] = contentType;
      }
    }

    // Make the streaming request
    const response = await axios(requestConfig);

    // Get content length for progress tracking
    const contentLength = response.headers["content-length"];
    let downloadedBytes = 0;

    // Create write stream
    const writer = fs.createWriteStream(outputPath);

    // Handle progress tracking
    if (showProgress && contentLength) {
      response.data.on("data", (chunk) => {
        downloadedBytes += chunk.length;
        const percentage = ((downloadedBytes / contentLength) * 100).toFixed(2);
        process.stdout.write(
          `\rDownloaded: ${percentage}% (${downloadedBytes}/${contentLength} bytes)`
        );
      });
    }

    // Pipe the response to the file
    response.data.pipe(writer);

    // Return a promise that resolves when the download is complete
    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        if (showProgress) {
          console.log("\nDownload completed successfully!");
        }
        resolve();
      });

      writer.on("error", (error) => {
        console.error("\nError writing to file:", error.message);
        reject(error);
      });

      response.data.on("error", (error) => {
        console.error("\nError downloading data:", error.message);
        reject(error);
      });
    });
  } catch (error) {
    if (error.response) {
      console.error(
        `HTTP Error: ${error.response.status} - ${error.response.statusText}`
      );
      console.error(`URL: ${url}`);
    } else if (error.request) {
      console.error("Network Error: Unable to reach the server");
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
}

/**
 * Example usage and CLI interface
 */
async function main() {
  // Get command line arguments
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(
      "Usage: node writeStreamToFile.js <URL> [--output-path=<file>] [options]"
    );
    console.log("");
    console.log("Examples:");
    console.log(
      "  node writeStreamToFile.js https://example.com/api/stream --output-path=data.json"
    );
    console.log(
      "  node writeStreamToFile.js https://api.example.com/data --output-path=output/data.json"
    );
    console.log(
      "  node writeStreamToFile.js https://api.example.com/stream --output-path=data.json --basic-auth username:password"
    );
    console.log(
      '  node writeStreamToFile.js https://api.example.com/stream --output-path=data.json --method POST --data \'{"query":"test"}\''
    );
    console.log(
      "  node writeStreamToFile.js https://api.example.com/stream --output-path=data.json --method POST --data-file request.json"
    );
    console.log(
      "  node writeStreamToFile.js https://api.example.com/stream  # Uses output.txt as default"
    );
    console.log("");
    console.log("Options:");
    console.log(
      "  --output-path=<file>  Output file path (default: output.txt)"
    );
    console.log("  --no-progress    Disable download progress display");
    console.log(
      "  --timeout=30000  Set timeout in milliseconds (default: 30000)"
    );
    console.log(
      '  --header="Key:Value"  Add custom header (can be used multiple times)'
    );
    console.log('  --basic-auth="username:password"  Use basic authentication');
    console.log(
      "  --method=GET|POST|PUT|PATCH|DELETE  HTTP method (default: GET)"
    );
    console.log('  --data="..."  Request body data (JSON string or raw data)');
    console.log('  --data-file="path"  Read request body from file');
    console.log(
      '  --content-type="application/json"  Content type for request body (default: application/json)'
    );
    process.exit(1);
  }

  const url = args[0];

  // Parse additional options
  const options = {
    showProgress: true,
    timeout: 30000,
    headers: {},
    auth: null,
    method: "GET",
    data: null,
    contentType: "application/json",
    outputPath: "output.txt",
  };

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--no-progress") {
      options.showProgress = false;
    } else if (arg.startsWith("--output-path=")) {
      options.outputPath = arg.split("=")[1];
    } else if (arg === "--output-path") {
      // Handle --output-path file.txt format
      if (i + 1 < args.length) {
        options.outputPath = args[i + 1];
        i++; // Skip next argument
      } else {
        console.error("Error: --output-path requires a value");
        process.exit(1);
      }
    } else if (arg.startsWith("--timeout=")) {
      options.timeout = parseInt(arg.split("=")[1], 10);
    } else if (arg.startsWith("--header=")) {
      const header = arg.split("=")[1];
      const [key, value] = header.split(":");
      if (key && value) {
        options.headers[key.trim()] = value.trim();
      }
    } else if (arg.startsWith("--basic-auth=")) {
      const authString = arg.split("=")[1];
      const [username, password] = authString.split(":");
      if (username && password) {
        options.auth = {
          username: username.trim(),
          password: password.trim(),
        };
      } else {
        console.error(
          "Error: --basic-auth format should be 'username:password'"
        );
        process.exit(1);
      }
    } else if (arg.startsWith("--method=")) {
      const method = arg.split("=")[1].toUpperCase();
      if (["GET", "POST", "PUT", "PATCH", "DELETE"].includes(method)) {
        options.method = method;
      } else {
        console.error(
          "Error: --method must be one of: GET, POST, PUT, PATCH, DELETE"
        );
        process.exit(1);
      }
    } else if (arg === "--method") {
      // Handle --method POST format
      if (i + 1 < args.length) {
        const method = args[i + 1].toUpperCase();
        if (["GET", "POST", "PUT", "PATCH", "DELETE"].includes(method)) {
          options.method = method;
          i++; // Skip next argument
        } else {
          console.error(
            "Error: --method must be one of: GET, POST, PUT, PATCH, DELETE"
          );
          process.exit(1);
        }
      } else {
        console.error("Error: --method requires a value");
        process.exit(1);
      }
    } else if (arg.startsWith("--data=")) {
      options.data = arg.split("=")[1];
    } else if (arg === "--data") {
      // Handle --data '{"key":"value"}' format
      if (i + 1 < args.length) {
        options.data = args[i + 1];
        i++; // Skip next argument
      } else {
        console.error("Error: --data requires a value");
        process.exit(1);
      }
    } else if (arg.startsWith("--data-file=")) {
      const filePath = arg.split("=")[1];
      try {
        options.data = fs.readFileSync(filePath, "utf8");
      } catch (error) {
        console.error(`Error reading data file: ${error.message}`);
        process.exit(1);
      }
    } else if (arg.startsWith("--content-type=")) {
      options.contentType = arg.split("=")[1];
    }
  }

  try {
    await streamToFile(url, options.outputPath, options);
    console.log(`File saved successfully to: ${options.outputPath}`);
  } catch (error) {
    console.error("Download failed:", error.message);
    process.exit(1);
  }
}

// Export the function for use as a module
export { streamToFile };

// Run main function if this script is executed directly
main().catch(console.error);
