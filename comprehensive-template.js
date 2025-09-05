// Comprehensive template objects based on the full dataset of 7,226 entries
// This includes all subtypes and variations discovered in the actual data

// Dataset statistics from the actual parsed data
export const DATASET_STATISTICS = {
  totalEntries: 7226,
  subtypeDistribution: {
    "sub-region": 4236,
    airport: 685,
    port: 513,
    city: 1083,
    region: 445,
    "free-trade-zone": 120,
    country: 144,
  },
  activeStatusDistribution: {
    Active: 6972,
    Inactive: 254,
  },
  topCountries: {
    Russia: 5430,
    Iran: 1258,
    Yemen: 836,
    Iraq: 760,
    Venezuela: 456,
    Myanmar: 418,
    Somalia: 400,
    Syria: 380,
    Libya: 360,
    Sudan: 324,
    Belarus: 322,
    "South Sudan": 282,
    "S. Sudan": 282,
    Zimbabwe: 254,
    Liberia: 246,
    Cuba: 244,
    "North Korea": 238,
    "Dem. Rep. Korea": 238,
    Ukraine: 236,
    "Cote d'Ivoire": 179,
  },
  listTypes: {
    "Sub-Region": 4236,
    Airport: 685,
    Port: 513,
    City: 1083,
    Region: 445,
    "Free Trade Zone": 120,
    "DFATD (Canada) Current Sanctions - Countries": 36,
    "FinCEN Advisories": 85,
    "FATF Strategic Deficiencies Jurisdictions": 28,
    "FATF Strategic Deficiencies Jurisdictions - On-going Process": 127,
    "EU High-Risk Third Countries List": 46,
    Country: 195,
    "FATF Non-Cooperative Countries and Territories (NCCT)": 23,
    "US Department of State Major Illicit Drug Producing & Drug-Transit Countries": 29,
    "DFAT (Australia) Arms Embargoes": 19,
    "French Non-Cooperative Countries and Territories (ETNC) List": 44,
    "EU List of Non-cooperative Jurisdictions For Tax Purposes": 47,
    "EU Embargoes On Arms And Related Materiel": 26,
    "SECO (Switzerland) Arms Embargoes": 22,
    "FinCEN Section 311 - Special Measures": 5,
    "OFAC - Country-related Sanctions Programs": 33,
    "UN SC Sanctions Committees Arms Embargoes": 19,
    "METI (Japan) Embargoes": 11,
    "MAS (Singapore) Embargoes": 4,
    "US Department of State - State Sponsors of Terrorism": 6,
    "Hong Kong Chapter 537 United Nations Sanctions Ordinance List": 22,
  },
};

