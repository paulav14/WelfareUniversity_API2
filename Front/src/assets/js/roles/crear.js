function crearRol() {
  if(token.id_rol=="1" && token.id_estado == "1"){
    const descripcion = document.getElementById("descripcion").value;
    if (descripcion !== "") {
      //esto es un json
      let objetoEnviar = {
        "nombre": descripcion
      }
      const apiCrear = urlBase+"/rol";
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
          window.location.href ="#EstacionMList";
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
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error debe llenar el campo',
        showConfirmButton: false,
        timer: 2000
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
