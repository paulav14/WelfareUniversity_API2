function obtenerTodosUsuariosL() {
  if(token.id_rol=="1" && token.id_estado == "1"){
    const ListarUsuariosl = fetch(urlBase+"/usuarios", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token.jwt
      },

    }).then((respuesta) => respuesta.json())
    //console.log(ListarUsuariosl);
    Promise.all([ListarUsuariosl]).then((arregloDatos) => {
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

      c.innerHTML="<b>Id Usuario</b>";
      d.innerHTML="<b>Nombre<b>";
      e.innerHTML="<b>Usuario<b>";
      f.innerHTML="<b>Contraseña<b>";
      g.innerHTML="<b>Correo<b>";
      h.innerHTML="<b>Telefono<b>";
      i.innerHTML="<b>Identificacion<b>";
      crearFilasUsuarios(datos);
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

function crearFilasUsuarios(arregloObjeto) {
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
      "<td>" + id + "</td>" + "<td>" + nombre + "</td>" + "<td>" 
      + usuario + "</td>"+ "<td>" + contraseña + "</td>" + "<td>" + correo + "</td>"
      + "<td>" + telefono + "</td>"+ "<td>" + identificacion + "</td>";
  }
}

