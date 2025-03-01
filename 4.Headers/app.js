const fs = require('fs')

const express = require("express")
const app = express()

// app.get("/",(req,res)=>{
//     console.log("first request 1 here");
//     res.send("response 1")
// })

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next(); // Pass control to the next middleware
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("Second request 1 here");
//     next();
//     res.send("usr Response 2");
//   },
//   (req, res,next) => {
//     console.log("Third request 1 here");
//     res.send("user Response 3");
//     next();
//   },
//   (req, res,next) => {
//     console.log("fourth request 1 here");
//     res.send("user Response 4");
//     next();
//   }
// );


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})