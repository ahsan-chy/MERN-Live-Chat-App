const { default: mongoose } = require('mongoose')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

    // VAlidation
    if(!email)
    {
        throw Error("Please Enter Email")
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const users = await User.findOneAndUpdate({email: email},{password: hash})
    
    if(!users) {
        return res.status(400).json({error: 'No user exist'})
    }

    let token;
    
    // --- Match Password
    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) return res.status(401).send('Invalid password');
    else {
        token = createToken(users._id)
        res.status(200).json({email, token})
    }


    return users
}

module.exports = {
    loginUser, signUp, restPassword
}