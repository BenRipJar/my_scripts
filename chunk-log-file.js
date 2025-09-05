import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// Function to chunk the log file into smaller, readable pieces
async function chunkLogFile(inputFilePath, outputDir = "chunked_logs") {
  try {
    console.log(`Reading log file: ${inputFilePath}`);

    // Read the file content
    const fileContent = readFileSync(inputFilePath, "utf-8");
    console.log(`File size: ${fileContent.length} characters`);

    // Try to clean up the content if needed
    let cleanedContent = fileContent.trim();

    // If the content doesn't start with '[' or '{', try to find the JSON array
    if (!cleanedContent.startsWith("[") && !cleanedContent.startsWith("{")) {
      console.log("Attempting to find JSON array in file...");
      const firstBracket = cleanedContent.indexOf("[");
      if (firstBracket !== -1) {
        cleanedContent = cleanedContent.substring(firstBracket);
        console.log(`Found JSON array starting at position ${firstBracket}`);
      }
    }

    // Try to parse the JSON content with error handling
    console.log("Parsing JSON...");
    let entries;

    try {
      entries = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.log(
        `JSON parse error at position ${
          parseError.message.match(/position (\d+)/)?.[1] || "unknown"
        }`
      );
      console.log("Attempting to fix JSON...");

      // Try to find where the JSON breaks and fix it
      const errorPosition = parseInt(
        parseError.message.match(/position (\d+)/)?.[1] || "0"
      );
      console.log(`Error position: ${errorPosition}`);

      // Look for the last complete object before the error
      let lastValidPosition = 0;
      let braceCount = 0;
      let inString = false;
      let escapeNext = false;

      for (let i = 0; i < Math.min(errorPosition, cleanedContent.length); i++) {
        const char = cleanedContent[i];

        if (escapeNext) {
          escapeNext = false;
          continue;
        }

        if (char === "\\") {
          escapeNext = true;
          continue;
        }

        if (char === '"' && !escapeNext) {
          inString = !inString;
          continue;
        }

        if (!inString) {
          if (char === "{") {
            braceCount++;
          } else if (char === "}") {
            braceCount--;
            if (braceCount === 0) {
              lastValidPosition = i + 1;
            }
          }
        }
      }

      console.log(`Last valid position: ${lastValidPosition}`);

      // Try to parse up to the last valid position
      if (lastValidPosition > 0) {
        const partialContent =
          cleanedContent.substring(0, lastValidPosition) + "]";
        try {
          entries = JSON.parse(partialContent);
          console.log(
            `Successfully parsed ${entries.length} entries from partial JSON`
          );
        } catch (partialError) {
          console.error("Failed to parse partial JSON:", partialError.message);
          throw parseError; // Re-throw original error
        }
      } else {
        throw parseError; // Re-throw original error
      }
    }

    console.log(`Found ${entries.length} entries in the log file`);

    // Create output directory
    try {
      mkdirSync(outputDir, { recursive: true });
      console.log(`Created output directory: ${outputDir}`);
    } catch (error) {
      console.log(`Output directory already exists: ${outputDir}`);
    }

    // Chunk the entries into smaller files
    const chunkSize = 50; // Number of entries per chunk
    const totalChunks = Math.ceil(entries.length / chunkSize);

    console.log(
      `\nChunking ${entries.length} entries into ${totalChunks} chunks of ${chunkSize} entries each...`
    );

    for (let i = 0; i < totalChunks; i++) {
      const startIndex = i * chunkSize;
      const endIndex = Math.min(startIndex + chunkSize, entries.length);
      const chunk = entries.slice(startIndex, endIndex);

      const chunkFileName = `chunk_${String(i + 1).padStart(
        3,
        "0"
      )}_of_${String(totalChunks).padStart(3, "0")}.json`;
      const chunkFilePath = join(outputDir, chunkFileName);

      // Write chunk to file with pretty formatting
      const chunkContent = JSON.stringify(chunk, null, 2);
      writeFileSync(chunkFilePath, chunkContent, "utf-8");

      console.log(
        `Created ${chunkFileName} with ${chunk.length} entries (${chunkContent.length} characters)`
      );
    }

    // Create a summary file
    const summary = {
      totalEntries: entries.length,
      totalChunks: totalChunks,
      chunkSize: chunkSize,
      processingDate: new Date().toISOString(),
      fileInfo: {
        originalFile: inputFilePath,
        originalSize: fileContent.length,
        parsedEntries: entries.length,
      },
      statistics: generateStatistics(entries),
    };

    const summaryFilePath = join(outputDir, "summary.json");
    writeFileSync(summaryFilePath, JSON.stringify(summary, null, 2), "utf-8");
    console.log(`\nCreated summary file: ${summaryFilePath}`);

    // Create a sample file with first few entries
    const sampleEntries = entries.slice(0, 5);
    const sampleFilePath = join(outputDir, "sample_entries.json");
    writeFileSync(
      sampleFilePath,
      JSON.stringify(sampleEntries, null, 2),
      "utf-8"
    );
    console.log(`Created sample file: ${sampleFilePath}`);

    console.log(`\n✅ Successfully chunked log file into ${outputDir}/`);
    console.log(
      `📁 Total files created: ${
        totalChunks + 2
      } (${totalChunks} chunks + summary + sample)`
    );
  } catch (error) {
    console.error("Error chunking log file:", error);
    console.error("Error details:", error.message);
  }
}

