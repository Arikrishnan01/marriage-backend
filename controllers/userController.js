const express = require('express');
const User = require('../models/userSchema');
const generateToken = require('../config/generateToken');

// FOR REGISTRATION FUNCTION
const registerUser = async(req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        res.status(404).json({
            message: "Please fill all the field"
        });
    }

    // CHECK USER EXISTS OR NOT
    const userExists = await User.findOne({ email});

    if(userExists) {
        res.status(404).json({
            message: "User already exists"
        });
    }

    // CREATE A NEW USER
    const user = await User.create({
        name,
        email,
        password
    });

    // CONSOLE THE CREATED THE  DATA
    if(user) {
       res.status(400).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: generateToken(user._id),
        message: "Register Successfully",
       })
    }
    else {
        res.status(404).json({
            message: "Field to Create New User"
        });
    }

};

// LOGIN FUNCTION
const authUser = async(req, res) => {
    const { email, password} = req.body;

        const user = await User.findOne({ email});

        if(user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
            });
        }
        else {
            res.status(404).json({
                message: "Invalid Username or Password",
            });
        }
};

module.exports = { registerUser, authUser};

