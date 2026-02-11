import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken'

/** 
* - User Register Controller
* - POST /api/auth/register
*/
export async function userRegisterController(req,res){

    const {name,email,password} = req.body

    const isExists = await userModel.findOne({
        email:email
    })

    if(isExists){
        return res.status(422).json({
            message:"user Already exists",
            status:"Failed"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password
    })

    const token = jwt.sign({
        userid:user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn:3
    })

    res.cookie("token",token)

    res.status(201).json({
        message:"User Created Successfully",
        user:{
            userid:user._id,
            email:user.email,
            name:user.name,
        },
        token
    })

}


/** 
* - User Login Controller
* - POST /api/auth/login
*/
export async function userLoginController(req,res){

    const {email,password} = req.body

    const user = await userModel.findOne({
       email:email
    }).select("+password")

    if(!user){
        return res.status(401).json({
            message:"Email or password is wrong"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if(!isValidPassword){
        return res.status(401).json({
            message:"Email or password is wrong"
        })
    }

    

    const token = jwt.sign({
        userid:user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn:3
    })

    res.cookie("token",token)

    res.status(200).json({
        message:"User LoggedIn Successfully",
        user:{
            userid:user._id,
            email:user.email,
            name:user.name,
        },
        token
    })

}








export default {
    userRegisterController,
    userLoginController
}

