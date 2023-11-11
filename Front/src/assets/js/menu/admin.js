var listaMenuEliminar;
function obtenerTodosMenuActualizar() {
    if(token.id_rol=="1" && token.id_estado == "1"){
        const apiObtenerEstado = urlBase+"/menu/SI";
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
          var a = document.getElementById("tablaMenuActualizar").createTHead();
          var b = a.insertRow(0);
          var c = b.insertCell(0); 
          var d = b.insertCell(1);
          var e = b.insertCell(2);
          var g = b.insertCell(3);
          c.innerHTML="<b>Fecha</b>";
          d.innerHTML="<b>Menu</b>";
          e.innerHTML="<b>Tipo</b>";
          g.innerHTML="<b>Eliminar</b>";
          
        
          crearFilasMenuLiA(datos);
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
  
  function crearFilasMenuLiA(arregloObjeto) {
    const cantidad = arregloObjeto.length;
    listaMenuEliminar=arregloObjeto;
    for (let i = 0; i < cantidad; i++) {
      const idMenu = arregloObjeto[i].id_menu;
      const Fecha = arregloObjeto[i].dia;
      const Tipo = arregloObjeto[i].id_Tipo;
      const Menu = arregloObjeto[i].menu;
      document.getElementById("tablaMenuActualizar").insertRow(-1).innerHTML =
      "<td>" + Fecha + "</td>" +
      "<td>" + Menu + "</td>" +
      "<td>" + Tipo + "</td>" +
      "<td>" + "<button onClick='eliminarMenu("+idMenu+");' class='btn btn-primary'> Eliminar </button>" + "</td>";
    }
  }
   async function eliminarMenu(id_menu){
    //window.location.href ="#EstadList";
    var descripcionNew=confirm("Esta seguro de eliminar el menu "+id_menu);
    if(descripcionNew===true){
    }else{
      return;
    }
    var dato;
    const cantidad = listaMenuEliminar.length;
    for (let i = 0; i < cantidad; i++) {
      if(id_menu===listaMenuEliminar[i].id_menu){
        var dato = listaMenuEliminar[i];
      }
    }
    if(dato!=null){
  
    }else{
      window.location.href ="#menuadmi";
      token = null;
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al actualizar',
        showConfirmButton: false,
        timer: 2000
      });
    }
    const apiActualizarEstacion = fetch(urlBase+"/menu", {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token.jwt
      },
      body: JSON.stringify({
        "id_menu":dato.id_menu,
        "dia": dato.dia,
        "menu": dato.menu,
        "id_Tipo":dato.id_Tipo,
        "tipo": null 
      }) // body data type must match "Content-Type" header
    }).then((respuesta) => respuesta.status())
    //.then((data) => console.log(data.respuesta));
    //console.log(apiActualizarEstacion);
  
    Promise.all([apiActualizarEstacion]).then(
      window.location.href ="#menuadmi",
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Actualizado',
        showConfirmButton: false,
        timer: 2000
      })
    );
  };