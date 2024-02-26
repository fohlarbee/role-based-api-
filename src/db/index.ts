import mongoose from "mongoose";

import env from "@/lib/env";


const connectionpOptions = {
    dbName: `rolebaseddb`,
    useUnifiedTopology: true,
  }

  try{

  }catch(error){
    
  }
mongoose.connect(env.MONGO_URI, connectionpOptions).then(() => {
    console.log('DB Connected')
}).catch((error) => {
   if(error instanceof Error)
        console.log(error.stack)
})