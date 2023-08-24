import mongoose from "mongoose";

const connectMongo = "mongodb+srv://agalvaliz318:Imagine318@aranza.g9tojob.mongodb.net/ecommerce?retryWrites=true&w=majority";
await mongoose.connect(connectMongo,{ 
     serverSelectionTimeoutMS:5000,
});

console.log("Base de Datos conectada a la Nube");