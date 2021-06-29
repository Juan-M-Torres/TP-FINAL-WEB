document.addEventListener("DOMContentLoaded", function() {

    let baseUrl = 'https://60c908907dafc90017ffc025.mockapi.io/api/productos/';
    let tbody = document.getElementById("tbody");
    let ingresoPrenda = document.getElementById("prenda");
    let ingresoPrecio = document.getElementById("precio");
    let arregloInterno = [];


    function obtenerDatos() {
        fetch(baseUrl)
            .then(response => response.json())
            .then(productos => cargarTabla(productos))
            .catch(error => console.log(error))
    }

    function cargarTabla(productos) {
        for (let elems of productos) {
            let arr = {
                "id": elems.id,
                "prenda": elems.prenda.toLowerCase(),
                "precio": elems.precio,
            }
            arregloInterno.push(arr);
        }
        limpiarTabla();
        for (let elems of productos) {
            let botonBorrar = document.createElement("button");
            let botonEditar = document.createElement("button");
            botonBorrar.innerHTML = "Borrar";
            botonEditar.innerHTML = "Editar";
            let nodoTr = document.createElement("tr");
            let nodoTd = document.createElement("td");
            let nodoTd1 = document.createElement("td");
            let nodoTd2 = document.createElement("td");
            let nodoTd3 = document.createElement("td");
            nodoTd.innerHTML = elems.prenda;
            nodoTd1.innerHTML = "$" + elems.precio;
            nodoTr.id = elems.id;
            botonBorrar.addEventListener("click", e => eliminarProducto(elems.id));
            botonEditar.addEventListener("click", e => editarProducto(elems.id));
            nodoTd2.appendChild(botonBorrar);
            nodoTd3.appendChild(botonEditar);
            nodoTr.appendChild(nodoTd);
            nodoTr.appendChild(nodoTd1);
            nodoTr.appendChild(nodoTd2);
            nodoTr.appendChild(nodoTd3);
            tbody.appendChild(nodoTr);
        }
    }

    function agregarPrenda() {
        if (ingresoPrecio.value != "" && ingresoPrenda.value != "") {
            let ingresoProducto = {
                "prenda": ingresoPrenda.value,
                "precio": ingresoPrecio.value
            }
            fetch(baseUrl, {
                    "method": "POST",
                    "mode": 'cors',
                    "headers": { "Content-Type": "application/json" },
                    "body": JSON.stringify(ingresoProducto)
                }).then(function(r) {
                    if (!r.ok) {
                        console.log("error")
                    }
                    return r.json()
                })
                .then(function() {
                    obtenerDatos();
                })
                .catch(function(e) {
                    console.log(e)
                })
        }

    }

    function agregar3productos() {
        for (let i = 0; i <= 2; i++) {
            agregarPrenda();
        }
    }

    function eliminarProducto(id) {
        fetch(baseUrl + "/" + id, {
            "method": "DELETE",
            "mode": 'cors',
        }).then(function(r) {
            if (!r.ok) {
                console.log("error")
            }
            return r.json()
        }).then(function() {
            obtenerDatos();
        }).catch(function(e) {
            console.log(e)
        })
    }


    function editarProducto(id) {
        if (ingresoPrecio.value != "" && ingresoPrenda.value != "") {
            let ingresoProducto = {
                "prenda": ingresoPrenda.value,
                "precio": ingresoPrecio.value
            }
            fetch(baseUrl + "/" + id, {
                    "method": "PUT",
                    "mode": 'cors',
                    "headers": { "Content-Type": "application/json" },
                    "body": JSON.stringify(ingresoProducto)
                }).then(function(r) {
                    if (!r.ok) {
                        console.log("error")
                    }
                    return r.json()
                })
                .then(function() {
                    obtenerDatos();
                })
                .catch(function(e) {
                    console.log(e)
                })
        }
    }

    function limpiarTabla() {
        tbody.innerHTML = "";
    }

    //filtrado de tabla
    function filtrarTabla() {
        ocultarLosTr();
        let inputFiltro = document.getElementById("input-filtro").value;
        for (let elem of arregloInterno) {
            if (elem.prenda.includes(inputFiltro)) {
                document.getElementById(elem.id).classList.remove("inputOculto");
            }
            if (elem.precio === inputFiltro) {
                document.getElementById(elem.id).classList.remove("inputOculto");
            }
        }
    }


    function ocultarLosTr() {
        let ocultarTr = tbody.querySelectorAll("tr");
        for (let elem of ocultarTr) {
            elem.classList.add("inputOculto");
        }
    }

    function desocultarLosTr() {
        let mostrarTr = tbody.querySelectorAll("tr");
        for (let elem of mostrarTr) {
            elem.classList.remove("inputOculto");

        }
    }






    obtenerDatos();
    document.getElementById("agregar").addEventListener("click", agregarPrenda);
    document.getElementById("agregarX3").addEventListener("click", agregar3productos);
    document.getElementById("filtro-tabla").addEventListener("click", filtrarTabla);
    document.getElementById("desfiltrar-tabla").addEventListener("click", desocultarLosTr);
})