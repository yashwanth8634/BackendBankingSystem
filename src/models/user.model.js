import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email id is required for creating a account"],
        unique:[true,"Email already exists"],
        match:[/^[^@]+@[^@]+\.[^@]+$/,"Invalid Email"],
        trim:true,
        lowercase:true
    },
    name:{
        type:String,
        required:[true,"Name is required for creating account"],
    },
    password:{
        type:String,
        required:[true,"Password is required for creating account"],
        minlength:[6,"Password should be greater than 6 characters"],
        select:false
    }
},{
    timestamps:true
})

userSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        return next();
    }

    const hash = await bcrypt.hash(this.password,10)
    this.password=hash
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

const userModel = mongoose.model('user',userSchema)

export default userModel