// Function to generate statistics
function generateStatistics(entries) {
  const subtypeCounts = {};
  const countryCounts = {};
  const listTypeCounts = {};

  entries.forEach((entry) => {
    const doc = entry.document;

    // Count subtypes
    const subtype = doc.subtype || "unknown";
    subtypeCounts[subtype] = (subtypeCounts[subtype] || 0) + 1;

    // Count countries
    if (doc.profileLocations && doc.profileLocations.length > 0) {
      doc.profileLocations.forEach((location) => {
        const country = location.country || "unknown";
        countryCounts[country] = (countryCounts[country] || 0) + 1;
      });
    }

    // Count list types
    doc.lists.forEach((list) => {
      const listType = list.name || "unknown";
      listTypeCounts[listType] = (listTypeCounts[listType] || 0) + 1;
    });
  });

  return {
    subtypeDistribution: subtypeCounts,
    topCountries: Object.entries(countryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .reduce((obj, [country, count]) => {
        obj[country] = count;
        return obj;
      }, {}),
    listTypes: listTypeCounts,
  };
}

// Function to create a readable text version
async function createReadableText(inputFilePath, outputDir = "readable_logs") {
  try {
    console.log(`\nCreating readable text version...`);

    // Read the file content
    const fileContent = readFileSync(inputFilePath, "utf-8");

    // Try to clean up the content if needed
    let cleanedContent = fileContent.trim();

    if (!cleanedContent.startsWith("[") && !cleanedContent.startsWith("{")) {
      const firstBracket = cleanedContent.indexOf("[");
      if (firstBracket !== -1) {
        cleanedContent = cleanedContent.substring(firstBracket);
      }
    }

    // Parse JSON
    let entries;
    try {
      entries = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.log("Using partial JSON for readable version...");
      const errorPosition = parseInt(
        parseError.message.match(/position (\d+)/)?.[1] || "0"
      );
      let lastValidPosition = 0;
      let braceCount = 0;
      let inString = false;
      let escapeNext = false;

      for (let i = 0; i < Math.min(errorPosition, cleanedContent.length); i++) {
        const char = cleanedContent[i];

        if (escapeNext) {
          escapeNext = false;
          continue;
        }

        if (char === "\\") {
          escapeNext = true;
          continue;
        }

        if (char === '"' && !escapeNext) {
          inString = !inString;
          continue;
        }

        if (!inString) {
          if (char === "{") {
            braceCount++;
          } else if (char === "}") {
            braceCount--;
            if (braceCount === 0) {
              lastValidPosition = i + 1;
            }
          }
        }
      }

      if (lastValidPosition > 0) {
        const partialContent =
          cleanedContent.substring(0, lastValidPosition) + "]";
        entries = JSON.parse(partialContent);
      } else {
        throw parseError;
      }
    }

    // Create output directory
    try {
      mkdirSync(outputDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }

    // Create readable text files
    const chunkSize = 20;
    const totalChunks = Math.ceil(entries.length / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const startIndex = i * chunkSize;
      const endIndex = Math.min(startIndex + chunkSize, entries.length);
      const chunk = entries.slice(startIndex, endIndex);

      const fileName = `readable_chunk_${String(i + 1).padStart(
        3,
        "0"
      )}_of_${String(totalChunks).padStart(3, "0")}.txt`;
      const filePath = join(outputDir, fileName);

      let content = `=== LOG FILE CHUNK ${i + 1} OF ${totalChunks} ===\n`;
      content += `Entries ${startIndex + 1} to ${endIndex} of ${
        entries.length
      }\n`;
      content += `Generated: ${new Date().toISOString()}\n\n`;

      chunk.forEach((entry, index) => {
        const doc = entry.document;
        const globalIndex = startIndex + index + 1;

        content += `ENTRY ${globalIndex}\n`;
        content += `==========\n`;
        content += `ID: ${doc.id}\n`;
        content += `Name: ${doc.name}\n`;
        content += `Type: ${doc.type}\n`;
        content += `Subtype: ${doc.subtype}\n`;
        content += `Action: ${doc.action}\n`;
        content += `Active Status: ${doc.activeStatus}\n`;
        content += `First Seen: ${new Date(doc.firstSeen).toISOString()}\n`;
        content += `Last Seen: ${new Date(doc.lastSeen).toISOString()}\n`;
        content += `Lists Count: ${doc.lists.length}\n`;
        content += `Aliases Count: ${doc.aliases.length}\n`;
        content += `Profile Locations Count: ${doc.profileLocations.length}\n`;

        if (doc.identityNumbers && doc.identityNumbers.length > 0) {
          content += `Identity Numbers: ${doc.identityNumbers
            .map((id) => `${id.type}: ${id.value}`)
            .join(", ")}\n`;
        }

        if (doc.enhancedRiskCountry && doc.enhancedRiskCountry.length > 0) {
          content += `Enhanced Risk Countries: ${doc.enhancedRiskCountry.join(
            ", "
          )}\n`;
        }

        content += `\nLists:\n`;
        doc.lists.forEach((list, listIndex) => {
          content += `  ${listIndex + 1}. ${list.name} (${list.id}) - Active: ${
            list.active
          }\n`;
        });

        content += `\nProfile Locations:\n`;
        doc.profileLocations.forEach((location, locIndex) => {
          content += `  ${locIndex + 1}. ${location.country} (${
            location.country_code
          })`;
          if (location.location) {
            content += ` - Lat: ${location.location.lat}, Lon: ${location.location.lon}`;
          }
          content += `\n`;
        });

        content += `\nAliases (first 5):\n`;
        doc.aliases.slice(0, 5).forEach((alias, aliasIndex) => {
          content += `  ${aliasIndex + 1}. [${alias.type}] ${alias.name}\n`;
        });

        if (doc.aliases.length > 5) {
          content += `  ... and ${doc.aliases.length - 5} more aliases\n`;
        }

        content += `\n${"=".repeat(50)}\n\n`;
      });

      writeFileSync(filePath, content, "utf-8");
      console.log(`Created ${fileName} (${content.length} characters)`);
    }

    console.log(
      `\n✅ Successfully created readable text files in ${outputDir}/`
    );
  } catch (error) {
    console.error("Error creating readable text version:", error);
  }
}

// Main execution
const logFilePath = join(process.cwd(), "merger-digest-w-names-subtypes.log");

// Chunk the file into JSON files
await chunkLogFile(logFilePath, "chunked_logs");

// Create readable text version
await createReadableText(logFilePath, "readable_logs");
