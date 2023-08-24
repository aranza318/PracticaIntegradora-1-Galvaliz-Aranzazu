import { cartModel } from "../models/cart.models.js";
import { productModel } from "../models/product.model.js";
import ProductManager from "../mongomanagers/productmanager.js"


const pm = new ProductManager()

class CartManager {

    //Muestra los carritos activos en la base de datos
    getCarts = async () => {
        
        try {
            const carts = await cartModel.find();
            return carts;
        } catch (err) {
            console.error('Error al obtener los carritos:', err.message);
            return [];
        }
    };
    
    // Consigue el carrito por su ID
    getCartById = async (id) => {
        try {
            const cart = await cartModel.find({_id:id}).lean();
            if(!cart) return { status: 404, response: "Carrito no encontrado" }

          
            return { status: 200, ok: true, response: cart }
        } catch (err) {
            console.error('Error al obtener el carrito por ID:', err.message);
            return err;
        }
    };
    

    addCart = async (products) => {
        try {
            let cartData = {};
            if (products && products.length > 0) {
                cartData.products = products;
            }
    
            const cart = await cartModel.create(cartData);
            return cart;
        } catch (err) {
            console.error('Error al crear el carrito:', err.message);
            return err;
        }
    };
    
    saveCart = async (cart) => {
        try {
              const existingCart = await cartModel.findOne({ _id: cart.id });
              if (existingCart) {
                    existingCart.products = cart.products;
                    return await existingCart.save();
              } else {
                    return await cartModel.create(cart);
              };
        } catch (error) {
              console.log("Error en saveCart: ", error);
              return null;
        };
  };
    async getCart(id) {
    if (this.validateId(id)) {
        return await cartModel.findOne({_id:id}).lean() || null;
    } else {
        console.log("Not found!");
        
        return null;
    }
    }

    //Agrega el producto al carrito segun su ID, funciona junto el metodo async de arriba para conseguir el ID y con la validacion de abajo
    addProducts = async (cid, pid)=>{
        try {
            if (this.validateId(cid)) {
                const cart = await this.getCart(cid);
                const product = cart.products.find(item => item.product === pid);

                if (product) {
                    product.quantity+= 1;
                } else {
                    cart.products.push({product:pid, quantity:1});
                }

                await cartModel.updateOne({_id:cid}, {products:cart.products});
                console.log("Product added!");
    
                return true;
            } else {
                console.log("Not found!");
                
                return false;
            }
        } catch (error) {
            return false
        }
    }
    
    validateId(id) {
        return id.length === 24 ? true : false;
    }

};
export default CartManager;