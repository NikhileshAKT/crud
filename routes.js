const express = require("express") ;
const router  =express.Router() ;
const companytable = require("./models").company;

// create api 
router.post("/create" ,(req,res) => {
//this is done so email can't be duplicate 
    companytable.findOne({
        where:{
            email:req.body.email
        }

    }).then((data) => {
        if(data){
            res.json({
                status: false,
                message:"Email already exists"
            })
        }
        else {
            //this is for creating new user 
            companytable.create({
                name:req.body.name,
                email:req.body.email,
                gender:req.body.gender,
                mobile:req.body.mobile
            }).then((success) => {
                res.json({
                    status: true ,
                    message:"Profile created "
                });
            }).catch((error) =>{
                res.json({
                    status:false,
                    message:"Failed to insert "
                })
            })
        }

    }).catch((error) => {
        res.json({
            status:false,
            message:"Failed to execute query"
        })
    })
})

// for getting all user details 
router.get("/alluser", (req,res) => {
    companytable.findAll()
    .then((data) =>{
            if(data){
                res.json({
                    status: true,
                    message: "Employes found ",
                    user: data 
                })
            }else{
                res.json({
                    status: false,
                    message:"No employee found"
                })
            }
    }).catch((error) => {
        res.json({
            status:false,
            message:"Failed to execute"
        })
    } )
})

// for getting a single user by id 
router.get("/singleUser/:id",(req,res) => {
    companytable.findOne({
        where:{
            id: req.params.id
        }
    }).then((data) => {
            if(data){
                res.json({
                    status:true,
                    message:"Employee data found ",
                    user: data
                })
            }else{
                res.json({
                    status:false,
                    message: "No employee found with the given data "
                })
            }
    }).catch((error) => {
        res.json({
            status:false,
            message: "failed to fetch single user"
        })
    })
})


// for updating the user details 
router.put("/update/:id", (req,res) => {
    companytable.findOne({
        where: {
            id:req.params.id
        }
    }).then((data) => {
            if(data){
                    companytable.update({
                        name: req.body.name,
                     mobile: req.body.mobile
                    },{
                        where:{
                            id : req.params.id
                        }
                    }).then((data) => {
                        res.json({
                            status:true,
                            message:"Details updated successfully"
                        })        
                    }).catch((error) => {
                        res.json({
                            status:false,
                            message:"Failed to execute query"
                        })
                    })
            }else{
                res.json({
                    status:false,
                    message:"No Employee Found with given ID"
                })
            }
    }).catch((error) => {
        res.json({
            status:false,
            message:"Failed to execute query"
        })
    })
}) 



//deleting user from database 
router.delete("/delete/:id" , (req,res) => {
    companytable.findOne({
        where: {
            id: req.params.id
        }
    }).then((data) => {
            if(data){
                companytable.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then((data) => {
                    res.json({
                        status:true,
                        message:"Employee deleted successfully"
                    })
                }).catch((error) => {
                    res.json({
                        status:false,
                        message:"No Employee found"
                    })
                })
            }else{
                res.json({
                    status:false,
                    message:"No Employee found"
                })
            }
    }).catch((error) => {
        res.json({
            status:false,
            message:"Failed to execute query"
        })
    })
})
router.get("/" ,(req,res) => {
    res.json({
        status: true ,
        message : "Welcome to page "
    })
})

module.exports = router ;
