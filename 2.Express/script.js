

const fs = require('fs')

const express = require('express')

const app = express()

app.get('/',(req,res) => {
    res.send("Hello world")
})

app.get('/about',(req,res) => {
    res.send("About page Hello Brooooh")
}
)
app.get("/user/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

app.get("/user", (req, res) => {
  res.send("GET Request to /user");
});

app.post("/user", (req, res) => {
  res.send("POST Request to /user");
});

app.put("/user", (req, res) => {
  res.send("PUT Request to /user");
});

app.all("/user", (req, res) => {
  res.send(`ALL method matched: ${req.method}`);
});




app.listen(3000,()=>{
    console.log("serveer listening in 3000");
})