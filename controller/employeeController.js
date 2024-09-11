const companytable = require("../models").company;


//for creating new user 
const createemployee = async (req, res) => {
    try {
// yeh kiya hai dekhne ke liye ke koi field miss toh ni kar raha user dalna waise bhi yeh optional hai 
        const { name, email, gender, mobile } = req.body;
        if (!name || !email || !gender || !mobile) {
          return res.status(400).json({
            status: false,
            message: "Missing required fields",
          });
        }
      // Check if the email already exists in the database
        const existingEmployee = await companytable.findOne({
            where: { email: req.body.email }
      });
  //agar already exists karta hai toh 
      if (existingEmployee) {
        return res.status(409).json({
          status: false,
          message: "Email already exists",
        });
      }
    else
     { // Create a new employee if email doesn't exist
      const newEmployee = await companytable.create({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        mobile: req.body.mobile,
      })
  
      res.status(201).json({
        status: true,
        message: "Profile created successfully",
        // data: newEmployee,   // if we want to show data while hitting on postman then only use 
      })}
    } catch (error) {
    //   console.error("Error occurred:", error);
      res.status(500).json({
        status: false,
        message: "Failed to insert data",
        error: error.message, // agar postman mai show karna hai error toh use karo 
      });
    }
  } 



  // for getting all user details 
  const getAllUser = async (req, res) => {
    try {
      const data = await companytable.findAll(); // Fetch all records from the company table
      if (data.length > 0) {
        res.status(200).json({
          status: true,
          message: "Employees found",
          users: data // Rename 'user' to 'users' for consistency
        });
      } else {
        res.status(404).json({
          status: false,
          message: "No employees found"
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Failed to execute",
        error: error.message //  agar postman mai show karna hai error toh use karo  ke kya error hai
      });
    }
  };
  

  const getSingleUser = async (req,res) => {
    try {
        // const { id } = req.params; // Extract the ID from request parameters
        const data = await companytable.findOne({
          where: {
            id: req.params.id // Ensure the ID is correctly used in the query
          }
        });
    
        if (data) {
          res.status(200).json({
            status: true,
            message: "Employee data found",
            user: data
          });
        } else {
          res.status(404).json({
            status: false,
            message: "No employee found with the given ID"
          });
        }
      } catch (error) {
      
        res.status(500).json({
          status: false,
          message: "Failed to fetch user details",
          // error: error.message // Include error details for debugging
        });
      }
    };


    const update =  async (req, res) => {
        try {
          const { id } = req.params; // Extract ID from request parameters
          const { name, mobile } = req.body; // Extract fields to update
      
          // Check if the employee exists
          const employee = await companytable.findOne({
            where: { id: id }
          });
      
          if (!employee) {
            return res.status(404).json({
              status: false,
              message: "No employee found with the given ID"
            });
          }
      
          // Update the employee details
          else{await companytable.update({
            name: name,
            mobile: mobile
          }, {
            where: { id: id }
          });
      
          res.status(200).json({
            status: true,
            message: "Details updated successfully"
          })
        }
      
        } catch (error) {
          res.status(500).json({
            status: false,
            message: "Failed to execute query",
            error: error.message // Include error details for debugging
          });
        }
      };


    const deleteUser = async (req, res) => {
        try {
          const { id } = req.params; // Extract ID from request parameters
      
          // Check if the employee exists
          const employee = await companytable.findOne({
            where: { id: id }
          });
      
          if (!employee) {
            return res.status(404).json({
              status: false,
              message: "No employee found with the given ID"
            });
          }
      
          // Delete the employee
        else {  await companytable.destroy({
            where: { id: id }
          });
      
          res.status(200).json({
            status: true,
            message: "Employee deleted successfully"
          });
      }
        } catch (error) {
          res.status(500).json({
            status: false,
            message: "Failed to execute query",
            error: error.message // Include error details for debugging
          });
        }
      };     
      
  module.exports = {createemployee,getAllUser,getSingleUser,update ,deleteUser}