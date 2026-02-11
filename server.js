import app from "./src/app.js";
import './dotenv.config.js'
import ConnectTODb from './src/config/db.js';
ConnectTODb()





app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port ${process.env.PORT}`)
})