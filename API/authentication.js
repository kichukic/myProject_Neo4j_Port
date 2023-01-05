const { application } = require("express")
const express = require("express")
const router = express.Router()
const mongo = require('../connection/database')
const parse = require("body-parser")
const bcrypt =require("bcrypt")
const session = require("express-session")


router.use(parse.urlencoded({extended:true}))
router.use(parse.json())



router.get('/signup',(req,res)=>{
    res.render('login')
})



router.post('/signup',async(req,res)=>{
   const {username, email, password} = req.body
        const checkUserExists = await mongo.collection.findOne({email})
        try {
            if(checkUserExists === null){
                const hash =await bcrypt.hash(password,10)
                console.log(hash)
                await mongo.collection.insertMany([{username: username,email:email,password:hash}])
                res.send("data entered succes fully ")
            }else if(checkUserExists.email == req.body.email){
                res.send("user with email already exists")
            }
        } catch (error) {
            res.send("some error occured")
        }
})

router.get('/login',(req,res)=>{
    res.render('login')
})



router.post('/login',async(req,res)=>{
    
      const {email,password} = req.body
      mongo.collection.findOne({email},(err,data)=>{
        if(err){
            res.send("error occured")
        }
        if(!data){
            res.send("error no email found")
        }
         bcrypt.compare(password,data.password,(err,data)=>{
            if(err){
                res.send("some errors occured")
            }if(data){
                res.send("login success")
            }else{
                res.send('password dosent match')
            }
        })
      })
    })


module.exports = router;



