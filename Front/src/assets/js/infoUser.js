async function cargarInfoUsuarioLogin(){
    var usuario=await fetch(urlBase+"/usuarios/publico/"+token.id_usuario, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token.jwt
        },
      }).then((respuesta) => respuesta.json());
    document.getElementById("NombreUsuario").value=usuario.nombre;
    document.getElementById("UsuarioUsuario").value=usuario.usuario;
    document.getElementById("ContraseñaUsuario").value=usuario.contraseña;
    document.getElementById("TelefonoUsuario").value=usuario.telefono;
    document.getElementById("CorreoUsuario").value=usuario.correo_electronico;
    document.getElementById("IdentificacionUsuario").value=usuario.identificacion;
    noEditar();
    document.getElementById("EditarDatosUsuario").style.display="block";
    document.getElementById("ActualizarDatosUsuario").style.display="none";
}

function noEditar(){
    document.getElementById("NombreUsuario").disabled=true;
    document.getElementById("UsuarioUsuario").disabled=true;
    document.getElementById("ContraseñaUsuario").disabled=true;
    document.getElementById("TelefonoUsuario").disabled=true;
    document.getElementById("CorreoUsuario").disabled=true;
    document.getElementById("IdentificacionUsuario").disabled=true;
}

function editar(){
    document.getElementById("NombreUsuario").disabled=false;
    document.getElementById("UsuarioUsuario").disabled=false;
    document.getElementById("ContraseñaUsuario").disabled=false;
    document.getElementById("TelefonoUsuario").disabled=false;
    document.getElementById("CorreoUsuario").disabled=false;
    document.getElementById("IdentificacionUsuario").disabled=false;

    document.getElementById("EditarDatosUsuario").style.display="none";
    document.getElementById("ActualizarDatosUsuario").style.display="block";
}

function ActualizarUsuarioEditado(){
    nombre = document.getElementById("NombreUsuario").value;
    usuario = document.getElementById("UsuarioUsuario").value;
    contraseña = document.getElementById("ContraseñaUsuario").value;
    telefono = document.getElementById("TelefonoUsuario").value;
    correo_electronico = document.getElementById("CorreoUsuario").value;
    identificacion = document.getElementById("IdentificacionUsuario").value;
    if((nombre!=null && nombre!="")
    && (usuario!=null && usuario!="")
    && (contraseña!=null && contraseña!="")
    && (telefono!=null && telefono!="")
    && (correo_electronico!=null && correo_electronico!="")
    && (identificacion!=null && identificacion!="")){
        const apiActualizar = fetch(urlBase+"/usuarios/"+token.id_usuario, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token.jwt
        },
        body: JSON.stringify({
                "id_usuario": token.id_usuario,
                "id_estado": token.id_estado,
                "id_rol": token.id_rol,
                "nombre": nombre,
                "usuario": usuario,
                "contraseña": contraseña,
                "telefono": telefono,
                "correo_electronico": correo_electronico,
                "identificacion": identificacion,
                "jwt": "",
                "rol": null,
                "estado": null,
                "tokens": null,
                "pagOs": null,
                "asistenciAs": null
        }) // body data type must match "Content-Type" header
        }).then((respuesta) => respuesta)
        //.then((data) => console.log(data.respuesta));
        console.log(apiActualizar);
    
        Promise.all([apiActualizar]).then(
            window.location.href ="#home",
            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Actualizado',
            showConfirmButton: false,
            timer: 2000
            })
        );
    }else{
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error',
            text: 'Por favor llenar todos los datos.',
            showConfirmButton: false,
            timer: 2000
          })
    }
}