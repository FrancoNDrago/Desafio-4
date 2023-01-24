let listaInicialCargada = false;
const socket = io();
socket.emit("mensaje");

socket.on("cargaInicial", listaProductos => {
    
    if (!listaInicialCargada) {
        agregarProductos(listaProductos);

        listaInicialCargada = true;
    }
});

socket.on("nuevoProducto", producto => {
    agregarProductos(producto);
})


$botonSubmit = document.getElementById("boton_guardar_producto");

$botonSubmit.addEventListener("click", event => {
    event.preventDefault();

    let producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        price: document.getElementById("price").value,
    };

    socket.emit("altaProducto", {producto});

    document.getElementById("alta_producto").reset();
})


function agregarProductos(listaProductos) {
    listaProductos.forEach(producto => {
        agregarProducto(producto);
    });
}

function agregarProducto(producto) {
    let fila = document.createElement("tr");

    let title = document.createElement("td");
    title.innerHTML = producto.title;

    let description = document.createElement("td");
    description.innerHTML = producto.description;

    let code = document.createElement("td");
    code.innerHTML = producto.code;

    let price = document.createElement("td");
    price.innerHTML = producto.price;


    fila.appendChild(title);
    fila.appendChild(description);
    fila.appendChild(code);
    fila.appendChild(price);

    document.getElementById("productosActuales").appendChild(fila);

}
