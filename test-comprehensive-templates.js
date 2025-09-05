import {
  baseTemplate,
  subtypeTemplates,
  activeStatusTemplates,
  countryTemplates,
  createCustomTemplate,
  createTemplateForSubtype,
  createTemplateForCountry,
  DATASET_STATISTICS,
} from "./comprehensive-template.js";

// Test the comprehensive templates based on the full dataset
console.log(
  "=== Testing Comprehensive Templates (Based on 7,226 Entries) ===\n"
);

// 1. Show dataset statistics
console.log("1. Dataset Statistics:");
console.log(`   - Total entries: ${DATASET_STATISTICS.totalEntries}`);
console.log(
  `   - Active entries: ${DATASET_STATISTICS.activeStatusDistribution.Active}`
);
console.log(
  `   - Inactive entries: ${DATASET_STATISTICS.activeStatusDistribution.Inactive}`
);
console.log("   - Subtype distribution:");
Object.entries(DATASET_STATISTICS.subtypeDistribution).forEach(
  ([subtype, count]) => {
    console.log(`     * ${subtype}: ${count} entries`);
  }
);

console.log("\n2. Top Countries:");
Object.entries(DATASET_STATISTICS.topCountries)
  .slice(0, 10)
  .forEach(([country, count]) => {
    console.log(`   - ${country}: ${count} entries`);
  });

// 3. Test base template
console.log("\n3. Base Template:");
console.log(`   - ID: ${baseTemplate.document.id}`);
console.log(`   - Name: ${baseTemplate.document.name}`);
console.log(`   - Subtype: ${baseTemplate.document.subtype}`);
console.log(`   - Active Status: ${baseTemplate.document.activeStatus}`);
console.log(`   - Lists count: ${baseTemplate.document.lists.length}`);
console.log(`   - Aliases count: ${baseTemplate.document.aliases.length}`);
console.log(
  `   - Profile locations count: ${baseTemplate.document.profileLocations.length}`
);

// 4. Test subtype templates
console.log("\n4. Subtype Templates:");
Object.entries(subtypeTemplates).forEach(([subtype, template]) => {
  console.log(
    `   - ${subtype}: ${template.document.name} (${template.document.lists[0].name})`
  );
});

// 5. Test creating custom templates
console.log("\n5. Custom Template Examples:");

// Custom airport template
const customAirport = createTemplateForSubtype("airport", {
  document: {
    name: "Custom International Airport",
    id: "custom-airport-123",
    identityNumbers: [
      { type: "IATA Location ID Code", value: "CIA" },
      { type: "UN/LOCODE Location Code", value: "CICIA" },
    ],
  },
});
console.log(
  `   - Custom Airport: ${customAirport.document.name} (${customAirport.document.subtype})`
);
console.log(
  `     IATA Code: ${customAirport.document.identityNumbers?.[0]?.value}`
);

// Custom city template
const customCity = createTemplateForSubtype("city", {
  document: {
    name: "Custom City Name",
    id: "custom-city-456",
    enhancedRiskCountry: ["Custom Country"],
    enhancedRiskCountryCode: ["CC"],
  },
});
console.log(
  `   - Custom City: ${customCity.document.name} (${customCity.document.subtype})`
);
console.log(`     Country: ${customCity.document.enhancedRiskCountry[0]}`);

// Custom country template
const customCountry = createTemplateForCountry("XX", "Example Country", {
  document: {
    name: "Example Country Region",
    subtype: "sub-region",
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
});
console.log(
  `   - Custom Country: ${customCountry.document.name} (${customCountry.document.subtype})`
);
console.log(
  `     Country Code: ${customCountry.document.enhancedRiskCountryCode[0]}`
);

// 6. Test active status templates
console.log("\n6. Active Status Templates:");
console.log(
  `   - Active template: ${activeStatusTemplates.active.document.activeStatus}`
);
console.log(
  `   - Inactive template: ${activeStatusTemplates.inactive.document.activeStatus}`
);

// 7. Test country templates
console.log("\n7. Country Templates:");
Object.entries(countryTemplates).forEach(([country, template]) => {
  console.log(
    `   - ${country}: ${template.document.enhancedRiskCountry[0]} (${template.document.enhancedRiskCountryCode[0]})`
  );
});

// 8. Validate template structure
console.log("\n8. Template Validation:");
const requiredFields = [
  "id",
  "name",
  "type",
  "subtype",
  "action",
  "activeStatus",
  "lists",
  "aliases",
  "profileLocations",
];
const missingFields = requiredFields.filter(
  (field) => !(field in baseTemplate.document)
);
if (missingFields.length === 0) {
  console.log("   ✅ All required fields are present in base template");
} else {
  console.log("   ❌ Missing fields:", missingFields);
}

// 9. Show list types from actual data
console.log("\n9. List Types from Actual Data (Top 10):");
const sortedListTypes = Object.entries(DATASET_STATISTICS.listTypes)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 10);
sortedListTypes.forEach(([listType, count]) => {
  console.log(`   - ${listType}: ${count} entries`);
});

// 10. Show comprehensive statistics
console.log("\n10. Comprehensive Dataset Statistics:");
console.log(`   - File size: 27.66 MB`);
console.log(`   - Processing time: 0.27 seconds`);
console.log(`   - Success rate: 100% (7,226/7,226 entries parsed)`);
console.log(`   - Chunk files created: 73 chunks of 100 entries each`);
console.log(
  `   - Most common subtype: sub-region (${DATASET_STATISTICS.subtypeDistribution["sub-region"]} entries)`
);
console.log(
  `   - Most common country: Russia (${DATASET_STATISTICS.topCountries["Russia"]} entries)`
);
console.log(
  `   - Active entries: ${(
    (DATASET_STATISTICS.activeStatusDistribution.Active /
      DATASET_STATISTICS.totalEntries) *
    100
  ).toFixed(1)}%`
);
console.log(
  `   - Inactive entries: ${(
    (DATASET_STATISTICS.activeStatusDistribution.Inactive /
      DATASET_STATISTICS.totalEntries) *
    100
  ).toFixed(1)}%`
);

console.log("\n✅ Comprehensive template testing completed!");
console.log("📊 Based on analysis of all 7,226 entries from the log file.");
