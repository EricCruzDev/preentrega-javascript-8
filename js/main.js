class Producto {
    constructor(nombre, precio, categoria, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.stock = stock;
    }
}

const productosIniciales = [
    new Producto("Pan", 1500, "Alimentos", 10),
    new Producto("Leche", 1200, "Lácteos", 8),
    new Producto("Arroz", 1800, "Alimentos", 15)
];

let productos = JSON.parse(localStorage.getItem("productos")) ?? productosIniciales;

function guardarStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

const listaProductos = document.querySelector("#listaProductos");

function mostrarProductos(lista) {
    listaProductos.innerHTML = "";

    lista.forEach((producto) => {
        listaProductos.innerHTML += `
            <article class="producto">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Categoría: ${producto.categoria}</p>
                <p>Stock: ${producto.stock}</p>
                <button class="btn-eliminar" data-nombre="${producto.nombre}">
                    Eliminar
                </button>
            </article>
        `;
    });
}

mostrarProductos(productos);

const formularioProducto = document.querySelector("#formularioProducto");

const nombreInput = document.querySelector("#nombre");
const precioInput = document.querySelector("#precio");
const categoriaInput = document.querySelector("#categoria");
const stockInput = document.querySelector("#stock");

const mensaje = document.querySelector("#mensaje");

formularioProducto.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = nombreInput.value;
    const precio = Number(precioInput.value);
    const categoria = categoriaInput.value;
    const stock = Number(stockInput.value);

    const nuevoProducto = new Producto(
        nombre,
        precio,
        categoria,
        stock
    );

    productos.push(nuevoProducto);

    mostrarProductos(productos);

    mensaje.textContent = "Producto agregado correctamente.";

    formularioProducto.reset();
});

function eliminarProducto(nombre) {
    const indice = productos.findIndex(
        (producto) => producto.nombre === nombre
    );

    if (indice !== -1) {
        productos.splice(indice, 1);
        mostrarProductos(productos);
        mensaje.textContent = "Producto eliminado correctamente.";
    }
}

listaProductos.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-eliminar")) {
        const nombre = event.target.dataset.nombre;

        eliminarProducto(nombre);
    }
});

const buscador = document.querySelector("#buscador");

buscador.addEventListener("keyup", () => {
    const textoBuscado = buscador.value.toLowerCase();

    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(textoBuscado)
    );

    mostrarProductos(productosFiltrados);
});