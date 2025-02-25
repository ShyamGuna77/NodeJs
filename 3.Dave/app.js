
const fs = require("fs")
fs.writeFile("example.txt", "Hello, world!  this is fs module ffuufufu", "utf8", (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("File written successfully");
});


fs.rename("example.txt", "renamed.txt", (err) => {
  if (err) {
    console.error("Error renaming file:", err);
    return;
  }
  console.log("File renamed successfully");
});




fs.appendFile("example.txt", "Shyam Mannn log entry\n", "utf8", (err) => {
  if (err) {
    console.error("Error appending to file:", err);
    return;
  }
  console.log("Content appended successfully!");
});

const logEntry = `Log entry at ${new Date().toISOString()}\n`;

fs.appendFile("log.txt", logEntry, "utf8", (err) => {
  if (err) {
    console.error("Error writing log:", err);
    return;
  }
  console.log("Log entry added:", logEntry);
});



const logData = {
  timestamp: new Date().toISOString(),
  level: "INFO",
  message: "User logged in",
};

fs.appendFile("logs.json", JSON.stringify(logData) + ",\n", "utf8", (err) => {
  if (err) {
    console.error("Error appending JSON data:", err);
    return;
  }
  console.log("JSON log appended:", logData);
});