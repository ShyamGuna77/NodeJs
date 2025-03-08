

const express  = require('express')
const app = express()

const url = "mongodb+srv://Shyam:Shyamprasad7d@cluster0.5bdd4.mongodb.net/";

app.use(express.json())

app.post('signup',(req,res)=>{

})
app.post("signin", (req, res) => {});

app.post("todo", (req, res) => {});

app.get("todos", (req, res) => {});


app.listen(3000,()=>{
    console.log("Port Listening On 3000");
})