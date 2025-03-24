import fs from "fs";
import _ from "lodash";
const { flattenDeep, uniq } = _;

// Synchronous reading
const jsonData = JSON.parse(fs.readFileSync("./input.json", "utf8"));

const parseObject = (obj, nesting = "") => {
  let result = [];
  Object.entries(obj).forEach(([key, value]) => {
    const thisNesting = nesting.length ? `${nesting}.${key}` : key;
    result.push(thisNesting);

    if (Array.isArray(value)) {
      result = result.concat(
        flattenDeep(value.map((o) => parseObject(o, thisNesting)))
      );
    } else if (typeof value === "object" && value !== null) {
      result = result.concat(flattenDeep(parseObject(value, thisNesting)));
    }
  });
  return result;
};

const result = parseObject(jsonData);
const uniquePaths = uniq(result);

// Write to console
console.log(uniquePaths);

// Write to file as a JSON array
fs.writeFileSync("./output.json", JSON.stringify(uniquePaths, null, 2), "utf8");
