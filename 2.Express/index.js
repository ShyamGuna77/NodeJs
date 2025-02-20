// const fs = require("fs");

// console.log("Start reading file...");

// console.log("File read request sent...");
// console.log("Hello");


//=============
//Multiple Thraead pool
//============


const fs = require("fs");

console.log("Start reading files...");

fs.readFile("file1.txt", "utf8", (err, data1) => {
  if (err) console.error("Error reading file1:", err);
  else console.log("File1:", data1.slice(0, 50)); // show first 50 characters
});

fs.readFile("largefile.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    console.log("Largwe File:", data.slice(0, 100)); // show first 100 characters
  }
});

fs.readFile("file2.txt", "utf8", (err, data2) => {
  if (err) console.error("Error reading file2:", err);
  else console.log("File2:", data2.slice(0, 50)); // show first 50 characters
});

fs.readFile("file3.txt", "utf8", (err, data3) => {
  if (err) console.error("Error reading file3:", err);
  else console.log("File3:", data3.slice(0, 50)); // show first 50 characters
});

console.log("File read requests sent...");
console.log("Helo");