function obtenerTodosEstadosActualizar() {
  if(token.id_rol=="1" && token.id_estado == "1"){
    const apiObtenerEstados = urlBase+"/Estado";//actular url
    const miPromesaEstados = fetch(apiObtenerEstados, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token.jwt
      },

    }).then((respuesta) =>
      respuesta.json()
    );
    Promise.all([miPromesaEstados]).then((arregloDatos) => {
      const datos = arregloDatos[0];
      var a= document.getElementById("tablaEstado").createTHead();
      var b = a.insertRow(0);
      var c= b.insertCell(0); 
      var d= b.insertCell(1);
      var e = b.insertCell(2);
      var f = b.insertCell(3);
      c.innerHTML="<b>Id Estado</b>";
      d.innerHTML="<b>Descripcion<b>";
      e.innerHTML="<b>Actualizar</b>";
      f.innerHTML="<b>Eliminar</b>";
      crearFilasEstadosA(datos);
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
};

function crearFilasEstadosA(arregloObjeto) {
  const cantidad = arregloObjeto.length;
  for (let i = 0; i < cantidad; i++) {
    const idEstado = arregloObjeto[i].id_estado;
    const descEstado = arregloObjeto[i].nombre;

    document.getElementById("tablaEstado").insertRow(-1).innerHTML =
    "<td>" + idEstado + "</td>" + "<td>" + descEstado + "</td>" 
    + "<td>" + "<button onClick='modificarEstado("+idEstado+");' class='btn btn-primary'> Actualizar </button>" + "</td>"
    + "<td>" + "<button onClick='eliminarEstado("+idEstado+");' class='btn btn-primary'> Eliminar </button>" + "</td>";
  }
}

function modificarEstado(idEstado){
  //window.location.href ="#EstadList";
  var descripcionNew=prompt("digite el estado actualizado");
  //validar los datos ingresados

  const apiActualizarEstacion = fetch(urlBase+"/Estado/"+idEstado, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token.jwt
    },
    body: JSON.stringify({
      'id_estado': idEstado,
      'descripcion': descripcionNew
    }) // body data type must match "Content-Type" header
  }).then((respuesta) => respuesta.json())
  //.then((data) => console.log(data.respuesta));
  console.log(apiActualizarEstacion);

  Promise.all([apiActualizarEstacion]).then((datos) => {
    if (datos[0].respuesta == 1 ){
      window.location.href ="#EstadList";
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Actualizado',
        showConfirmButton: false,
        timer: 2000
      });
    }else{
      window.location.href ="#EstadUpdate";
      token = null;
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al actualizar',
        showConfirmButton: false,
        timer: 2000
      });
    }
});
};

async function eliminarEstado(idEstado){
  //window.location.href ="#EstadList";
  var descripcionNew=confirm("Esta seguro de eliminar el estado "+idEstado);
  if(descripcionNew===true){
  }else{
    return;
  }
  const dato = await fetch(urlBase+"/Estado/"+idEstado, {
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
    window.location.href ="#EstadUpdate";
    token = null;
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error al actualizar',
      showConfirmButton: false,
      timer: 2000
    });
  }
  const apiActualizarEstacion = fetch(urlBase+"/Estado", {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token.jwt
    },
    body: JSON.stringify({
      'id_estado': dato.id_estado,
      'nombre': dato.nombre
    }) // body data type must match "Content-Type" header
  }).then((respuesta) => respuesta.status())
  //.then((data) => console.log(data.respuesta));
  //console.log(apiActualizarEstacion);

  Promise.all([apiActualizarEstacion]).then(
    window.location.href ="#EstadList",
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Actualizado',
      showConfirmButton: false,
      timer: 2000
    })
  );
};