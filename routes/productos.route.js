const express = require('express');
const productos = require('../models/productosModels')

const router = express.Router();

//Crear producto
router.post("/productos", async (req, res) => {
    try {
        const producto = productos(req.body);
        await producto.save()
        res.json("Se creo un producto nuevo")
    } catch (error) {
        console.error(error);
    }
});

//Traer todos los productos
router.get("/productos", async (req, res) =>{
    try {
        const allProduct = await productos.find()
        res.send(allProduct)
    } catch (error) {
        console.error(error);
    }
});

//Buscar producto por ID
router.get("/productos/:id", async (req, res) =>{
    try {
        const productoEncontrado = await productos.findById(req.params.id)
        if (productoEncontrado) {
            res.send(productoEncontrado)
        } else {
            res.json("No existe ese producto")
        }
        } catch (error) {
        console.error(error);
    }
});

//Actualizar productos
router.put("/productos/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        const {title, autor, img, price, stock} = req.body;
        await productos.updateOne({_id: id}, {$set:{title, autor, img, price, stock}})
        res.json("El producto fue actualizado")
    } catch (error) {
        console.error(error);
    }
});

//Borrar productos
router.delete("/productos/:id", async (req, res) =>{
    try{
        const { id } = req.params;
        await productos.deleteOne({_id: id})
        res.json("El productofue fue borrado")
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;