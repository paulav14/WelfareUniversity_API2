function  mostrarPagosAdministrador (){
    if(token.id_rol=="1" && token.id_estado == "1"){
        const apiObtenerEstado = urlBase+"/pagos";
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
          var a = document.getElementById("tablaPagos").createTHead();
          var b = a.insertRow(0);
          var c = b.insertCell(0); 
          var d = b.insertCell(1);
          var e = b.insertCell(2);
          var f = b.insertCell(3);
          c.innerHTML="<b>Id Usuario</b>";
          d.innerHTML="<b>Fecha</b>";
          e.innerHTML="<b>Cantidad</b>";
          f.innerHTML="<b>Concepto</b>";
          
        
          crearFilasPagosLi(datos);
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



    
  
  
  function crearFilasPagosLi(arregloObjeto) {
    const cantidad = arregloObjeto.length;
    for (let i = 0; i < cantidad; i++) {
      const idUsuario = arregloObjeto[i].id_estudiante;
      const Fecha = arregloObjeto[i].fechas;
      const Cantidad = arregloObjeto[i].cantidad;
      const Concepto = arregloObjeto[i].concepto;
  
      document.getElementById("tablaPagos").insertRow(-1).innerHTML =
        "<td>" + idUsuario + "</td>" + "<td>" + Fecha + "</td>"+ "<td>" + Cantidad + "</td>"+ "<td>" + Concepto + "</td>";
    }
  }
  