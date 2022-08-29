const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 8080

const routesProducts = require('./routes/productos.route')
const routesCarrito = require('./routes/carrito.route')

//Middleware
app.use('/api', routesProducts)
app.use('/api/carrito', routesCarrito)

app.use('/static', express.static('public'))

app.get('/', (req, res) =>{
      res.sendFile(__dirname + '/views/index.html')
});

//Rutas
app.get('/', (req, res) =>{
          res.send("Vamos carajo")
});

const server = app.listen(PORT, () => {
     console.log(`Server runing...`)
})
server.on('error', e =>console.log(`Error en server`, e))

mongoose.connect('mongodb+srv://Gonzalo:9enbGWk4Moyd65kM@cluster0.oewrg.mongodb.net/?retryWrites=true&w=majority', 
{    
}, err =>{
    if(err){console.log(err); return}

    console.log('DB conectado')
});