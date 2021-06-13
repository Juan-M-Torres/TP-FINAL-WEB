document.addEventListener("DOMContentLoaded", function() {

    let numeroCaptcha = document.getElementById("numero"); // h3
    let ingreso = document.getElementById("ingreso"); // lo que va a ingresar el usuario
    numeroCaptcha.innerHTML = createRandom(); /*llamo a la funcion para que me de un numero*/
    let resultado = document.getElementById("resultado"); //El resultado del captcha se muestra aca 

    function verificarCaptcha() {
        if (numeroCaptcha.innerHTML == ingreso.value) {
            resultado.innerHTML = "Captcha correcto!";
        } else {
            resultado.innerHTML = "Captcha incorrecto!";
        }
        //Si el resultado del Captcha es igual al numero mostrado en pantalla, que diga "Captcha es correcto", de lo contrario "Captcha es incorrecto"
    }
    document.getElementById("verificar").addEventListener("click", verificarCaptcha);


    function createRandom() { // Crea un numero de entre 0 y 1000000, al azar
        let numero = 0;
        numero = Math.floor(Math.random() * 100000);
        return numero;
    }




})