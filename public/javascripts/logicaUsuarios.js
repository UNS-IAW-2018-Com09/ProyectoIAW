var sesionIniciada=false;

function inicializar(){
}


function iniciarSesion(){
  $("#botonPuntuar").attr("disabled",false);
}


function cambiarEstilo(){
    var estiloActual=localStorage.getItem("Estilo");
    var estiloSiguiente=Math.floor(1/estiloActual+1);
    $("#hojaEstilo").attr("href","stylesheets/Estilo"+estiloSiguiente+".css");
    localStorage.setItem("Estilo",estiloSiguiente);
    cambiarEstiloMapa(estiloSiguiente);
    $.post('/userState/updateStyle',{"style":estiloSiguiente},function(data){
      console.log(data);
    });
}

function loadUser(){

  localStorage.setItem("Estilo",1);

  $.get("/userState/getUserState",function(data){
    console.log(data);
    if (data!="No loggeado"){
      $("#btnLog").html("Sesion iniciada");
      var estiloActual=data[0].estiloActual;
      localStorage.setItem("Estilo",estiloActual);
      cambiarEstiloMapa(estiloActual);
      var local=data[0].localSeleccionado;
      if (local!='Nada'){
        for (var i = 0; i < markers.length; i++) {
          if (local==markers[i].title){
            map.panTo(markers[i].position);
            setearInformacionLocal(AlmacenamientoLocales.get(local));
            break;
          }
        }
    }
    }
  });
}
