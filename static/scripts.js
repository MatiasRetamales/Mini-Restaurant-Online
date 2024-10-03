// Selecciona todos los botones "Agregar al carrito"
const botonesAgregar = document.querySelectorAll('.btn-agregar');

// Selecciona el área del carrito
const carrito = document.getElementById('carrito');

// Array para guardar productos del carrito
let productosCarrito = [];

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    carrito.innerHTML = ''; // Limpia el carrito

    if (productosCarrito.length === 0) {
        carrito.innerHTML = '<p>No hay productos en el carrito.</p>';
    } else {
        const lista = document.createElement('ul');
        let totalCarrito = 0; // Inicializa el total del carrito

        productosCarrito.forEach((producto, index) => {
            const item = document.createElement('li');
            const precioTotalProducto = Math.round(producto.precio * producto.cantidad); // Redondea el precio total
            item.textContent = `${producto.nombre} - $${precioTotalProducto} (cantidad: ${producto.cantidad})`;

            // Crear botón de eliminar
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList.add('btn-eliminar');
            botonEliminar.dataset.index = index; // Asociar el índice del producto

            // Crear botones de ajustar cantidad
            const botonIncrementar = document.createElement('button');
            botonIncrementar.textContent = '+';
            botonIncrementar.classList.add('btn-ajustar');
            botonIncrementar.dataset.index = index; // Asociar el índice del producto
            botonIncrementar.dataset.accion = 'incrementar';

            const botonDisminuir = document.createElement('button');
            botonDisminuir.textContent = '-';
            botonDisminuir.classList.add('btn-ajustar');
            botonDisminuir.dataset.index = index; // Asociar el índice del producto
            botonDisminuir.dataset.accion = 'disminuir';

            // Añadir los botones al ítem
            item.appendChild(botonIncrementar);
            item.appendChild(botonDisminuir);
            item.appendChild(botonEliminar);
            lista.appendChild(item);

            // Sumar al total del carrito
            totalCarrito += precioTotalProducto;
        });

        carrito.appendChild(lista);

        // Mostrar el total del carrito
        const totalElemento = document.createElement('p');
        totalElemento.textContent = `Total: $${Math.round(totalCarrito)}`;
        carrito.appendChild(totalElemento);

        // Añadir eventos a los botones de eliminar y ajustar cantidad
        agregarEventosBotones();
    }
}

// Función para ajustar la cantidad de un producto
function ajustarCantidad(index, accion) {
    if (accion === 'incrementar') {
        productosCarrito[index].cantidad++;
    } else if (accion === 'disminuir') {
        if (productosCarrito[index].cantidad > 1) {
            productosCarrito[index].cantidad--;
        } else {
            eliminarDelCarrito(index);
            return;
        }
    }
    actualizarCarrito(); // Actualizar la vista del carrito
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    productosCarrito.splice(index, 1); // Eliminar el producto del array
    actualizarCarrito(); // Actualizar la vista del carrito
}

// Función para agregar eventos a los botones de eliminar y ajustar cantidad
function agregarEventosBotones() {
    document.querySelectorAll('.btn-eliminar').forEach(boton => {
        boton.addEventListener('click', () => {
            const index = boton.dataset.index;
            eliminarDelCarrito(index);
        });
    });

    document.querySelectorAll('.btn-ajustar').forEach(boton => {
        boton.addEventListener('click', () => {
            const index = boton.dataset.index;
            const accion = boton.dataset.accion;
            ajustarCantidad(index, accion);
        });
    });
}

// Añade eventos a los botones de agregar al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (evento) => {
        const nombreProducto = evento.target.dataset.producto;
        const precioProducto = parseFloat(evento.target.dataset.precio);

        // Verificar si el producto ya está en el carrito
        const productoExistente = productosCarrito.find(p => p.nombre === nombreProducto);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            // Añadir producto al carrito
            productosCarrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
        }

        // Actualizar el carrito en la interfaz
        actualizarCarrito();
    });
});

// Función para agregar datos del carrito al formulario antes de enviarlo
function agregarDatosCarritoAlFormulario() {
    const formulario = document.getElementById('formulario-pedido');
    const campoCarrito = document.getElementById('carrito-data');
    campoCarrito.value = JSON.stringify(productosCarrito);
}

// Manejar el envío del formulario
document.getElementById('formulario-pedido').addEventListener('submit', function(evento) {
    // Agregar los datos del carrito al formulario
    agregarDatosCarritoAlFormulario();
    
    // Aquí hacer validaciones adicionales o mostrar mensajes antes de enviar el formulario
});
