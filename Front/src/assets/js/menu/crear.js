function crearMenu() {
    if(token.id_rol=="1" && token.id_estado == "1"){
      const Fecha = document.getElementById("FechaMenu").value;
      const Menu = document.getElementById("Menu").value;
      const Tipo = parseInt(document.getElementById("idsectE").value, 10);
      if (Fecha !== "" && Menu !== "" && Tipo !=="" ) {
        //esto es un json
        let objetoEnviar = {
            id_menu:0,
            dia:Fecha,
            menu:Menu,
            id_Tipo:Tipo,
            tipo:null
        }
        const apiCrear = urlBase+"/menu";
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
  
  //listar Tipo
function llenarSelecTipo(){
  const ListarEstadosU = fetch(urlBase+"/tipo", {//listar modificarEstadoSensorAct
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
    document.getElementById("selecTipo").innerHTML = html;
  });
}

function llenarSEstados(arregloObjeto) {
  const cantidad = arregloObjeto.length;
  var text = "<select name=\"tipo\" id=\"idsectE\"><option value=\"Seleccione\">...Seleccione...</option>";
  for (let i = 0; i < cantidad; i++) {
    const idusuario = arregloObjeto[i].id_tipo;
    const nombre = arregloObjeto[i].descripcion;
  
    text += "<option value='"+idusuario+"'>"+nombre+"</option>";
  }
  text += "</select>";
  return text;
}