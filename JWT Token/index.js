const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')

const secretkey = 'secretkey'

app.use(express.json())

app.post('/home', (req,res)=>{
    res.json({
        message:"A sample API"
    })
})

app.post('/login', (req,res)=>{
    console.log(req.body);
    const user = {
        id:1,
        name:"Ram Sharma",
        email: "ram@test.com",
        password:"asdf@2023"
    }
    if(req.body.email=== user.email && req.body.password === user.password){
        jwt.sign({user}, secretkey, {expiresIn:'300s'},(err,token)=>{
            res.json({
                token,
                name:user.name,
                id:user.id
            })
        } )
    }else{
        res.json({
            message:"Invalid User ID and Password"
        })
    }
})

app.post('/', verifyToken, (req,res)=>{
    jwt.verify(req.token, secretkey, (err, authData)=>{
        if(err){
            res.send({
                result: "Invalid token"
            })
        }else{
            res.json({
                message:"profile accessed",
                authData
            })
        }
    })

})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader!==undefined){
        const bearer =  bearerHeader.split(' ')
        const token = bearer[1]
        req.token = token
        next()
    }else{
        res.send({
            result:'Invalid Token'
        })
    }
}

app.listen(5000,()=>{
    console.log('App is running on the 5000 port');
})