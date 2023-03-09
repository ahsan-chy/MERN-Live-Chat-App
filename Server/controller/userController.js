const { default: mongoose } = require('mongoose')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator')
const cookieParser = require('cookie-parser')

const createToken = (_id) => {
   return  jwt.sign({_id}, process.env.SECRET, { expiresIn: '1h' })
}

// ---- Login user
const loginUser = async(req, res) =>{
    const {email, password } = req.body; 

    try{
        const user = await User.login(email, password);

        // create token
        const token = createToken(user._id)
        // -- 
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24*60*1000
        })
        // res.cookie('jwttoken', token, {expires: new Date(Date.now() + 25892000000), httpOnly: true });
        res.status(200).json({email, token})
        // res.status(200).json({user})
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}
    
// ---- Signup user
const signUp = async(req, res) =>{
    const {email, password } = req.body;
    
    // --- Get Cookie from header 
    console.log(req.cookies)
    console.log(req.cookies.jwt)

    try{
        const user = await User.signup(email, password);

        // create token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}

const restPassword = async(req, res) => {
    const {email} = req.params;
    const {password} = req.body;

    try{
        if(!email)
    {
        throw Error("Please Enter Email")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const users = await User.findOneAndUpdate({email: email},{password: hash})
    if(!users) {
        // return res.status(400).json({error: 'No user exist'})
        throw Error("No user exist")
    }

    if(!validator.isStrongPassword(password)){
        // return  res.status(400).json({message: 'Password not strong'})
        throw Error("Password not strong")
     }
    // let token;
    
    // --- Match Password
    const isMatch = await bcrypt.compare(password, users.password);
    if (isMatch) return res.status(401).send('Please Enter Different password');
    else {
            // token = createToken(users._id)
            res.status(200).json("Password Updated Successfully")
        }
        
        // return users
    

    }
    catch(error){
        res.status(400).json({error: error.message})
    }
    // VAlidation
    
}

module.exports = {
    loginUser, signUp, restPassword
}