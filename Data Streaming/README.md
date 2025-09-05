# Stream to File CLI Tool

A powerful Node.js command-line tool for making HTTP requests to streaming endpoints and saving the output to files. Supports various HTTP methods, authentication, custom headers, and request bodies.

## Installation

```bash
# Install dependencies
yarn install

# Or with npm
npm install
```

## Basic Usage

```bash
node writeStreamToFile.js <URL> [--output-path=<file>] [options]
```

## Examples

### Basic GET Request

```bash
# Uses output.txt as default
node writeStreamToFile.js https://api.example.com/stream

# Custom output file
node writeStreamToFile.js https://api.example.com/stream --output-path=data.json
```

### POST Request with JSON Data

```bash
node writeStreamToFile.js https://api.example.com/stream --output-path=data.json --method POST --data '{"query":"search term","limit":100}'
```

### With Authentication

```bash
node writeStreamToFile.js https://api.example.com/stream --output-path=data.json --basic-auth "username:password"
```

### Reading Request Body from File

```bash
node writeStreamToFile.js https://api.example.com/stream --output-path=data.json --method POST --data-file request.json
```

## Command Line Options

### Required Arguments

| Argument | Description                | Example                          |
| -------- | -------------------------- | -------------------------------- |
| `URL`    | The streaming endpoint URL | `https://api.example.com/stream` |

### Optional Arguments

#### Output Options

| Option          | Description      | Default      | Example                   |
| --------------- | ---------------- | ------------ | ------------------------- |
| `--output-path` | Output file path | `output.txt` | `--output-path=data.json` |

#### Progress and Display Options

| Option          | Description                       | Default | Example         |
| --------------- | --------------------------------- | ------- | --------------- |
| `--no-progress` | Disable download progress display | `false` | `--no-progress` |

#### Request Configuration

| Option      | Description                     | Default | Example           |
| ----------- | ------------------------------- | ------- | ----------------- |
| `--method`  | HTTP method                     | `GET`   | `--method POST`   |
| `--timeout` | Request timeout in milliseconds | `30000` | `--timeout 60000` |

#### Authentication

| Option         | Description                      | Example                    |
| -------------- | -------------------------------- | -------------------------- |
| `--basic-auth` | Basic authentication credentials | `--basic-auth "user:pass"` |

#### Request Body

| Option           | Description                                 | Example                             |
| ---------------- | ------------------------------------------- | ----------------------------------- |
| `--data`         | Request body data (JSON string or raw data) | `--data '{"key":"value"}'`          |
| `--data-file`    | Read request body from file                 | `--data-file request.json`          |
| `--content-type` | Content type for request body               | `--content-type "application/json"` |

#### Headers

| Option     | Description                                    | Example                                 |
| ---------- | ---------------------------------------------- | --------------------------------------- |
| `--header` | Add custom header (can be used multiple times) | `--header "Authorization:Bearer token"` |

## Detailed Usage Examples

### 1. Basic Streaming

```bash
# Simple GET request (uses output.txt as default)
node writeStreamToFile.js https://httpbin.org/stream/10

# Custom output file
node writeStreamToFile.js https://httpbin.org/stream/10 --output-path=output.json

# With custom timeout
node writeStreamToFile.js https://api.example.com/stream --output-path=output.json --timeout 60000
```

### 2. POST Requests with JSON

```bash
# POST with inline JSON
node writeStreamToFile.js https://api.example.com/stream --output-path=output.json \
  --method POST \
  --data '{"query":"search","filters":{"status":"active"}}'

# POST with JSON from file
echo '{"query":"complex search","options":{"limit":50}}' > request.json
node writeStreamToFile.js https://api.example.com/stream --output-path=output.json \
  --method POST \
  --data-file request.json
```

### 3. Different HTTP Methods

```bash
# PUT request
node writeStreamToFile.js https://api.example.com/update --output-path=output.json \
  --method PUT \
  --data '{"id":123,"name":"Updated Item"}'

# PATCH request
node writeStreamToFile.js https://api.example.com/patch --output-path=output.json \
  --method PATCH \
  --data '{"status":"active"}'

# DELETE request (usually no body needed)
node writeStreamToFile.js https://api.example.com/delete --output-path=output.json \
  --method DELETE
```

### 4. Authentication

