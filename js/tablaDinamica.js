document.addEventListener("DOMContentLoaded", function() {

    //Tabla
    document.querySelector("#boton-agregar").addEventListener("click", botonAgregar);
    document.querySelector("#boton-vaciar").addEventListener("click", botonVaciar);
    document.querySelector("#boton-agregarX3").addEventListener("click", botonAgregarX3)

    let listadoom = document.querySelector("#tbody");
    let producto = document.querySelector("#ingresoPrenda");
    let precio = document.querySelector("#ingresoPrecio");

    let ropa = [{
            "prenda": "Remera",
            "precio": 600
        },
        {
            "prenda": "Short",
            "precio": 900
        },
        {
            "prenda": "Pantalon",
            "precio": 1000
        },
        {
            "prenda": "Bolso",
            "precio": 5000
        }
    ];


    function botonAgregar() {
        if (producto.value != "" && precio.value > 0) {
            let ProductoNuevo = {
                "prenda": producto.value,
                "precio": precio.value,
            }
            ropa.push(ProductoNuevo);
            cargarTabla();
        }
    }

    function limpiarTabla() {
        listadoom.innerHTML = "";
    }

    function botonVaciar() {
        ropa = [];
        cargarTabla();
    }

    function botonAgregarX3() {
        for (let i = 0; i <= 2; i++) {
            botonAgregar();
        }
    }


    function cargarTabla() {
        limpiarTabla()
        let porcentaje = 0.15;
        for (let items of ropa) {
            let nodoTr = document.createElement("tr");
            let nodoTd1 = document.createElement("td");
            let nodoTd2 = document.createElement("td");
            if (items.precio >= 6000) {
                nodoTr.classList.add("promocion");
                nodoTd1.innerHTML = items.prenda;
                nodoTd2.innerHTML = "$" + (items.precio - (items.precio * porcentaje));
            } else {
                nodoTd1.innerHTML = items.prenda;
                nodoTd2.innerHTML = "$" + items.precio;
            }
            nodoTr.appendChild(nodoTd1);
            nodoTr.appendChild(nodoTd2);
            listadoom.appendChild(nodoTr);
        }

    }


    cargarTabla();
})