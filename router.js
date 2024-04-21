const express = require("express");
const router = express.Router();
const users = require("../modals/userSchema");

router.post("/register", async (req, res) => {
    try {
        const { name, email, age, mobile, work, add, desc } = req.body;

        // Check if all required fields are present
        if (!name || !email || !age || !mobile || !work || !add || !desc) {
            return res.status(400).json({ error: "Please provide all required fields" });
        }

        // Check if the user already exists
        const existingUser = await users.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: "This user is already registered" });
        }

        // Create a new user
        const newUser = new users({
            name, email, age, mobile, work, add, desc
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with the new user object
        res.status(201).json(newUser);
        console.log(newUser);
    } catch (error) {
        // Handle errors
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// get all data stored 
router.get("/getdata",async(req,res)=>{
    try{
        const userdata = await users.find();
        res.status(201).json(userdata);
        console.log(userdata);

    }catch(error){
        res.status(422).json(error);
        console.log(error);
    }
})

// get indivisual user
router.get("/getuser/:id", async (req, res) => {
    try {
        console.log(req.params); // Log the value of the "id" parameter
        const {id} = req.params;
        const userindivisual = await users.findById({_id:id});
        console.log(userindivisual);
        res.status(201).json(userindivisual);
    } catch (error) {
        console.log(error);
        res.status(422).json(error);
    }
});

// update user 
router.patch("/update/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const deleteuser = await users.findByIdAndUpdate(id,req.body,{
            new : true
        })
        console.log(deleteuser);
        res.status(201).json(deleteuser);
    }catch(error){
        console.log(error);
        res.status(422).json(error);
    }
})
// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const deleteuser = await users.findByIdAndDelete({_id:id});
        console.log(deleteuser);
        res.status(201).json(deleteuser);
    }catch(error){
        console.log(error);
        res.status(422).json(error);
    }
})
module.exports = router;
