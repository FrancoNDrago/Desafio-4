const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const {Server} = require("socket.io");
const {viewsRouter} = require("./routers/viewsRouter");
const {ProductManager} = require("./ProductManager");
const PORT = 8080;

const productManager = new ProductManager();

const httpServer = app.listen(PORT, () => console.log(`Escuchando en ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const socketServer = new Server(httpServer);
socketServer.on("connection", socket => {

  console.log("Cliente conectado. ID: " + socket.id);

  const productosActuales = productManager.getProducts();

  console.log("Datos iniciales...");
  socket.emit("cargaInicial", productosActuales);

  socket.on("altaProducto", data => {
    
    const camposFaltantes = { status: true, stock: 10, category: "undefined", thumbnails: [] };

    productoCompleto = { ...data.producto, ...camposFaltantes };

    try {
      const guardado = productManager.addProduct(productoCompleto);

      if (guardado.status) {
        socketServer.emit("nuevoProducto", productoCompleto);
      }
    } catch (error) {
        console.log("Error", error);
    }
  })
});

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);

app.get("*", (req, res) => {
  res.send("Busqueda no encontrada");
})