```bash
# Basic authentication
node writeStreamToFile.js https://api.example.com/stream --output-path=output.json \
  --basic-auth "username:password"

# Custom authorization header
node writeStreamToFile.js https://api.example.com/stream --output-path=output.json \
  --header "Authorization:Bearer your-token-here"
```

### 5. Custom Headers

```bash
# Multiple custom headers
node writeStreamToFile.js https://api.example.com/stream --output-path=output.json \
  --header "Accept:application/json" \
  --header "X-API-Key:your-api-key" \
  --header "User-Agent:MyApp/1.0"
```

### 6. Different Content Types

```bash
# Plain text
node writeStreamToFile.js https://api.example.com/stream --output-path=output.json \
  --method POST \
  --data "Hello World" \
  --content-type "text/plain"

# XML
node writeStreamToFile.js https://api.example.com/stream --output-path=output.json \
  --method POST \
  --data "<root><item>test</item></root>" \
  --content-type "application/xml"

# Form data
node writeStreamToFile.js https://api.example.com/stream --output-path=output.json \
  --method POST \
  --data "name=John&age=30&city=New York" \
  --content-type "application/x-www-form-urlencoded"
```

### 7. Complex Scenarios

```bash
# Full-featured request with custom output
node writeStreamToFile.js https://api.example.com/stream --output-path=output.json \
  --method POST \
  --data '{"query":"sensitive search","filters":{"date":"2024-01-01"}}' \
  --basic-auth "user:pass" \
  --header "X-API-Version:2.0" \
  --header "Accept:application/json" \
  --timeout 120000 \
  --no-progress

# Simple request using default output.txt
node writeStreamToFile.js https://api.example.com/stream \
  --method POST \
  --data '{"query":"simple search"}' \
  --basic-auth "user:pass"
```

## Programmatic Usage

You can also use the script as a module in your Node.js applications:

```javascript
import { streamToFile } from "./writeStreamToFile.js";

// Basic usage (uses output.txt as default)
await streamToFile("https://api.example.com/stream", "output.txt");

// With custom output file
await streamToFile("https://api.example.com/stream", "custom-output.json");

// With options
await streamToFile("https://api.example.com/stream", "output.json", {
  method: "POST",
  data: { query: "search term", limit: 100 },
  auth: { username: "user", password: "pass" },
  headers: { "X-API-Key": "your-key" },
  timeout: 60000,
  showProgress: true,
});
```

## Error Handling

The script provides comprehensive error handling for:

- **Network errors**: Connection timeouts, DNS resolution failures
- **HTTP errors**: 4xx and 5xx status codes with detailed error messages
- **File system errors**: Permission issues, disk space, invalid paths
- **Authentication errors**: Invalid credentials, expired tokens
- **Data parsing errors**: Invalid JSON, malformed request bodies

## Output

- **Progress tracking**: Real-time download progress with percentage and byte counts
- **File creation**: Automatically creates output directories if they don't exist
- **Streaming**: Memory-efficient streaming for large responses
- **Error reporting**: Clear error messages with context

## Tips and Best Practices

1. **Default output**: If no `--output-path` is specified, the script will save to `output.txt` by default
2. **Use quotes for JSON data**: Always wrap JSON strings in single quotes to prevent shell interpretation
3. **File paths**: Use forward slashes for file paths, even on Windows
4. **Large files**: The script streams data efficiently, so it can handle very large responses
5. **Authentication**: Use `--basic-auth` for simple cases, custom headers for tokens
6. **Timeouts**: Set appropriate timeouts for your use case (default is 30 seconds)
7. **Headers**: Use `--header` multiple times for multiple custom headers
8. **Output flexibility**: You can use both `--output-path=file` and `--output-path file` formats

## Troubleshooting

### Common Issues

**"HTTP Error: 401 - Unauthorized"**

- Check your authentication credentials
- Verify the API endpoint requires authentication

**"HTTP Error: 405 - Method Not Allowed"**

- Ensure the endpoint supports the HTTP method you're using
- Check if the endpoint expects a different method

**"Error: --method requires a value"**

- Make sure to provide a value after `--method`
- Use `--method POST` not just `--method`

**"Error reading data file"**

- Verify the file path is correct
- Check file permissions
- Ensure the file exists

**"Error: --output-path requires a value"**

- Make sure to provide a file path after `--output-path`
- Use `--output-path=file.txt` or `--output-path file.txt`

**"Network Error: Unable to reach the server"**

- Check your internet connection
- Verify the URL is correct
- Check if the server is running

## License

MIT License - see package.json for details.
