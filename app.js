const express = require("express")
const app = express() ;
const bodyParser = require("body-parser")
const appRoutes = require("./routes")
const PORT = 6000 ;
 
app.use(bodyParser.json());
app.use("/",appRoutes)

app.listen(PORT,() => {
    console.log("Application stated");
    
})

