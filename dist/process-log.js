import { readFileSync } from "fs";
import { join } from "path";
// Function to process the log file
async function processLogFile(filePath) {
    try {
        console.log(`Reading log file: ${filePath}`);
        // Read the file content
        const fileContent = readFileSync(filePath, "utf-8");
        // Parse the JSON content
        const entries = JSON.parse(fileContent);
        console.log(`Found ${entries.length} entries in the log file`);
        // Process each entry
        entries.forEach((entry, index) => {
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
    }
    catch (error) {
        console.error("Error processing log file:", error);
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
