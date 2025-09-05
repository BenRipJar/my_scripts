// Complete template with ALL possible fields from the 7,226 entries
// This includes all optional fields that may not be present in every entry

export const completeTemplate = {
  document: {
    action: "add",
    id: "list_entity-urn:ripjar:ben-tes-tda-ta1",
    listId: "ben-tes-tda-ta1",
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
        // Optional list fields
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

    // Enhanced risk fields
    enhancedRiskCountry: ["Iran"],
    enhancedRiskCountryCode: ["IR"],

    // Optional fields that may not be present in all entries
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
        country: "Iran",
        country_code: "IR",
        count: 1,
        tags: ["list", "explicit", "enhancedRisk"],
        country_centroid: "Iran:29.852193343157825:-19.025696405661748",
        location: {
          lat: -19,
          lon: 29.75,
        },
        location_shape: {
          type: "Point",
          coordinates: [29.75, -19],
        },
        text: "Republic Of Iran",
        value: "Republic Of Iran",
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
      {
        type: "formerlyKnownAs",
        name: "Example Former Name",
      },
      {
        type: "primaryName",
        name: "Example Primary Name",
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

// Function to create a minimal template (only required fields)
export function createMinimalTemplate() {
  return {
    document: {
      action: "add",
      id: "list_entity-urn:ripjar:example-id",
      listId: "example-list-id",
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
      enhancedRiskCountry: ["Example Country"],
      enhancedRiskCountryCode: ["EC"],
      profileLocations: [
        {
          country: "Example Country",
          country_code: "EC",
          count: 1,
          tags: ["list", "explicit", "enhancedRisk"],
        },
      ],
      aliases: [
        {
          type: "originalScriptPrimaryName",
          name: "Example Name",
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
      id: "list_entity-urn:ripjar:example-id",
      source: "ripjar",
      unfiltered: true,
      current_format: "text/plain",
      replaceContent: true,
    },
  };
}

// Function to create a template with specific optional fields
export function createTemplateWithOptionalFields(includeFields = {}) {
  const template = JSON.parse(JSON.stringify(completeTemplate));

  // Remove optional fields if not requested
  if (!includeFields.identityNumbers) {
    delete template.document.identityNumbers;
  }
  if (!includeFields.recordStatus) {
    delete template.document.recordStatus;
  }
  if (!includeFields.lastReviewDates) {
    delete template.document.lastReviewDates;
  }
  if (!includeFields.countryOfAffiliation) {
    delete template.document.countryOfAffiliation;
    delete template.document.countryOfAffiliationCode;
  }
  if (!includeFields.listDescription) {
    template.document.lists[0].description = undefined;
  }
  if (!includeFields.listSince) {
    template.document.lists[0].since = undefined;
  }
  if (!includeFields.listAdditionalFields) {
    template.document.lists[0].additionalFields = undefined;
  }

  return template;
}

// Export the complete template
export { completeTemplate as baseTemplate };
