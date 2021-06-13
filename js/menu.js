document.addEventListener("DOMContentLoaded", function() {

    //Para mostrar el menu
    document.querySelector("#showmenu").addEventListener("click", mostrar);

    function mostrar() {
        document.querySelector(".navegador").classList.toggle("show");
    }

})