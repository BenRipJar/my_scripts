import { readFileSync } from "fs";
import { join } from "path";

// Function to process the log file
async function processLogFile(filePath) {
  try {
    console.log(`Reading log file: ${filePath}`);

    // Read the file content
    const fileContent = readFileSync(filePath, "utf-8");

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

    // Process each entry (limit to first 10 for testing)
    const entriesToProcess = entries.slice(0, 10);
    entriesToProcess.forEach((entry, index) => {
      const doc = entry.document;
      console.log(`\n--- Entry ${index + 1} ---`);
      console.log(`ID: ${doc.id}`);
      console.log(`Name: ${doc.name}`);
      console.log(`Type: ${doc.type}`);
      console.log(`Subtype: ${doc.subtype}`);
      console.log(`Action: ${doc.action}`);
      console.log(`Active Status: ${doc.activeStatus}`);
      console.log(`First Seen: ${doc.firstSeen}`);
      console.log(`Last Seen: ${doc.lastSeen}`);
      console.log(`Lists Count: ${doc.lists.length}`);
      console.log(`Aliases Count: ${doc.aliases.length}`);
      console.log(`Profile Locations Count: ${doc.profileLocations.length}`);
    });

    // Generate statistics
    generateStatistics(entries);
  } catch (error) {
    console.error("Error processing log file:", error);
    console.error("Error details:", error.message);

    // Try to get more information about the file
    try {
      const fileContent = readFileSync(filePath, "utf-8");
      console.log(`First 500 characters of file:`);
      console.log(fileContent.substring(0, 500));
      console.log(`\nLast 500 characters of file:`);
      console.log(fileContent.substring(fileContent.length - 500));
    } catch (readError) {
      console.error("Could not read file for debugging:", readError.message);
    }
  }
}

// Function to generate statistics
function generateStatistics(entries) {
  console.log("\n=== STATISTICS ===");

  // Count by subtype
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

  console.log("\nSubtype Distribution:");
  Object.entries(subtypeCounts)
    .sort(([, a], [, b]) => b - a)
    .forEach(([subtype, count]) => {
      console.log(`  ${subtype}: ${count}`);
    });

  console.log("\nTop Countries:");
  Object.entries(countryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .forEach(([country, count]) => {
      console.log(`  ${country}: ${count}`);
    });

  console.log("\nList Types:");
  Object.entries(listTypeCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .forEach(([listType, count]) => {
      console.log(`  ${listType}: ${count}`);
    });
}

// Main execution
const logFilePath = join(process.cwd(), "merger-digest-w-names-subtypes.log");
processLogFile(logFilePath);
