import { request } from "express";
import { productModel } from "../models/product.model.js";


export default class ProductManager {
 
     //Muestra los objetos en la nube
     getProducts = async()=>{
        try{
             return await productModel.find().lean();
        }catch (err){
             return err;
        }
      
      }

    //Agrega el producto a la coleccion de la nube
    addProduct = async(obj)=> {
        try{
            await productModel.create(obj)
            return await productModel.findOne({title:obj.title});
       }catch (err){
            return err;
       }
     
    }
    

    
    //Actualiza el producto segun su id en la nube
    updateProduct=async(id, product)=>{
     try {
          if (this.validateId(id)) {   
              if (await this.getProductById(id)) {
                  await productModel.updateOne({_id:id}, product);
                  console.log("Product updated!");
      
                  return true;
              }
          }
          
          return false;
      } catch (error) {
          console.log("Not found!");
  
          return false;
      }
      }
 

    //Borra el producto de la base de datos en la nube segun el id 
    deleteProduct=async(id)=>{
     try {
          if (this.validateId(id)) {    
              if (await this.getProductById(id)) {
                  await productModel.deleteOne({_id:id});
                  console.log("Product deleted!");
  
                  return true;
              }
          }

          return false;
      } catch (error) {
          console.log("Not found!");
  
          return false;
      }
      }
    
    //Busca el producto por el id en la coleccion de la nube
    getProductsById= async(id)=>{
     try {
          return await productModel.findById(id).lean();
          
      } catch (err) {
          return {error: err.message}
      }
  
    }

    getProductByID= async(pid)=>{
     return productModel.find({_id:pid}).lean();
    }

    async getProductById(id) {
      
     return await productModel.findOne({_id:id}).lean() || null;

   

}

    validateId(id) {
     return id.length === 24 ? true : false;
 }

}






