import * as dotenv from "dotenv";
dotenv.config()
import app from './server'

app.listen(8814,()=>{
    console.log('listening on 8814')
})