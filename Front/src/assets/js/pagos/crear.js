function crearPago() {
    if(token.id_rol=="1" && token.id_estado == "1"){
      const id_estudiante=parseInt(document.getElementById("idsectE").value, 10);
      const fechas=document.getElementById("FechaPago").value;
      const cantidad=parseInt(document.getElementById("Cantidad").value, 10);
      const concepto=document.getElementById("Concepto").value;
      if (id_estudiante !== "" && fechas !== "" && cantidad !=="" && concepto !=="") {
        //esto es un json
        let objetoEnviar = {
          "id_pago":0,
          "id_estudiante":id_estudiante,
          "fechas":fechas,
          "cantidad":cantidad,
          "concepto":concepto,
          "usuario":null
        }
        const apiCrear = urlBase+"/pagos";
        fetch(apiCrear,{
            method:"POST",
            body:JSON.stringify(objetoEnviar),
            headers:{"Content-type":"application/json; chasert=UTF-8",
            'Authorization': 'Bearer '+ token.jwt}
        })
        .then(respuesta=>{
          respuesta.json();
          console.log(respuesta);
          if(respuesta.status==200){//reparar
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Creado',
              showConfirmButton: false,
              timer: 2000
            });
          }else{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Error al guardar',
              showConfirmButton: false,
              timer: 2000
            });
          }
        })
        .catch(
            miError=>{console.log(miError);
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error de servidor',
                showConfirmButton: false,
                timer: 2000
              });
        });
      }
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Acseso denegado',
        showConfirmButton: false,
        timer: 2000
      });
        window.location.href ="#home";
    }
  }

//listar usuarios
function llenarSelecUsuarios(){
  const ListarEstadosU = fetch(urlBase+"/usuarios", {//listar modificarEstadoSensorAct
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token.jwt
    },

  }).then((respuesta) => respuesta.json())
  //console.log(ListarEstadosU);
  Promise.all([ListarEstadosU]).then((arregloDatos) => {
    const datos = arregloDatos[0];
    var html = llenarSEstados(datos);
    document.getElementById("selecUsuario").innerHTML = html;
  });
}

function llenarSEstados(arregloObjeto) {
  const cantidad = arregloObjeto.length;
  var text = "<select name=\"usuario\" id=\"idsectE\"><option value=\"Seleccione\">...Seleccione...</option>";
  for (let i = 0; i < cantidad; i++) {
    const idusuario = arregloObjeto[i].id_usuario;
    const nombre = arregloObjeto[i].nombre+"-"+arregloObjeto[i].identificacion;
  
    text += "<option value='"+idusuario+"'>"+nombre+"</option>";
  }
  text += "</select>";
  return text;
}