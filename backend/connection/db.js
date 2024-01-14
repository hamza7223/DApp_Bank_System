import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
const mongoConnection = () =>{
    const uri = process.env.ATLAS_URI;
  
    try{
        mongoose.connect(uri);
        mongoose.connection.once('open', () => {
            console.log("MongoBD is connected successfully!!");
        })
    }catch(error){
        console.log("Error while connection to the mongo database",error);
    }
}

export default mongoConnection;