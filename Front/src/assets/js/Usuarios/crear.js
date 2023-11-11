function crearUsuario() {
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var idRol = parseInt(document.getElementById("idsectR").value, 10);
    var idEstado = parseInt(document.getElementById("idsectE").value, 10);
    var usuario=document.getElementById("usuario").value;
    var telefono=parseInt(document.getElementById("telefono").value);
    var identificacion=parseInt(document.getElementById("identificacion").value);
    var contrasenia = document.getElementById("contraseña").value;
    var contrasenia2 = document.getElementById("contraseña2").value;

    if ((nombre !== "")&&(correo !== "")&&(idRol !== "")&&(idEstado !== "")&&(contrasenia !== "")&&(contrasenia!=="")&&(usuario!=="")&&(identificacion!=="")&&(telefono!=="")&&(contrasenia==contrasenia2)) {
      //console.log(idRol);
      //console.log(idEstado);
      var peticion={
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token.jwt
        },
        body: JSON.stringify({
          "id_usuario": 0,
          "id_estado": idEstado,
          "id_rol": idRol,
          "nombre": nombre,
          "usuario": usuario,
          "contraseña": contrasenia,
          "telefono": telefono,
          "correo_electronico": correo,
          "identificacion": identificacion,
          "jwt": "",
          "rol": null,
          "estado": null,
          "tokens": null,
          "pagOs": null,
          "asistenciAs": null
        })
      };
      console.log(peticion);
      const crearUsuario = fetch(urlBase +"/usuarios/SI", peticion).then((respuesta) => 
      respuesta.status
      );
      //.then((data) => console.log(data.respuesta));
      //console.log(crearUsuario);
      Promise.all([crearUsuario]).then((datos) => {
        if (datos == 200 ){
          window.location.href ="#UserList";
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario creado Exitosamente',
            showConfirmButton: false,
            timer: 2000
          });
        }else{
          window.location.href ="#UserList";
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al crear el usuario',
            showConfirmButton: false,
            timer: 2000
          });
        }
    });
    }else{
      alert('Por favor llene todos los campos');
    }
}
//listar estados
function llenarSelecEstados(){
  const ListarEstadosU = fetch(urlBase+"/Estado", {//listar modificarEstadoSensorAct
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
    document.getElementById("selecEstados").innerHTML = html;
  });
}

function llenarSEstados(arregloObjeto) {
  const cantidad = arregloObjeto.length;
  var text = "<select name=\"estado\" id=\"idsectE\"><option value=\"Seleccione\">...Seleccione...</option>";
  for (let i = 0; i < cantidad; i++) {
    const idEstado = arregloObjeto[i].id_estado;
    const descripcion = arregloObjeto[i].nombre;
  
    text += "<option value='"+idEstado+"'>"+descripcion+"</option>";
  }
  text += "</select>";
  return text;
}

//listar roles
function llenarSelecRoles(){
  const ListarRolesU = fetch(urlBase+"/rol", {//listar modificarRolesensorAct
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token.jwt
    },

  }).then((respuesta) => respuesta.json())
  //console.log(ListarRolesU);
  Promise.all([ListarRolesU]).then((arregloDatos) => {
    const datos = arregloDatos[0];
    var html = llenarSRoles(datos);
    document.getElementById("selecRoles").innerHTML = html;
  });
}

function llenarSRoles(arregloObjeto) {
  const cantidad = arregloObjeto.length;
  var text = "<select name=\"rol\" id=\"idsectR\"><option value=\"Seleccione\">...Seleccione...</option>";
  for (let i = 0; i < cantidad; i++) {
    const idRol = arregloObjeto[i].id_rol;
    const descripcion = arregloObjeto[i].nombre;
  
    text += "<option value='"+idRol+"'>"+descripcion+"</option>";
  }
  text += "</select>";
  return text;
}