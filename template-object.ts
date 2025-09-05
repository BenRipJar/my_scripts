// Type definitions for the template object
interface Location {
  lat: number;
  lon: number;
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

// Template object with all fields populated based on the log file structure
export const templateLogEntry: LogEntry = {
  document: {
    action: "add",
    id: "list_entity-urn:ripjar:example-id-123",
    listId: "example-list-id",
    lists: [
      {
        id: "dj:minor:90",
        name: "Sub-Region",
        active: true,
        tags: ["category"],
        hierarchy: [
          {
            id: "dj:major:SIE",
            name: "Special Interest Entity (SIE)",
          },
          {
            id: "dj:mid:23",
            name: "Enhanced Country Risk",
            parent: "dj:major:SIE",
          },
          {
            id: "dj:minor:90",
            name: "Sub-Region",
            parent: "dj:mid:23",
          },
        ],
        listActive: true,
        description: "Example list description",
        since: "2025-01-01",
        additionalFields: [
          {
            key: "example_key",
            value: "example_value",
          },
        ],
      },
    ],
    metadata: {
      dates: {
        profileCreated: 1746530409475,
        profileUpdated: 1746538244385,
        arrival_client: 1752762463814,
      },
      provider: "ripjar",
      source: "Risk Profiles",
      dataSources: ["sanctions and watchlists"],
      feed_id: 39,
      confidence: {
        example_confidence: 0.95,
      },
      sourceProfileIds: ["megaCombo_entity-urn:dowjones:3166926"],
    },
    type: "location",
    firstSeen: 1456790400000,
    lastSeen: 1456790400000,
    firstSignificantSeen: 1456790400000,
    lastSignificantSeen: 1456790400000,
    lastSignificantUpdate: 1456790400000,
    naturalCreationDate: 1746530409475,
    profileNotes: "\r\n\nExample profile notes",
    activeStatus: "Active",
    significantDocuments: [],
    significantProfiles: [
      {
        type: "list",
        profileId: "megaCombo_entity-urn:dowjones:3166926",
        name: "example district",
      },
    ],
    lastModifiedDate: "2025-05-06",
    recordStatus: [
      {
        key: "status_key",
        value: "status_value",
      },
    ],
    lastReviewDates: [
      {
        key: "review_date_key",
        value: "2025-01-01",
      },
    ],
    countryOfAffiliation: ["Example Country"],
    countryOfAffiliationCode: ["EC"],
    profileLocations: [
      {
        country: "Example Country",
        country_code: "EC",
        count: 1,
        tags: ["list", "explicit", "enhancedRisk"],
        country_centroid:
          "Example Country:29.852193343157825:-19.025696405661748",
        location: {
          lat: -19,
          lon: 29.75,
        },
        location_shape: {
          type: "Point",
          coordinates: [29.75, -19],
        },
        text: "Republic Of Example Country",
        value: "Republic Of Example Country",
      },
    ],
    aliases: [
      {
        type: "originalScriptPrimaryName",
        name: "Example Name 1",
      },
      {
        type: "alsoKnownAs",
        name: "Example Name 2",
      },
      {
        type: "originalScriptName",
        name: "Example Name 3",
      },
    ],
    updateDetails: {
      id: "DCH:BULKSEND:2025-07-17T14:27",
      type: "BULKSEND",
      source: "DCH",
      description:
        "Backfill for profile reconciliation report uploaded for SYSTEM 548 at 2025-07-17T14:27",
      forceSuppression: false,
      timestamp: 1752762454884,
    },
    name: "Example District",
    subtype: "sub-region",
    identityNumbers: [
      {
        type: "IATA Location ID Code",
        value: "EXA",
      },
      {
        type: "UN/LOCODE Location Code",
        value: "ECEXA",
      },
      {
        type: "No Code",
        value: "NULL",
      },
    ],
    enhancedRiskCountry: ["Example Country"],
    enhancedRiskCountryCode: ["EC"],
    tasking: {
      derbyhat: {
        disableRecommendation: true,
        disableRollup: true,
        disableInfluence: true,
      },
    },
  },
  metadata: {
    id: "list_entity-urn:ripjar:example-id-123",
    source: "ripjar",
    unfiltered: true,
    current_format: "text/plain",
    replaceContent: true,
  },
};

// Template for different subtypes
export const templateSubtypes: Record<string, LogEntry> = {
  "sub-region": {
    ...templateLogEntry,
    document: {
      ...templateLogEntry.document,
      subtype: "sub-region",
      name: "Example Sub-Region",
    },
  },
  city: {
    ...templateLogEntry,
    document: {
      ...templateLogEntry.document,
      subtype: "city",
      name: "Example City",
      lists: [
        {
          id: "dj:minor:85",
          name: "City",
          active: true,
          tags: ["category"],
          hierarchy: [
            {
              id: "dj:major:SIE",
              name: "Special Interest Entity (SIE)",
            },
            {
              id: "dj:mid:23",
              name: "Enhanced Country Risk",
              parent: "dj:major:SIE",
            },
            {
              id: "dj:minor:85",
              name: "City",
              parent: "dj:mid:23",
            },
          ],
          listActive: true,
        },
      ],
    },
  },
  airport: {
    ...templateLogEntry,
    document: {
      ...templateLogEntry.document,
      subtype: "airport",
      name: "Example Airport",
      lists: [
        {
          id: "dj:minor:84",
          name: "Airport",
          active: true,
          tags: ["category"],
          hierarchy: [
            {
              id: "dj:major:SIE",
              name: "Special Interest Entity (SIE)",
            },
            {
              id: "dj:mid:23",
              name: "Enhanced Country Risk",
              parent: "dj:major:SIE",
            },
            {
              id: "dj:minor:84",
              name: "Airport",
              parent: "dj:mid:23",
            },
          ],
          listActive: true,
        },
      ],
    },
  },
  port: {
    ...templateLogEntry,
    document: {
      ...templateLogEntry.document,
      subtype: "port",
      name: "Example Port",
      lists: [
        {
          id: "dj:minor:88",
          name: "Port",
          active: true,
          tags: ["category"],
          hierarchy: [
            {
              id: "dj:major:SIE",
              name: "Special Interest Entity (SIE)",
            },
            {
              id: "dj:mid:23",
              name: "Enhanced Country Risk",
              parent: "dj:major:SIE",
            },
            {
              id: "dj:minor:88",
              name: "Port",
              parent: "dj:mid:23",
            },
          ],
          listActive: true,
        },
      ],
    },
  },
  region: {
    ...templateLogEntry,
    document: {
      ...templateLogEntry.document,
      subtype: "region",
      name: "Example Region",
      lists: [
        {
          id: "dj:minor:89",
          name: "Region",
          active: true,
          tags: ["category"],
          hierarchy: [
            {
              id: "dj:major:SIE",
              name: "Special Interest Entity (SIE)",
            },
            {
              id: "dj:mid:23",
              name: "Enhanced Country Risk",
              parent: "dj:major:SIE",
            },
            {
              id: "dj:minor:89",
              name: "Region",
              parent: "dj:mid:23",
            },
          ],
          listActive: true,
        },
      ],
    },
  },
  "free-trade-zone": {
    ...templateLogEntry,
    document: {
      ...templateLogEntry.document,
      subtype: "free-trade-zone",
      name: "Example Free Trade Zone",
      lists: [
        {
          id: "dj:minor:87",
          name: "Free Trade Zone",
          active: true,
          tags: ["category"],
          hierarchy: [
            {
              id: "dj:major:SIE",
              name: "Special Interest Entity (SIE)",
            },
            {
              id: "dj:mid:23",
              name: "Enhanced Country Risk",
              parent: "dj:major:SIE",
            },
            {
              id: "dj:minor:87",
              name: "Free Trade Zone",
              parent: "dj:mid:23",
            },
          ],
          listActive: true,
        },
      ],
    },
  },
};

// Function to create a template object for a specific subtype
export function createTemplateForSubtype(subtype: string): LogEntry {
  return templateSubtypes[subtype] || templateLogEntry;
}

// Function to create a template with custom values
export function createCustomTemplate(
  customValues: Partial<LogEntry> = {}
): LogEntry {
  const template = JSON.parse(JSON.stringify(templateLogEntry));

  // Deep merge custom values into template
  function deepMerge(target: any, source: any): void {
    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  deepMerge(template, customValues);
  return template;
}

// Export types for use in other files
export type {
  LogEntry,
  Document,
  DocumentMetadata,
  EntryMetadata,
  List,
  ProfileLocation,
  Alias,
  IdentityNumber,
  SignificantProfile,
  UpdateDetails,
  RecordStatus,
  LastReviewDate,
  Tasking,
  TaskingDerbyhat,
  HierarchyItem,
  Location,
  LocationShape,
};
