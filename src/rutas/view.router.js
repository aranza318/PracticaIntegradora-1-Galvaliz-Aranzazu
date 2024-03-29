import { Router } from "express";
import ProductManager from "../dao/mongomanagers/productmanager.js";
import { __dirname } from "../utils.js";

const pmanager = new ProductManager();
const router = Router();

//Obtiene la lista de productos
router.get("/", async(req,res)=>{
    const listaProductos = await pmanager.getProducts();
    console.log(listaProductos);
    res.render("home", {listaProductos});
});

//Acceso al formulario
router.get("/realtimeProducts", (req,res)=>{
    res.render("realtimeProducts");
});

//Acceso al chat
router.get("/chat", (req,res)=>{
    res.render("chat")
});



export default router;
