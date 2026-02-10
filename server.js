import app from "./src/app.js";
import './dotenv.config.js'





app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port ${process.env.PORT}`)
})