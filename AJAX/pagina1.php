<?php

header("Content-Type: text/html; charset=utf-8");
    
    //Añadir al archivo
    $ar = fopen("puntos.txt", "a") or die("No se pudo abrir el archivo");
    fputs($ar, "Nombre: ".$_REQUEST['nombre']."<br>");
    fputs($ar, "Voto: ".$_REQUEST['puntos']."<br><br>");
    fclose($ar);
    
    //Leer el archivo
    $ar = fopen("puntos.txt", "r") or die("No se pudo abrir el archivo");
    //feof => final end of file
    while (!feof($ar)) {
        $linea = fgets($ar);
        echo $linea;
    }
    fclose($ar);
?>