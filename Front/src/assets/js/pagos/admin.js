var modal = document.getElementById("myModal");
var closeModalButton = document.getElementById("closeModal");
var id_pagoActualizar=0;

function obtenerTodosPagosActualizar() {
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
          var a = document.getElementById("tablaPagoActualizar").createTHead();
          var b = a.insertRow(0);
          var c = b.insertCell(0); 
          var d = b.insertCell(1);
          var e = b.insertCell(2);
          var f = b.insertCell(3);
          var g = b.insertCell(4);
          c.innerHTML="<b>Id Usuario</b>";
          d.innerHTML="<b>Fecha</b>";
          e.innerHTML="<b>Cantidad</b>";
          f.innerHTML="<b>Concepto</b>";
          g.innerHTML="<b>Actualizar</b>";
          
          crearFilasPagosLiA(datos);
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
  
  
  function crearFilasPagosLiA(arregloObjeto) {
    const cantidad = arregloObjeto.length;
    for (let i = 0; i < cantidad; i++) {
      const id_pago=arregloObjeto[i].id_pago;
      const idUsuario = arregloObjeto[i].id_estudiante;
      const Fecha = arregloObjeto[i].fechas;
      const Cantidad = arregloObjeto[i].cantidad;
      const Concepto = arregloObjeto[i].concepto;
  
      document.getElementById("tablaPagoActualizar").insertRow(-1).innerHTML =
        "<td>" + idUsuario + "</td>" + "<td>" + Fecha + "</td>"+ "<td>" + Cantidad + "</td>"+ "<td>" + Concepto + "</td>" +
        "<td>" + "<button onClick='actualizarPagos("+id_pago+");' class='btn btn-primary'> Actualizar </button>" + "</td>";;
    }
  }

  function actualizarPagos(id_pago){
    abrirModal();
    var datosActualizar;
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
        const arregloObjeto = arregloDatos[0];
        const cantidad = arregloObjeto.length;
        for (let i = 0; i < cantidad; i++) {
          if(arregloObjeto[i].id_pago===id_pago){
            datosActualizar=arregloObjeto[i];
          }
        }
        var usuarioModal=document.getElementById("UsuarioModal");
        var FechaPagoModal=document.getElementById("FechaPagoModal");
        var CantidadModal=document.getElementById("CantidadModal");
        var ConceptoModal=document.getElementById("ConceptoModal");
        usuarioModal.value=datosActualizar.id_estudiante;
        FechaPagoModal.value=convertirFecha(datosActualizar.fechas+"");
        CantidadModal.value=datosActualizar.cantidad;
        ConceptoModal.value=datosActualizar.concepto;
        id_pagoActualizar=datosActualizar.id_pago;
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
  
  function abrirModal(){
    this.modal.style.display = "block";
  }

  function cerrarModal(){
    modal = document.getElementById("myModal");
    closeModalButton = document.getElementById("closeModal");
    this.modal.style.display = "none";
  }
  closeModalButton.addEventListener("click", () => {
    this.modal.style.display = "none";
  });
  window.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = "none";
      }
  });

  function ActualizaPagoModal(){
    var usuarioModal=document.getElementById("UsuarioModal").value;
    var FechaPagoModal=document.getElementById("FechaPagoModal").value;
    var CantidadModal=document.getElementById("CantidadModal").value;
    var ConceptoModal=document.getElementById("ConceptoModal").value;
  
    const apiActualizarEstacion = fetch(urlBase+"/pagos/"+id_pagoActualizar, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token.jwt
      },
      body: JSON.stringify({
        "id_pago": id_pagoActualizar,
        "id_estudiante": usuarioModal,
        "fechas": FechaPagoModal,
        "cantidad": CantidadModal,
        "concepto": ConceptoModal,
        "usuario":null
      }) // body data type must match "Content-Type" header
    }).then((respuesta) => respuesta.status())
    //.then((data) => console.log(data.respuesta));
    //console.log(apiActualizarEstacion);
  
    Promise.all([apiActualizarEstacion]).then(
      window.location.href ="#pagosadmi",
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Actualizado',
        showConfirmButton: false,
        timer: 2000
      })
    );
    cerrarModal();
  }

  function convertirFecha(ddMMyyyy) {
    // Dividir la fecha en día, mes y año
    const partes = ddMMyyyy.split('-');
    
    if (partes.length !== 3) {
        return 'Formato de fecha no válido';
    }
    
    const dia = partes[0];
    const mes = partes[1];
    const año = partes[2];
    
    // Crear una nueva cadena de fecha en formato "yyyy-MM-dd"
    const yyyyMMdd = año + '-' + mes + '-' + dia;
    
    return yyyyMMdd;
}