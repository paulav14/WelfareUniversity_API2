function obtenerTodosEstadosL() {
  if(token.id_rol=="1" && token.id_estado == "1"){
    const apiObtenerEstado = urlBase+"/Estado";
    const miPromesaEstado = fetch(apiObtenerEstado, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token.jwt
      },

    }).then((respuesta) =>
      respuesta.json()
    );
    Promise.all([miPromesaEstado]).then((arregloDatos) => {
      const datos = arregloDatos[0];
      var a = document.getElementById("tablaEstado").createTHead();
      var b = a.insertRow(0);
      var c = b.insertCell(0); 
      var d = b.insertCell(1);
      c.innerHTML="<b>Id Estado</b>";
      d.innerHTML="<b>Descripcion<b>";
      crearFilasEstadosLl(datos);
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

function crearFilasEstadosLl(arregloObjeto) {
  const cantidad = arregloObjeto.length;
  for (let i = 0; i < cantidad; i++) {
    const idEstado = arregloObjeto[i].id_estado;
    const descEstado = arregloObjeto[i].nombre;

    document.getElementById("tablaEstado").insertRow(-1).innerHTML =
      "<td>" + idEstado + "</td>" + "<td>" + descEstado + "</td>";
  }
}
