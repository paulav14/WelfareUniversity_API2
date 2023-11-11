function obtenerTodosRolesActualizar() {
  if(token.id_rol=="1" && token.id_estado == "1"){
    const apiObtenerRoles = urlBase+"/rol";
    const miPromesaRoles = fetch(apiObtenerRoles, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token.jwt
      },

    }).then((respuesta) =>
      respuesta.json()
    );

    Promise.all([miPromesaRoles]).then((arregloDatos) => {
      const datos = arregloDatos[0];
      var a= document.getElementById("tablaRoles").createTHead();
      var b = a.insertRow(0);
      var c= b.insertCell(0); 
      var d= b.insertCell(1);
      var e = b.insertCell(2);
      var f = b.insertCell(3);
      c.innerHTML="<b>Id Rol</b>";
      d.innerHTML="<b>Descripcion<b>";
      e.innerHTML="<b>Actualizar</b>";
      f.innerHTML="<b>Eliminar</b>";
      crearFilasRolesA(datos);
    });
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

function crearFilasRolesA(arregloObjeto) {
  const cantidad = arregloObjeto.length;
  for (let i = 0; i < cantidad; i++) {
    const idRol = arregloObjeto[i].id_rol;
    const descrip = arregloObjeto[i].nombre;

    document.getElementById("tablaRoles").insertRow(-1).innerHTML =
    "<td>" + idRol + "</td>" + "<td>" + descrip + "</td>" 
    + "<td>" + "<button onClick='modificarRol("+idRol+")'class='btn btn-primary'> Actualizar </button>" + "</td>"
    + "<td>" + "<button onClick='eliminarRol("+idRol+")'class='btn btn-primary'> Eliminar </button>" + "</td>"
  }
}

function modificarRol(idRol){
  //window.location.href ="#EstadList";
  var rolNew=prompt("digite el rol actualizado");
  //validar los datos ingresados

  const apiActualizarEstacion = fetch(urlBase+"/rol/"+idRol, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token.jwt
    },
    body: JSON.stringify({
      "id_rol": idRol,
      "nombre": rolNew
    }) // body data type must match "Content-Type" header
  }).then((respuesta) => respuesta.status())
  //.then((data) => console.log(data.respuesta));
  //console.log(apiActualizarEstacion);

  Promise.all([apiActualizarEstacion]).then(
    window.location.href ="#rollist",
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Actualizado',
      showConfirmButton: false,
      timer: 2000
    })
  );
};

async function eliminarRol(idRol){
  //window.location.href ="#EstadList";
  var descripcionNew=confirm("Esta seguro de eliminar el rol "+idRol);
  if(descripcionNew===true){
  }else{
    return;
  }
  const dato = await fetch(urlBase+"/rol/"+idRol, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token.jwt
    },

  }).then((respuesta) => respuesta.json());
  //console.log(dato);
  //validar los datos ingresados
  if(dato!=null){

  }else{
    window.location.href ="#rolmanage";
    token = null;
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error al actualizar',
      showConfirmButton: false,
      timer: 2000
    });
  }
  const apiActualizarEstacion = fetch(urlBase+"/rol", {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token.jwt
    },
    body: JSON.stringify({
      'id_rol': dato.id_rol,
      'nombre': dato.nombre
    }) // body data type must match "Content-Type" header
  }).then((respuesta) => respuesta.status())
  //.then((data) => console.log(data.respuesta));
  //console.log(apiActualizarEstacion);

  Promise.all([apiActualizarEstacion]).then(
    window.location.href ="#rollist",
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Actualizado',
      showConfirmButton: false,
      timer: 2000
    })
  );
};