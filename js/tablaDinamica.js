document.addEventListener("DOMContentLoaded", function() {

    let baseUrl = 'https://60c908907dafc90017ffc025.mockapi.io/api/productos/'; //Creo una variable con en link a mi API
    let tbody = document.getElementById("tbody"); //Agarro a el tbody con su id 
    let ingresoPrenda = document.getElementById("prenda"); //Agarro a prenda con su id 
    let ingresoPrecio = document.getElementById("precio"); //Agarro precio con su id 
    let arregloInterno = []; //Creo un arreglo interno el cual me va a servir para filtrar la tabla localmente


    function obtenerDatos() { //Creo una funcion para obtener los datos de mi Api
        fetch(baseUrl) //Tomo la url de mi api y hago una promesa 
            .then(response => response.json()) //Proceso la respuesta y digo que es un objeto Json
            .then(productos => cargarTabla(productos)) //Proceso los datos y cargo la tabla
            .catch(error => console.log(error)) //El código dentro de catch() se ejecutará si se produce un error al invocar la API de su elección.
    }

    function cargarTabla(productos) { //Creo la funcion cargar tabla
        for (let elems of productos) { //Recorro el arreglo 
            let arr = {
                "id": elems.id,
                "prenda": elems.prenda.toLowerCase(), //Lo ingresado en el input lo coloca en minusculas
                "precio": elems.precio,
            }
            arregloInterno.push(arr); //Agrego los elementos de la tabla en el arreglo interno 
        }
        limpiarTabla(); //Limpio la tabla para que no se dupliquen los datos 
        for (let elems of productos) { //Recorro el arreglo 
            let botonBorrar = document.createElement("button"); //Creo en la tabla un boton borrar y otro editar para cada producto ingresado
            let botonEditar = document.createElement("button");
            botonBorrar.innerHTML = "Borrar"; //Le asigno un nombre a cada  boton
            botonEditar.innerHTML = "Editar";
            let nodoTr = document.createElement("tr");
            let nodoTd = document.createElement("td"); //Creo todos los elementos de la tabla
            let nodoTd1 = document.createElement("td");
            let nodoTd2 = document.createElement("td");
            let nodoTd3 = document.createElement("td");
            nodoTd.innerHTML = elems.prenda; //Asigno los lugares donde se van a mostrar los elementos de prenda y los precios 
            nodoTd1.innerHTML = "$" + elems.precio;
            nodoTr.id = elems.id;
            botonBorrar.addEventListener("click", e => eliminarProducto(elems.id)); //Creo una funcion y le paso por parametro el id
            botonEditar.addEventListener("click", e => editarProducto(elems.id)); //Creo una funcion y le paso por parametro el id 
            nodoTd2.appendChild(botonBorrar);
            nodoTd3.appendChild(botonEditar);
            nodoTr.appendChild(nodoTd);
            nodoTr.appendChild(nodoTd1);
            nodoTr.appendChild(nodoTd2); //Asigno padres
            nodoTr.appendChild(nodoTd3);
            tbody.appendChild(nodoTr);
        }
    }

    function agregarPrenda() { //Creo la funcion agregar prendas 
        if (ingresoPrecio.value != "" && ingresoPrenda.value != "") { //Creo una condicion para que no se agreguen elementos sin contenido 
            let ingresoProducto = {
                "prenda": ingresoPrenda.value,
                "precio": ingresoPrecio.value
            }
            fetch(baseUrl, {
                    "method": "POST",
                    "mode": 'cors',
                    "headers": { "Content-Type": "application/json" }, // Creo una promesa para agregar la prenda y que se suba a mi API
                    "body": JSON.stringify(ingresoProducto)
                }).then(function(r) {
                    if (!r.ok) {
                        console.log("error")
                    }
                    return r.json() //Retorno un objeto Json
                })
                .then(function() {
                    obtenerDatos(); // Obtengo los datos para que se actualize mi tabla
                })
                .catch(function(e) {
                    console.log(e)
                })
        }

    }

    function agregar3productos() { //Creo funcion para agregar 3 productos con un boton 
        for (let i = 0; i <= 2; i++) { //Itero 3 veces para que se agreguen 3 productos 
            agregarPrenda();
        }
    }

    function eliminarProducto(id) { //Creo funcion de eliminar producto y le paso por parametro su id
        fetch(baseUrl + "/" + id, {
            "method": "DELETE",
            "mode": 'cors',
        }).then(function(r) {
            if (!r.ok) {
                console.log("error")
            }
            return r.json()
        }).then(function() {
            obtenerDatos(); //Obtengo los datos para que se actualice mi tabla 
        }).catch(function(e) {
            console.log(e)
        })
    }


    function editarProducto(id) { //Creo funcion para editar productos y paso por parametro el id
        if (ingresoPrecio.value != "" && ingresoPrenda.value != "") { //Creo una condicion para que no se editen elementos sin contenido 
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
                    obtenerDatos(); //Obtengo los datos para que se actualice mi tabla 
                })
                .catch(function(e) {
                    console.log(e)
                })
        }
    }

    function limpiarTabla() { //Creo funcion para limpiar la tabla 
        tbody.innerHTML = "";
    }


    function filtrarTabla() { //Creo funcion para filtrar la tabla 

        let inputFiltro = document.getElementById("input-filtro").value; //Creo una variable y le agrego .value para leer lo que ingreso el usuario

        if (inputFiltro.value != "") { //Hago una condicion de que si el inputFiltro no es vacio oculte los Tr y recorra el arreglo en busqueda del elemento
            ocultarLosTr();
            for (let elem of arregloInterno) {
                if (elem.prenda.includes(inputFiltro)) { //Si la condicion incluye lo ingresado en el inputFiltro remuevo la clase creada 
                    document.getElementById(elem.id).classList.remove("inputOculto");
                }
                if (elem.precio === inputFiltro) { //Si la condicion es estrictamente igual a lo ingresado en el inputFiltro remuevo la clase creada
                    document.getElementById(elem.id).classList.remove("inputOculto");
                }
            }
        }
    }


    function ocultarLosTr() { //Creo funcion para ocultar los Tr
        let ocultarTr = tbody.querySelectorAll("tr");
        for (let elem of ocultarTr) {
            elem.classList.add("inputOculto");
        }
    }

    function desocultarLosTr() { //Creo funcion para mostrar los Tr
        let mostrarTr = tbody.querySelectorAll("tr");
        for (let elem of mostrarTr) {
            elem.classList.remove("inputOculto");

        }
    }






    obtenerDatos(); //Ovtengo datos

    document.getElementById("agregar").addEventListener("click", agregarPrenda);
    document.getElementById("agregarX3").addEventListener("click", agregar3productos);
    document.getElementById("filtro-tabla").addEventListener("click", filtrarTabla);
    document.getElementById("desfiltrar-tabla").addEventListener("click", desocultarLosTr);
})