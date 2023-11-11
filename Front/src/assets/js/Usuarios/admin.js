function obtenerTodosUsuariosActualizar() {
  if(token.id_rol=="1" && token.id_estado == "1"){
    const ListarUsuarios = fetch(urlBase+"/usuarios", {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      //mode: 'cors', // no-cors, *cors, same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token.jwt
      },

    }).then((respuesta) => respuesta.json())
    Promise.all([ListarUsuarios]).then((arregloDatos) => {
      const datos = arregloDatos[0];
      var a= document.getElementById("tablaUsuarios").createTHead();
      var b = a.insertRow(0);
      var c= b.insertCell(0); 
      var d= b.insertCell(1);
      var e = b.insertCell(2);
      var f = b.insertCell(3);
      var g = b.insertCell(4);
      var h = b.insertCell(5);      
      var i = b.insertCell(6);
      var j = b.insertCell(7);
      c.innerHTML="<b>Id Usuario</b>";
      d.innerHTML="<b>Nombre<b>";
      e.innerHTML="<b>usuario<b>";
      f.innerHTML="<b>clave<b>";
      g.innerHTML="<b>correo<b>";
      h.innerHTML="<b>telefono<b>";
      i.innerHTML="<b>identificacion<b>";
      j.innerHTML="<b>Eliminar<b>";
      crearFilasUsuariosA(datos);
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
  
function crearFilasUsuariosA(arregloObjeto) {
  const cantidad = arregloObjeto.length;
  for (let i = 0; i < cantidad; i++) {
    const id = arregloObjeto[i].id_usuario;
    const nombre = arregloObjeto[i].nombre;
    const usuario = arregloObjeto[i].usuario;
    const contraseña = arregloObjeto[i].contraseña;
    const correo = arregloObjeto[i].correo_electronico;
    const telefono = arregloObjeto[i].telefono;
    const identificacion = arregloObjeto[i].identificacion;
    document.getElementById("tablaUsuarios").insertRow(-1).innerHTML =
    "<td>" + id + "</td>" + 
    "<td>" + nombre + "</td>" + 
    "<td>" + usuario + "</td>" +
     "<td>" + contraseña + "</td>" + 
     "<td>" + correo + "</td>" + 
     "<td>" + telefono + "</td>" + 
     "<td>" + identificacion + "</td>" + 
    "<td><button onClick='eliminarUsuario("+id+")'class='btn btn-primary'> Eliminar Datos</button></td>";
  }
}

async function eliminarUsuario(idUsu){
  const eliminarUser = await fetch(urlBase+"/usuarios/publico/"+idUsu, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token.jwt
    },
  }).then((respuesta) => 
  respuesta.json()
  );
  const usuEliminado= fetch(urlBase+"/usuarios", {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token.jwt
      },
      body: JSON.stringify({
        "id_usuario": eliminarUser.id_usuario,
        "id_estado": eliminarUser.id_estado,
        "id_rol": eliminarUser.id_rol,
        "nombre": eliminarUser.nombre,
        "usuario": eliminarUser.usuario,
        "contraseña": eliminarUser.contraseña,
        "telefono": eliminarUser.telefono,
        "correo_electronico": eliminarUser.correo_electronico,
        "identificacion": eliminarUser.identificacion,
        "jwt": "",
        "rol": null,
        "estado": null,
        "tokens": null,
        "pagOs": null,
        "asistenciAs": null
      }) // body data type must match "Content-Type" header
    }).then((respuesta) => respuesta.status)
    Promise.all([usuEliminado]).then((datos) => {
      if (datos == 200 ){
        window.location.href ="#UserList";
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Eliminado',
          showConfirmButton: false,
          timer: 2000
        });
      }else{
        window.location.href ="#UserUpdate";
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al Eliminar',
          showConfirmButton: false,
          timer: 2000
        });
      }
  });
}
