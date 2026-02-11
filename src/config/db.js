import mongoose from "mongoose";

function ConnectTODb(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log(`Connected to DB`)
    })
    .catch((err)=>{
        console.log(`Error:${err}`)
        process.exit(1)
    })
}

export default ConnectTODb