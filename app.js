function saludo() {
    alert("Hola");
}
function cuadrado(x) {
    return x**3;
}
function producto(num1, num2) {
    return num1 * num2;
}
function coche() {
    let marca = "Opel";
    document.getElementById("prueba").innerHTML = typeof marca + " " + marca;
}
coche();
/*function mostrarMensaje(de, texto) {
    if (texto === undefined) {
        texto = "Sin texto";
    }
    alert(de + ": " + texto);
}

saludo();
document.write(cuadrado(4));
document.write("<br>");
document.write(producto(23,12));
document.write(mostrarMensaje("Hola","Prueba"));*/