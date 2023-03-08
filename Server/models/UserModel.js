const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator')

//Schema - Schema Define the structure of particular document or type of document inside database
const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,
        required: true
    },
}, {timestamps: true})

// -- Static Signup Method
userSchema.statics.signup = async function(email, password) {

    // VAlidation
    if(!email || !password)
    {
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error('Email Is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong Enough')
    }

    const exists = await this.findOne({ email })

    if(exists)
    {
        throw Error('Email Already in use')
    }

    // 
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
}


// -- Static Login Method
userSchema.statics.login = async function(email, password) {

    if(!email || !password)
    {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ email })

    if(!user)
    {
        throw Error('Email Does not exist')
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match)
    {
        throw Error("Incorrect password");
    }

    return user
}

//Model - Model help us to apply the schema
module.exports = mongoose.model('User', userSchema)