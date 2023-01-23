const express = require("express");
const viewsRouter = express.Router();
const {ProductManager} = require("../ProductManager");

const productManager = new ProductManager();

viewsRouter.get("/", (req,res) => {
    const productosActuales = productManager.getProducts();
    res.render("home", {productosActuales});
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

module.exports.viewsRouter = viewsRouter;