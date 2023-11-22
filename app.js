const express = require("express")
const collection = require("./mongo.js")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const {mongoose} =require("mongoose")
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongodb connected");
})
.catch((err)=>{
    console.log('failed  ',err);
})

app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/Signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        Name:name,
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})

app.listen(8000,()=>{
    console.log("port connected");
})
app.get("/getAllUser",async (req,res)=>{
    try{
        const allUser = await UserActivation.find({});
        res.send({status:"ok",data:allUser});
    }
    catch(error){
        console.log(error);
    }
})