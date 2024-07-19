const port = process.env.PORT || 3000;

const express = require("express");
const app = express();
app.use(express.static(__dirname))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    
})

app.listen(port, (err)=>{
    if(err) console.log(err.message)
    else console.log("News Server started on port 3000");
})