// Base template for all log entries
export const baseTemplate = {
  document: {
    action: "add",
    id: "list_entity-urn:ripjar:ben-tes-tda-ta1",
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
      confidence: {},
      sourceProfileIds: ["megaCombo_entity-urn:dowjones:00000000000"],
    },
    type: "location",
    firstSeen: 1456790400000,
    lastSeen: 1456790400000,
    firstSignificantSeen: 1456790400000,
    lastSignificantSeen: 1456790400000,
    lastSignificantUpdate: 1456790400000,
    naturalCreationDate: 1746530409475,
    profileNotes: "\r\n\n",
    activeStatus: "Active",
    significantDocuments: [],
    significantProfiles: [
      {
        type: "list",
        profileId: "megaCombo_entity-urn:dowjones:00000000000",
        name: "example location",
      },
    ],
    lastModifiedDate: "2025-05-06",
    enhancedRiskCountry: ["Iran"],
    enhancedRiskCountryCode: ["IR"],
    profileLocations: [
      {
        country: "Iran",
        country_code: "IR",
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
    name: "Example Location",
    subtype: "sub-region",
    tasking: {
      derbyhat: {
        disableRecommendation: true,
        disableRollup: true,
        disableInfluence: true,
      },
    },
  },
  metadata: {
    id: "list_entity-urn:ripjar:ben-tes-tda-ta1",
    source: "ripjar",
    unfiltered: true,
    current_format: "text/plain",
    replaceContent: true,
  },
};

// Templates for each subtype based on actual data patterns
export const subtypeTemplates = {
  "sub-region": {
    ...baseTemplate,
    document: {
      ...baseTemplate.document,
      subtype: "sub-region",
      name: "Example Sub-Region",
      lists: [
        {
          id: "dj:minor:90",
          name: "Sub-Region",
          active: true,
          tags: ["category"],
          hierarchy: [
            { id: "dj:major:SIE", name: "Special Interest Entity (SIE)" },
            {
              id: "dj:mid:23",
              name: "Enhanced Country Risk",
              parent: "dj:major:SIE",
            },
            { id: "dj:minor:90", name: "Sub-Region", parent: "dj:mid:23" },
          ],
          listActive: true,
        },
      ],
    },
  },
  airport: {
    ...baseTemplate,
    document: {
      ...baseTemplate.document,
      subtype: "airport",
      name: "Example Airport",
      identityNumbers: [
        {
          type: "IATA Location ID Code",
          value: "EXA",
        },
      ],
      lists: [
        {
          id: "dj:minor:84",
          name: "Airport",
          active: true,
          tags: ["category"],
          hierarchy: [
            { id: "dj:major:SIE", name: "Special Interest Entity (SIE)" },
            {
              id: "dj:mid:23",
              name: "Enhanced Country Risk",
              parent: "dj:major:SIE",
            },
            { id: "dj:minor:84", name: "Airport", parent: "dj:mid:23" },
          ],
          listActive: true,
        },
      ],
    },
  },
  port: {
    ...baseTemplate,
    document: {
      ...baseTemplate.document,
      subtype: "port",
      name: "Example Port",
      identityNumbers: [
        {
          type: "UN/LOCODE Location Code",
          value: "ECEXP",
        },
      ],
      lists: [
        {
          id: "dj:minor:88",
          name: "Port",
          active: true,
          tags: ["category"],
          hierarchy: [
            { id: "dj:major:SIE", name: "Special Interest Entity (SIE)" },
            {
              id: "dj:mid:23",
              name: "Enhanced Country Risk",
              parent: "dj:major:SIE",
            },
            { id: "dj:minor:88", name: "Port", parent: "dj:mid:23" },
          ],
          listActive: true,
        },
      ],
    },
  },
  city: {
    ...baseTemplate,
    document: {
      ...baseTemplate.document,
      subtype: "city",
      name: "Example City",
      lists: [
        {
          id: "dj:minor:85",
          name: "City",
          active: true,
          tags: ["category"],
          hierarchy: [
            { id: "dj:major:SIE", name: "Special Interest Entity (SIE)" },
            {
              id: "dj:mid:23",
              name: "Enhanced Country Risk",
              parent: "dj:major:SIE",
            },
            { id: "dj:minor:85", name: "City", parent: "dj:mid:23" },
          ],
          listActive: true,
        },
      ],
    },
  },
  region: {
    ...baseTemplate,
    document: {
      ...baseTemplate.document,
      subtype: "region",
      name: "Example Region",
      lists: [
        {
          id: "dj:minor:89",
          name: "Region",
          active: true,
          tags: ["category"],
          hierarchy: [
            { id: "dj:major:SIE", name: "Special Interest Entity (SIE)" },
            {
              id: "dj:mid:23",
              name: "Enhanced Country Risk",
              parent: "dj:major:SIE",
            },
            { id: "dj:minor:89", name: "Region", parent: "dj:mid:23" },
          ],
          listActive: true,
        },
      ],
    },
  },
  "free-trade-zone": {
    ...baseTemplate,
    document: {
      ...baseTemplate.document,
      subtype: "free-trade-zone",
      name: "Example Free Trade Zone",
      lists: [
        {
          id: "dj:minor:91",
          name: "Free Trade Zone",
          active: true,
          tags: ["category"],
          hierarchy: [
            { id: "dj:major:SIE", name: "Special Interest Entity (SIE)" },
            {
              id: "dj:mid:23",
              name: "Enhanced Country Risk",
              parent: "dj:major:SIE",
            },
            { id: "dj:minor:91", name: "Free Trade Zone", parent: "dj:mid:23" },
          ],
          listActive: true,
        },
      ],
    },
  },
  country: {
    ...baseTemplate,
    document: {
      ...baseTemplate.document,
      subtype: "country",
      name: "Example Country",
      lists: [
        {
          id: "dj:minor:92",
          name: "Country",
          active: true,
          tags: ["category"],
          hierarchy: [
            { id: "dj:major:SIE", name: "Special Interest Entity (SIE)" },
            {
              id: "dj:mid:23",
              name: "Enhanced Country Risk",
              parent: "dj:major:SIE",
            },
            { id: "dj:minor:92", name: "Country", parent: "dj:mid:23" },
          ],
          listActive: true,
        },
      ],
    },
  },
};

// Templates for different active statuses
export const activeStatusTemplates = {
  active: {
    ...baseTemplate,
    document: {
      ...baseTemplate.document,
      activeStatus: "Active",
    },
  },
  inactive: {
    ...baseTemplate,
    document: {
      ...baseTemplate.document,
      activeStatus: "Inactive",
    },
  },
};

// Templates for top countries based on actual data
export const countryTemplates = {
  russia: {
    ...baseTemplate,
    document: {
      ...baseTemplate.document,
      enhancedRiskCountry: ["Russia"],
      enhancedRiskCountryCode: ["RU"],
      profileLocations: [
        {
          country: "Russia",
          country_code: "RU",
          count: 1,
          tags: ["list", "explicit", "enhancedRisk"],
          location: {
            lat: 61.524,
            lon: 105.3188,
          },
          location_shape: {
            type: "Point",
            coordinates: [105.3188, 61.524],
          },
        },
      ],
    },
  },
  iran: {
    ...baseTemplate,
    document: {
      ...baseTemplate.document,
      enhancedRiskCountry: ["Iran"],
      enhancedRiskCountryCode: ["IR"],
      profileLocations: [
        {
          country: "Iran",
          country_code: "IR",
          count: 1,
          tags: ["list", "explicit", "enhancedRisk"],
          location: {
            lat: 32.4279,
            lon: 53.688,
          },
          location_shape: {
            type: "Point",
            coordinates: [53.688, 32.4279],
          },
        },
      ],
    },
  },
  yemen: {
    ...baseTemplate,
    document: {
      ...baseTemplate.document,
      enhancedRiskCountry: ["Yemen"],
      enhancedRiskCountryCode: ["YE"],
      profileLocations: [
        {
          country: "Yemen",
          country_code: "YE",
          count: 1,
          tags: ["list", "explicit", "enhancedRisk"],
          location: {
            lat: 15.5527,
            lon: 48.5164,
          },
          location_shape: {
            type: "Point",
            coordinates: [48.5164, 15.5527],
          },
        },
      ],
    },
  },
};

// Function to create a template with custom values
export function createCustomTemplate(customValues = {}) {
  const template = JSON.parse(JSON.stringify(baseTemplate));

  // Deep merge custom values into template
  function deepMerge(target, source) {
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

// Function to create a template for a specific subtype
export function createTemplateForSubtype(subtype, customValues = {}) {
  const baseSubtypeTemplate = subtypeTemplates[subtype];
  return createCustomTemplate({
    ...baseSubtypeTemplate,
    ...customValues,
  });
}

// Function to create a template for a specific country
export function createTemplateForCountry(
  countryCode,
  countryName,
  customValues = {}
) {
  return createCustomTemplate({
    document: {
      ...baseTemplate.document,
      enhancedRiskCountry: [countryName],
      enhancedRiskCountryCode: [countryCode],
      profileLocations: [
        {
          country: countryName,
          country_code: countryCode,
          count: 1,
          tags: ["list", "explicit", "enhancedRisk"],
        },
      ],
    },
    ...customValues,
  });
}
