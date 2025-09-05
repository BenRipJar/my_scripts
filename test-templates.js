import {
  templateLogEntry,
  templateSubtypes,
  createTemplateForSubtype,
  createCustomTemplate,
} from "./template-object.js";

// Test the template objects
console.log("=== Testing Template Objects ===\n");

// 1. Show the base template
console.log("1. Base Template Structure:");
console.log(`- Document ID: ${templateLogEntry.document.id}`);
console.log(`- Name: ${templateLogEntry.document.name}`);
console.log(`- Subtype: ${templateLogEntry.document.subtype}`);
console.log(`- Action: ${templateLogEntry.document.action}`);
console.log(`- Active Status: ${templateLogEntry.document.activeStatus}`);
console.log(`- Lists Count: ${templateLogEntry.document.lists.length}`);
console.log(`- Aliases Count: ${templateLogEntry.document.aliases.length}`);
console.log(
  `- Profile Locations Count: ${templateLogEntry.document.profileLocations.length}`
);
console.log(
  `- Identity Numbers Count: ${
    templateLogEntry.document.identityNumbers?.length || 0
  }`
);
console.log("");

// 2. Show different subtypes
console.log("2. Available Subtypes:");
Object.keys(templateSubtypes).forEach((subtype) => {
  const template = templateSubtypes[subtype];
  console.log(
    `- ${subtype}: ${template.document.name} (${template.document.lists[0].name})`
  );
});
console.log("");

// 3. Test creating a specific subtype template
console.log("3. Creating City Template:");
const cityTemplate = createTemplateForSubtype("city");
console.log(`- Name: ${cityTemplate.document.name}`);
console.log(`- Subtype: ${cityTemplate.document.subtype}`);
console.log(`- List Type: ${cityTemplate.document.lists[0].name}`);
console.log("");

// 4. Test creating a custom template
console.log("4. Creating Custom Template:");
const customTemplate = createCustomTemplate({
  document: {
    name: "Custom Location Name",
    subtype: "custom-type",
    id: "custom-id-123",
    profileLocations: [
      {
        country: "Custom Country",
        country_code: "CC",
        count: 5,
        tags: ["custom", "test"],
        location: {
          lat: 40.7128,
          lon: -74.006,
        },
      },
    ],
  },
});
console.log(`- Name: ${customTemplate.document.name}`);
console.log(`- Subtype: ${customTemplate.document.subtype}`);
console.log(`- ID: ${customTemplate.document.id}`);
console.log(
  `- Custom Location: ${customTemplate.document.profileLocations[0].country} (${customTemplate.document.profileLocations[0].location.lat}, ${customTemplate.document.profileLocations[0].location.lon})`
);
console.log("");

// 5. Show all available fields in the template
console.log("5. All Available Fields in Template:");
const fields = Object.keys(templateLogEntry.document);
console.log("Document fields:", fields.join(", "));
console.log("");

// 6. Show nested structure examples
console.log("6. Nested Structure Examples:");
console.log(
  "Metadata dates:",
  Object.keys(templateLogEntry.document.metadata.dates)
);
console.log(
  "Profile location fields:",
  Object.keys(templateLogEntry.document.profileLocations[0])
);
console.log(
  "Alias types:",
  templateLogEntry.document.aliases.map((a) => a.type)
);
console.log(
  "Identity number types:",
  templateLogEntry.document.identityNumbers?.map((i) => i.type) || []
);
console.log("");

// 7. Validate template structure
console.log("7. Template Validation:");
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
  (field) => !(field in templateLogEntry.document)
);
if (missingFields.length === 0) {
  console.log("✅ All required fields are present");
} else {
  console.log("❌ Missing fields:", missingFields);
}

console.log("\n=== Template Test Complete ===");
