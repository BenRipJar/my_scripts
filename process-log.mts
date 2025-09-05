import { readFileSync } from "fs";
import { join } from "path";

// Type definitions for the log file structure
interface Location {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  subtype: string;
  active: boolean;
  firstSeen: string;
  lastSeen: string;
  lastModifiedDate: string;
  enhancedRiskCountry: boolean;
  enhancedRiskCountryCode: string;
  profileLocations: ProfileLocation[];
  aliases: Alias[];
  updateDetails: UpdateDetails;
  significantDocuments: any[];
  significantProfiles: SignificantProfile[];
  profileNotes: string;
  activeStatus: string;
}

interface LocationShape {
  type: string;
  coordinates: number[];
}

interface ProfileLocation {
  country: string;
  country_code: string;
  count: number;
  tags: string[];
  country_centroid?: string;
  location?: Location;
  location_shape?: LocationShape;
  text?: string;
  value?: string;
}

interface Alias {
  type: string;
  name: string;
}

interface IdentityNumber {
  type: string;
  value: string;
}

interface SignificantProfile {
  type: string;
  profileId: string;
  name: string;
}

interface UpdateDetails {
  id: string;
  type: string;
  source: string;
  description: string;
  forceSuppression: boolean;
  timestamp: number;
}

interface RecordStatus {
  key: string;
  value: string;
}

interface LastReviewDate {
  key: string;
  value: string;
}

interface TaskingDerbyhat {
  disableRecommendation: boolean;
  disableRollup: boolean;
  disableInfluence: boolean;
}

interface Tasking {
  derbyhat: TaskingDerbyhat;
}

interface DocumentMetadata {
  dates: {
    profileCreated: number;
    profileUpdated: number;
    arrival_client: number;
  };
  provider: string;
  source: string;
  dataSources: string[];
  feed_id: number;
  confidence: Record<string, any>;
  sourceProfileIds: string[];
}

interface EntryMetadata {
  id: string;
  source: string;
  unfiltered: boolean;
  current_format: string;
  replaceContent: boolean;
}

interface HierarchyItem {
  id: string;
  name: string;
  parent?: string;
}

interface List {
  id: string;
  name: string;
  active: boolean;
  tags: string[];
  hierarchy: HierarchyItem[];
  listActive: boolean;
  description?: string;
  since?: string;
  additionalFields?: Array<{
    key: string;
    value: string;
  }>;
}

interface Document {
  action: string;
  id: string;
  listId: string;
  lists: List[];
  metadata: DocumentMetadata;
  type: string;
  firstSeen: number;
  lastSeen: number;
  firstSignificantSeen: number;
  lastSignificantSeen: number;
  lastSignificantUpdate: number;
  naturalCreationDate: number;
  profileNotes: string;
  activeStatus: string;
  significantDocuments: any[];
  significantProfiles: SignificantProfile[];
  lastModifiedDate: string;
  recordStatus?: RecordStatus[];
  lastReviewDates?: LastReviewDate[];
  countryOfAffiliation?: string[];
  countryOfAffiliationCode?: string[];
  profileLocations: ProfileLocation[];
  aliases: Alias[];
  updateDetails: UpdateDetails;
  name: string;
  subtype: string;
  identityNumbers?: IdentityNumber[];
  enhancedRiskCountry?: string[];
  enhancedRiskCountryCode?: string[];
  tasking: Tasking;
}

interface LogEntry {
  document: Document;
  metadata: EntryMetadata;
}

// Function to process the log file
async function processLogFile(filePath: string): Promise<void> {
  try {
    console.log(`Reading log file: ${filePath}`);

    // Read the file content
    const fileContent = readFileSync(filePath, "utf-8");

    // Parse the JSON content
    const entries: LogEntry[] = JSON.parse(fileContent);

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
  } catch (error) {
    console.error("Error processing log file:", error);
  }
}

// Function to generate statistics
function generateStatistics(entries: LogEntry[]): void {
  console.log("\n=== STATISTICS ===");

  // Count by subtype
  const subtypeCounts: { [key: string]: number } = {};
  const countryCounts: { [key: string]: number } = {};
  const listTypeCounts: { [key: string]: number } = {};

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
