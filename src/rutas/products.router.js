import { Router } from "express";
import ProductManager from "../dao/mongomanagers/productmanager.js";
import { __dirname } from "../utils.js";
import { productModel } from "../dao/models/product.model.js";
import { mongo , ObjectId } from "mongoose";


const productsRouter = Router();
const manager = new ProductManager();

//Obtiene la lista de productos
productsRouter.get("/products", async (request, response)=>{
        const products = await manager.getProducts();
        if(products.lenght === 0){
            response.json("No hay productos aqui")
        } else{
            response.json({mesagge: "success", products})        
        }
   
});

//Obtiene el producto por su id
productsRouter.get("/products/:pid", async (request, response)=>{
   const pid = request.params.pid;
   const product = await manager.getProductByID(pid);
   response.send({product}) 
});

//Agrega un nuevo producto
productsRouter.post("/products", async (request,response)=>{
    const obj= request.body;
    const newProduct = await manager.addProduct(obj);
    response.json({status:"success", newProduct})
});

//Actualiza el producto
productsRouter.put("/products/:pid", async (req,res)=>{
    let pid = req.params.pid;
    let {title, description, code, price, status, stock, category, thumbnail} = req.body;

    if (!title) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Title!"});
        return false;
    }

    if (!description) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Description!"});
        return false;
    }

    if (!code) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Code!"});
        return false;
    }

    if (!price) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Price!"});
        return false;
    }

    status = !status && true;

    if (!stock) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Stock!"});
        return false;
    }

    if (!category) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Category!"});
        return false;
    }

    if (!thumbnail) {
        res.status(400).send({status:"error", message:"Error! No se cargó el campo Thumbnail!"});
        return false;
    }

    const result = await manager.updateProduct(pid, {title, description, code, price, status, stock, category, thumbnail});

    if (result) {
        res.send({status:"ok", message:"El Producto se actualizó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo actualizar el Producto!"});
    }
});

//Borra el producto por su ID
productsRouter.delete("/products/:pid", async (req, res) => {
    let pid = req.params.pid;
    const result = await manager.deleteProduct(pid)

    if (result) {
        res.send({status:"ok", message:"El Producto se eliminó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo eliminar el Producto!"});
    }
});

export default productsRouter;