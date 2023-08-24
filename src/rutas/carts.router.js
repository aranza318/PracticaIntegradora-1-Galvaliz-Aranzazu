import { Router, json } from "express";
import CartManager from "../dao/mongomanagers/cartmanager.js";
import {__dirname} from "../utils.js"
import ProductManager from "../dao/mongomanagers/productmanager.js";
import { productModel } from "../dao/models/product.model.js";
import { cartModel } from "../dao/models/cart.models.js";


const manager = new CartManager();
const m2 = new ProductManager();

const cartRouter = Router();

//Consigue los carros
cartRouter.get("/carts", async(req,res)=>{
  const carritos = await manager.getCarts();
  res.json({carritos})
});
//Postea un nuevo carro
cartRouter.post("/carts/", async(request, response)=>{
  try {

    let newCart = {
          products: [],
    };

    let carts = await manager.getCarts();

    if (!carts) return response.status(404).send({
          status: "error",
          payload: "No hay carritos en la base de datos"
    });

   
    let result = await manager.saveCart(newCart);

    response.send({
          status: "success",
          payload: result
    });

} catch (error) {

    console.log("Error en saveCart de carts: ", error);

    res.send({
          status: "error",
          payload: error
    });

};
});
// Busca el carro por su ID
cartRouter.get("/carts/:cid",async(request, response)=>{
  const cid = request.params.cid;
  const newCartFound = await manager.getCartById(cid);
  if (newCartFound){
  response.json({newCartFound});  
  } else {
    response.status(400).send({status:"Error", message:"No existe ese carrito"})
  }

});
//Ingrea un producto por su ID buscando previamente al carro denominado tambien por esta variable
cartRouter.post("/carts/:cid/products/:pid", async(req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const result = await manager.addProducts(cid, pid);

  if (result) {
      res.send({status:"ok", message:"El producto se agregó correctamente"});
  } else {
      res.status(400).send({status:"error", message:"No se pudo agregar el Producto al Carrito"});
  }
  
});


export default cartRouter;