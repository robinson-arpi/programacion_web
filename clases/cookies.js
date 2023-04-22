function contadorClicks(){
    if (typeof(Storage)!== "undefined"){
        if( localStorage.clickcount){
            localStorage.clickcount=Number(localStorage.clickcount) +1;
        }else{
            localStorage.clickcount = 1;
        }
        document.getElementById("resultado").innerHTML="Usted ha presionado el botoón " + localStorage.clickcount + " veces";
    }else{
        document.getElementById("resultado").innerHTML="Navegador no soportados";
    }
}