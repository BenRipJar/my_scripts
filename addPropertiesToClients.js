import fs from "fs";
// import _ from "lodash";
// const {} = _;

const key = "segment";
const value = "test_segment";

// Read the JSONL file line by line
const inputFile = "./bulkclient_org_50k.jsonl";
const outputFile = `./bulkclient_${key}.jsonl`;

// Create a write stream for the output file
const writeStream = fs.createWriteStream(outputFile);

// Read the input file line by line
const readStream = fs.createReadStream(inputFile, { encoding: "utf8" });
let buffer = "";

readStream.on("data", (chunk) => {
  buffer += chunk;
  const lines = buffer.split("\n");
  buffer = lines.pop() || ""; // Keep the last incomplete line in the buffer

  lines.forEach((line) => {
    if (line.trim()) {
      try {
        const client = JSON.parse(line);
        const updatedClient = { ...client, [key]: value };
        writeStream.write(JSON.stringify(updatedClient) + "\n");
      } catch (error) {
        console.error("Error parsing line:", error);
      }
    }
  });
});

readStream.on("end", () => {
  // Process any remaining data in the buffer
  if (buffer.trim()) {
    try {
      const client = JSON.parse(buffer);
      const updatedClient = { ...client, [key]: value };
      writeStream.write(JSON.stringify(updatedClient) + "\n");
    } catch (error) {
      console.error("Error parsing final line:", error);
    }
  }
  writeStream.end();
  console.log("Processing complete");
});

readStream.on("error", (error) => {
  console.error("Error reading file:", error);
});

writeStream.on("error", (error) => {
  console.error("Error writing file:", error);
});
