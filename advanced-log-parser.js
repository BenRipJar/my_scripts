import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// Advanced JSON parser that can handle malformed JSON
class AdvancedLogParser {
  constructor(filePath) {
    this.filePath = filePath;
    this.entries = [];
    this.stats = {
      totalEntriesFound: 0,
      successfullyParsed: 0,
      failedEntries: 0,
      parsingErrors: [],
      fileSize: 0,
      processingTime: 0,
    };
  }

  // Main parsing method with multiple strategies
  async parse() {
    console.log("🔍 Starting advanced log parsing...");
    const startTime = Date.now();

    try {
      // Read the file
      const fileContent = readFileSync(this.filePath, "utf-8");
      this.stats.fileSize = fileContent.length;
      console.log(
        `📁 File size: ${(this.stats.fileSize / 1024 / 1024).toFixed(2)} MB`
      );

      // Strategy 1: Try to fix and parse the entire JSON
      console.log(
        "\n📋 Strategy 1: Attempting to fix and parse entire JSON..."
      );
      const strategy1Result = await this.strategy1_parseEntireJSON(fileContent);

      if (strategy1Result.success && strategy1Result.entries.length > 100) {
        console.log(
          `✅ Strategy 1 successful: ${strategy1Result.entries.length} entries parsed`
        );
        this.entries = strategy1Result.entries;
        this.stats.successfullyParsed = this.entries.length;
        this.stats.totalEntriesFound = this.entries.length;
      } else {
        console.log(
          `❌ Strategy 1 failed or insufficient results: ${strategy1Result.entries.length} entries`
        );

        // Strategy 2: Extract individual JSON objects
        console.log("\n📋 Strategy 2: Extracting individual JSON objects...");
        const strategy2Result = await this.strategy2_extractIndividualObjects(
          fileContent
        );

        if (strategy2Result.success && strategy2Result.entries.length > 100) {
          console.log(
            `✅ Strategy 2 successful: ${strategy2Result.entries.length} entries parsed`
          );
          this.entries = strategy2Result.entries;
          this.stats.successfullyParsed = this.entries.length;
          this.stats.totalEntriesFound = this.entries.length;
        } else {
          console.log(
            `❌ Strategy 2 failed or insufficient results: ${strategy2Result.entries.length} entries`
          );

          // Strategy 3: Line-by-line parsing
          console.log("\n📋 Strategy 3: Line-by-line parsing...");
          const strategy3Result = await this.strategy3_lineByLineParsing(
            fileContent
          );

          if (strategy3Result.success && strategy3Result.entries.length > 100) {
            console.log(
              `✅ Strategy 3 successful: ${strategy3Result.entries.length} entries parsed`
            );
            this.entries = strategy3Result.entries;
            this.stats.successfullyParsed = this.entries.length;
            this.stats.totalEntriesFound = this.entries.length;
          } else {
            console.log(
              `❌ Strategy 3 failed or insufficient results: ${strategy3Result.entries.length} entries`
            );

            // Strategy 4: Regex-based extraction
            console.log("\n📋 Strategy 4: Regex-based extraction...");
            const strategy4Result = await this.strategy4_regexExtraction(
              fileContent
            );

            console.log(
              `✅ Strategy 4 completed: ${strategy4Result.entries.length} entries parsed`
            );
            this.entries = strategy4Result.entries;
            this.stats.successfullyParsed = this.entries.length;
            this.stats.totalEntriesFound = this.entries.length;
          }
        }
      }

      this.stats.processingTime = Date.now() - startTime;

      console.log(`\n🎉 Parsing completed!`);
      console.log(`📊 Results:`);
      console.log(`   - Total entries found: ${this.stats.totalEntriesFound}`);
      console.log(`   - Successfully parsed: ${this.stats.successfullyParsed}`);
      console.log(
        `   - Processing time: ${(this.stats.processingTime / 1000).toFixed(
          2
        )} seconds`
      );

      return {
        success: this.entries.length > 0,
        entries: this.entries,
        stats: this.stats,
      };
    } catch (error) {
      console.error("❌ Error during parsing:", error.message);
      this.stats.parsingErrors.push(error.message);
      return {
        success: false,
        entries: [],
        stats: this.stats,
        error: error.message,
      };
    }
  }

