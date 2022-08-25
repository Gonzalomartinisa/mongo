const express = require('express');
const productos = require('../models/productosModels')
const carrito = require('../models/carritoModels')

const routerCarrito = express.Router();

routerCarrito.post('/', async (req, res) => {
    try {
        const carritos = carrito(req.body)
        await carritos.save()
        res.json("Carrito")
    } catch (error) {
        console.log(error);
    }
})

routerCarrito.get("/:id/productos", async (req, res) => {
    try {
      const { id } = req.params;
      const productosCarro = await carrito.find({_id: id})
      if (productosCarro) {
        res.json({productosCarro});
      } else {
        res.json("No existe ese carrito");
      }
    } catch (error) {
      console.error(error);
    }
  });

  routerCarrito.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const productoEliminado = await carrito.deleteOne({_id: id});
      if (productoEliminado) {
        productoEliminado;
        res.send("El producto fue eliminado");
      } else {
        res.json("No existe ese producto");
      }
    } catch (error) {
      console.error(error);
    }
  });

  routerCarrito.post('/:id/productos', async (req, res) => {
    try {
        // const { id } = req.params;
        const producto = productos.find(req.body);
        await carrito.findOneAndUpdate(req.params.id, producto)
        res.send("El producto fue agregado al carrito");
        } catch (error) {
        console.error(error);
    }
});

module.exports = routerCarrito;
