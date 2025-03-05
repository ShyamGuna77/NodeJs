

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const JWT_SECRET = "iLoveOnepIece"

app.use(express.json())
const users = []
app.post('/signup',(req,res)=>{

})

app.post("/signin", (req, res) => {

});

app.get("/me",(req,res)=>{

})

app.listen(3000,()=>{
    console.log("server listening on 3000");
})