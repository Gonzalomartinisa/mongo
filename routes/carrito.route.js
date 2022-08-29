const express = require('express');
const productos = require('../models/productosModels')
const carrito = require('../models/carritoModels')

const routerCarrito = express.Router();

//Creo un carrito
routerCarrito.post('/', async (req, res) => {
    try {
        const carritos = carrito(req.body)
        await carritos.save()
        res.json(carritos)
    } catch (error) {
        console.log(error);
    }
})

//Todos los carritos
routerCarrito.get("/", async (req, res) =>{
  try {
      const allCarro = await carrito.find()
      res.send(allCarro)
  } catch (error) {
      console.error(error);
  }
});

//Carrito por ID
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

//Agregar productos al carrito
routerCarrito.post('/:id/productos', async (req, res) => {
  try{
     const producto = await productos.model(req.body);
     await carrito.findByIdAndUpdate(req.params.id,{
         $push: {
             'productos': producto
         } 
     })
     res.send("El producto fue agregado al carrito");
    } catch (error) {
             console.error(error);
    }
});

//Borrar productos del carrito
routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const carritos = await carrito.findById(req.params.id);
    const prodID = carritos.productos.find(product => product._id = req.params.id_prod);
    await carrito.findByIdAndUpdate(req.params.id,{
      $pull: {
          'productos': {_id:req.params.id_prod}
      } 
  })
    res.send("El producto seleccionado fue borrado del carrito")
  } catch (error) {
    console.error(error);
  }
});

module.exports = routerCarrito;
