const productos = [
    { id: 1, producto: "Platero y yo", precio: 10 },
    { id: 2, producto: "El viejo y el mar", precio: 12 },
    { id: 3, producto: "El cartero" , precio: 15},
    { id: 4, producto: "Como agua para chocolate" , precio: 20}];
    const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

//Almacenar producto por producto
for (const producto of productos) {
    guardarLocal(producto.id, JSON.stringify(producto));
}
// o almacenar array completo
guardarLocal("listaProductos", JSON.stringify(productos));

