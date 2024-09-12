const express = require("express")
const app = express() ;
const bodyParser = require("body-parser")
const appRoutes = require("./router/routes")
require('dotenv').config() ; 

const PORT =  process.env.PORT || 7000 ;
 
app.use(bodyParser.json());
app.use("/",appRoutes)

app.listen(PORT,() => {
    console.log("Application stated");
    
})

