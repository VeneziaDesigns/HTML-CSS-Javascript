 //Se usa $ en Jquery para referirnos a elmentos del DOM 
 let x = $(document);
 //Inicializar instrucciones
 x.ready(iniciarEventos);

 function iniciarEventos() {
     let x = $("titulo1");
     x.click(palsarTitulo1);
 }

 function pulsarTitulo1() {
     let x = $("titulo1");
     x.css("color", "#ff0000");
     x.css("background-color", "#ffff00");
     x.css("font-family", "Courier");
 }