  // Strategy 1: Try to fix and parse the entire JSON
  async strategy1_parseEntireJSON(content) {
    try {
      let cleanedContent = content.trim();

      // Find the start of the JSON array
      if (!cleanedContent.startsWith("[")) {
        const firstBracket = cleanedContent.indexOf("[");
        if (firstBracket !== -1) {
          cleanedContent = cleanedContent.substring(firstBracket);
        }
      }

      // Try to find where the JSON breaks and fix it
      const entries = [];
      let currentPosition = 0;
      let braceCount = 0;
      let inString = false;
      let escapeNext = false;
      let objectStart = -1;

      for (let i = 0; i < cleanedContent.length; i++) {
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
            if (braceCount === 0) {
              objectStart = i;
            }
            braceCount++;
          } else if (char === "}") {
            braceCount--;
            if (braceCount === 0 && objectStart !== -1) {
              // We have a complete object
              const objectContent = cleanedContent.substring(
                objectStart,
                i + 1
              );
              try {
                const parsedObject = JSON.parse(objectContent);
                entries.push(parsedObject);
              } catch (parseError) {
                // Skip this object if it can't be parsed
              }
              objectStart = -1;
            }
          }
        }
      }

      return {
        success: entries.length > 0,
        entries: entries,
      };
    } catch (error) {
      return {
        success: false,
        entries: [],
        error: error.message,
      };
    }
  }

  // Strategy 2: Extract individual JSON objects using regex
  async strategy2_extractIndividualObjects(content) {
    try {
      const entries = [];

      // Find all potential JSON objects using regex
      const objectRegex = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g;
      const matches = content.match(objectRegex) || [];

      console.log(`🔍 Found ${matches.length} potential JSON objects`);

      for (let i = 0; i < matches.length; i++) {
        try {
          const parsedObject = JSON.parse(matches[i]);

          // Check if this looks like a log entry
          if (parsedObject.document && parsedObject.document.id) {
            entries.push(parsedObject);
          }
        } catch (parseError) {
          // Skip invalid JSON objects
        }
      }

      return {
        success: entries.length > 0,
        entries: entries,
      };
    } catch (error) {
      return {
        success: false,
        entries: [],
        error: error.message,
      };
    }
  }

  // Strategy 3: Line-by-line parsing
  async strategy3_lineByLineParsing(content) {
    try {
      const entries = [];
      const lines = content.split("\n");

      console.log(`📄 Processing ${lines.length} lines`);

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.length > 100) {
          // Only process substantial lines
          try {
            const parsedObject = JSON.parse(line);
            if (parsedObject.document && parsedObject.document.id) {
              entries.push(parsedObject);
            }
          } catch (parseError) {
            // Try to extract JSON objects from this line
            const objectMatches =
              line.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g) || [];
            for (const match of objectMatches) {
              try {
                const parsedObject = JSON.parse(match);
                if (parsedObject.document && parsedObject.document.id) {
                  entries.push(parsedObject);
                }
              } catch (parseError) {
                // Skip invalid objects
              }
            }
          }
        }
      }

      return {
        success: entries.length > 0,
        entries: entries,
      };
    } catch (error) {
      return {
        success: false,
        entries: [],
        error: error.message,
      };
    }
  }

  // Strategy 4: Advanced regex-based extraction
  async strategy4_regexExtraction(content) {
    try {
      const entries = [];

      // Look for document objects specifically
      const documentRegex =
        /\{"document":\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}[^{}]*\}/g;
      const matches = content.match(documentRegex) || [];

      console.log(`🔍 Found ${matches.length} potential document objects`);

      for (let i = 0; i < matches.length; i++) {
        try {
          const parsedObject = JSON.parse(matches[i]);
          if (parsedObject.document && parsedObject.document.id) {
            entries.push(parsedObject);
          }
        } catch (parseError) {
          // Try to fix common JSON issues
          let fixedObject = matches[i];

          // Fix common issues
          fixedObject = fixedObject.replace(/,\s*}/g, "}"); // Remove trailing commas
          fixedObject = fixedObject.replace(/,\s*]/g, "]"); // Remove trailing commas in arrays

          try {
            const parsedObject = JSON.parse(fixedObject);
            if (parsedObject.document && parsedObject.document.id) {
              entries.push(parsedObject);
            }
          } catch (parseError) {
            // Skip this object if it still can't be parsed
          }
        }
      }

      return {
        success: entries.length > 0,
        entries: entries,
      };
    } catch (error) {
      return {
        success: false,
        entries: [],
        error: error.message,
      };
    }
  }

  // Save results to files
  async saveResults(outputDir = "advanced_parsed_logs") {
    try {
      mkdirSync(outputDir, { recursive: true });

      // Save all entries as JSON
      const allEntriesPath = join(outputDir, "all_entries.json");
      writeFileSync(
        allEntriesPath,
        JSON.stringify(this.entries, null, 2),
        "utf-8"
      );

      // Save statistics
      const statsPath = join(outputDir, "parsing_stats.json");
      writeFileSync(statsPath, JSON.stringify(this.stats, null, 2), "utf-8");

      // Create chunked files
      const chunkSize = 100;
      const totalChunks = Math.ceil(this.entries.length / chunkSize);

      for (let i = 0; i < totalChunks; i++) {
        const startIndex = i * chunkSize;
        const endIndex = Math.min(startIndex + chunkSize, this.entries.length);
        const chunk = this.entries.slice(startIndex, endIndex);

        const chunkFileName = `chunk_${String(i + 1).padStart(
          3,
          "0"
        )}_of_${String(totalChunks).padStart(3, "0")}.json`;
        const chunkFilePath = join(outputDir, chunkFileName);

        writeFileSync(chunkFilePath, JSON.stringify(chunk, null, 2), "utf-8");
      }

      // Create summary
      const summary = {
        parsingDate: new Date().toISOString(),
        totalEntries: this.entries.length,
        totalChunks: totalChunks,
        chunkSize: chunkSize,
        statistics: this.generateStatistics(),
      };

      const summaryPath = join(outputDir, "summary.json");
      writeFileSync(summaryPath, JSON.stringify(summary, null, 2), "utf-8");

      console.log(`\n💾 Results saved to ${outputDir}/`);
      console.log(`📁 Files created:`);
      console.log(`   - all_entries.json (${this.entries.length} entries)`);
      console.log(`   - parsing_stats.json`);
      console.log(`   - summary.json`);
      console.log(`   - ${totalChunks} chunk files`);
    } catch (error) {
      console.error("❌ Error saving results:", error.message);
    }
  }

  // Generate statistics about the parsed entries
  generateStatistics() {
    const subtypeCounts = {};
    const countryCounts = {};
    const listTypeCounts = {};
    const activeStatusCounts = {};

    this.entries.forEach((entry) => {
      const doc = entry.document;

      // Count subtypes
      const subtype = doc.subtype || "unknown";
      subtypeCounts[subtype] = (subtypeCounts[subtype] || 0) + 1;

      // Count active status
      const activeStatus = doc.activeStatus || "unknown";
      activeStatusCounts[activeStatus] =
        (activeStatusCounts[activeStatus] || 0) + 1;

      // Count countries
      if (doc.profileLocations && doc.profileLocations.length > 0) {
        doc.profileLocations.forEach((location) => {
          const country = location.country || "unknown";
          countryCounts[country] = (countryCounts[country] || 0) + 1;
        });
      }

      // Count list types
      if (doc.lists && doc.lists.length > 0) {
        doc.lists.forEach((list) => {
          const listType = list.name || "unknown";
          listTypeCounts[listType] = (listTypeCounts[listType] || 0) + 1;
        });
      }
    });

    return {
      subtypeDistribution: subtypeCounts,
      activeStatusDistribution: activeStatusCounts,
      topCountries: Object.entries(countryCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 20)
        .reduce((obj, [country, count]) => {
          obj[country] = count;
          return obj;
        }, {}),
      listTypes: listTypeCounts,
    };
  }
}

// Main execution
async function main() {
  const logFilePath = join(process.cwd(), "merger-digest-w-names-subtypes.log");

  console.log("🚀 Starting Advanced Log Parser");
  console.log(`📂 Processing file: ${logFilePath}`);

  const parser = new AdvancedLogParser(logFilePath);
  const result = await parser.parse();

  if (result.success) {
    console.log(`\n✅ Successfully parsed ${result.entries.length} entries!`);
    await parser.saveResults("advanced_parsed_logs");
  } else {
    console.log("\n❌ Parsing failed");
    console.log("Error:", result.error);
  }
}

// Run the parser
main().catch(console.error);
