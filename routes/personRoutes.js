const express = require('express')
const router = express.Router()
const Person = require("../models/Person");

//POST route to add a person
router.post("/", async (req, res) => {
    try {
      //req.body holds the data sent by the client i.e.Person data
      const data = req.body;
  
      //Create a new Person document using mongoose model
      const newPerson = new Person(data);
  
      //No need to write the below lines if you pass the data in the above line.
      // newPerson.name = data.name
      // newPerson.age = data.age
      // newPerson.work = data.work
      // newPerson.mobile = data.mobile
      // newPerson.email = data.email
      // newPerson.address = data.address
      // newPerson.salary = data.salary
  
      //Save the new person to the database
      const response = await newPerson.save();
      console.log("Data saved");
      console.log("Response for saving data: ", response);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error while saving data to database",
      });
    }
  });
  
  //Get Method for fetching person's data.
  router.get("/", async (req, res) => {
    try {
      const data = await Person.find();
      console.log("Data Fetched");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error while fetching data from database",
      });
    }
  });
  
  //Get Method for specific workType
  router.get("/:workType", async (req, res) => {
    try {
      const workType = req.params.workType; // Extract workType from URL parameter
      if (workType == "chef" || workType == "manager" || workType == "waiter") {
        const response = await Person.find({ work: workType });
        res.status(200).json(response);
      } else {
        res.status(404).json({
          error: "Invalid workType",
        });
      }
    } catch (error) {
        res.status(500).json({
            error: 'Error while fetching info'
        })
    }
  });

//Update
  router.put('/:id', async (req,res) => {
    try {
        //Extract the ID from the URL parameter
        const personId = req.params.id 
        //Updated data for the person
        const updatedPersonData = req.body

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData, {
             new: true, //return the updated document
             runValidators: true //Run mongoose validation
        })

        if(!response){
            return res.status(404).json({
                error: 'Person not found'
            })
        }

        console.log("Data updated")
        res.status(200).json(response)
    }
    catch(error) {
        res.status(500).json({
            error: 'Error while updating data'
        })
    }
  })

//Delete 
router.delete('/:id', async (req,res) => {
    try {
       
        //Extract the person's ID from the URL parameter
        const personId = req.params.id 

        const response = await Person.findByIdAndDelete(personId)

        if(!response){
            return res.status(404).json({
                error: 'Person not found'
            })
        }
        console.log("Data updated")
        res.status(200).json(response)
    }
    catch(error) {
        res.status(500).json({
            error: 'Error while deleting data'
        })
    }
})

module.exports = router
  