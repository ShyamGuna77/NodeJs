const fs = require("fs");

console.log("Start reading file...");
fs.readFile("largefile.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    console.log("File read successfully:", data.slice(0, 600)); // show first 100 characters
  }
});
console.log("File read request sent...");
console.log("Hello");
