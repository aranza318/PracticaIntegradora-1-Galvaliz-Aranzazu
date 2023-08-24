import { model, Schema } from "mongoose";
import { productModel } from "./product.model.js";
import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
    id:Number,
    products:Array
  
  });
  
 
export const cartModel = model(cartsCollection, cartsSchema);