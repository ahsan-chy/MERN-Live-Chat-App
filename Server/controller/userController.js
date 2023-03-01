const { default: mongoose } = require('mongoose')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
   return  jwt.sign({_id}, process.env.SECRET, { expiresIn: '1m' })
}

// ---- Login user
const loginUser = async(req, res) =>{
    const {email, password } = req.body; 

    try{
        const user = await User.login(email, password);

        // create token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}

// ---- Signup user
const signUp = async(req, res) =>{
    const {email, password } = req.body; 

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

module.exports = {
    loginUser, signUp
}