const express=require("express")
const employeeRouter=express.Router()

const { employeeModel } = require("../models/employee.model")

const { auth } = require("../middlewares/auth.middleware")



employeeRouter.use(auth)


employeeRouter.post("/create",async(req,res)=>{
      try {
       const employeedetails=new employeeModel(req.body)
       await employeedetails.save()
       res.json({msg:"New employee has been added",employeedetails:req.body})
      } catch (error) {
       res.json({error:error.message})
      }
   }) 

   employeeRouter.get("/get", async (req, res) => {
    const { page: rawPage, department, sort, search } = req.query;
    const page = parseInt(rawPage) || 1;
    const pageSize = 5;
  
    try {
      const query = {};
  
      if (department) {
        query.department = department;
      }
  
      let sortQuery = {};
      if (sort === "inc") {
        sortQuery = { salary: 1 };
      } else if (sort === "dec") {
        sortQuery = { salary: -1 };
      }
  
      let searchQuery = {};
      if (search) {
        searchQuery.firstName = { $regex: search, $options: "i" };
      }
  
      const totalEmployees = await employeeModel.countDocuments(query);
      const totalPages = Math.ceil(totalEmployees / pageSize);
  
      const employees = await employeeModel
        .find(query)
        .sort(sortQuery)
        .find(searchQuery)
        .skip((page - 1) * pageSize)
        .limit(pageSize);
  
      res.status(200).send({
        currentPage: page,
        totalPages: totalPages,
        employees: employees,
        totalEmployees: totalEmployees,
      });
    } catch (error) {
      res.status(500).send({ error: "An error occurred while fetching employees" });
    }
  });
    







employeeRouter.patch("/:id",async(req,res)=>{
      const {id} = req.params
      try {
       const Updatedemp=await employeeModel.findByIdAndUpdate({_id:id},req.body)
       res.status(200).send({msg:"Employee Data has been Updated",Updatedemp})
      } catch (error) {
       res.status(400).send({error:error.message})
      }
 })



 employeeRouter.delete("/:id", async (req, res) => {
      const  id  = req.params.id;
      try {
          const deletedemp = await employeeModel.findByIdAndDelete({_id:id});
          if (deletedemp) {
              res.status(200).send({ msg: "Employee Data has been deleted", deletedemp });
          } else {
              res.status(404).send({ msg: "Employee not found" });
          }
      } catch (error) {
          res.status(400).send({ error: error.message });
      }
  });
  
 



// employeeRouter.get("/search", async (req, res) => {
//       const { firstName } = req.query;
    
//       try {
//         const employees = await employeeModel.find({ firstName });
    
//         res.status(200).send({
//           employees: employees,
//         });
//       } catch (error) {
//         res.status(400).send({ error: error.message });
//       }
//     });
    
 
module.exports={
      employeeRouter
}








