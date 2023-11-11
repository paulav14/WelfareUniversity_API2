var token=null;
function logicaNegocio(url, param) {
    verificarUsuario();
    if( url != "src/componentes/inicio.html" || 
        url != "src/componentes/recuperacion.html" ||
        url != "src/componentes/acceso.html"){
        verificarToken();
    }
    switch (url) {
        case 'src/componentes/inicio.html':
            break;
        //roles
        case 'src/componentes/roles/rollistado.html':
            obtenerTodosRolesL();
            break;
        case 'src/componentes/roles/rolcrear.html':
            verificarEstdoRol();
            break;
        case 'src/componentes/roles/roladmin.html':
            obtenerTodosRolesActualizar();
            break;
        //usuarios
        case 'src/componentes/usuarios/usuarios.html':
            obtenerTodosUsuariosL();
            break;
        case 'src/componentes/usuarios/usuariosCrear.html':
            verificarEstdoRol();
            llenarSelecEstados();
            llenarSelecRoles();
            break;
        case 'src/componentes/usuarios/usuariosActualizar.html':
            obtenerTodosUsuariosActualizar();
            break;
        //estado
        case 'src/componentes/estado/estadolistado.html':
            obtenerTodosEstadosL();
            break;
        case 'src/componentes/estado/estadocrear.html':
            verificarEstdoRol();
            break;
        case 'src/componentes/estado/estadoadmin.html':
            obtenerTodosEstadosActualizar();
            break;
        //pagos
        case 'src/componentes/pagos/pagosadmi.html':
            mostrarPagosAdministrador();
            break;  
        case 'src/componentes/pagos/pagosadmin.html':
            obtenerTodosPagosActualizar();
            cerrarModal();
            break;  
        case 'src/componentes/pagos/pagoscrear.html':
            llenarSelecUsuarios();
            break;  
        
        //menu
        case 'src/componentes/menu/menuadmi.html':
            mostrarMenuAdministrador();
            break;
            case 'src/componentes/menu/menuadmin.html':
                obtenerTodosMenuActualizar();
            break;  
        case 'src/componentes/menu/menucrear.html':
            llenarSelecTipo();
            break; 
        //login
        case 'src/componentes/acceso.html':
            verificarLogin();
            break;
        case 'src/componentes/infoUser.html':
            cargarInfoUsuarioLogin();
            break;
        //Estudiantes
        case 'src/componentes/estudiante/inicio.html':
            mostrarMenuEstudiante();
            mostrarPagosEstudiante();
            break;
        default:
            console.log('Javascript interno no utilizado');
    }
}
function verificarToken(){
    if(token != null) {
    }else{
        window.location.href ="#login";
    }
}

function verificarEstdoRol(){
    if(token.id_rol=="1" && token.id_estado == "1"){
        
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

function verificarUsuario(){
    menuRoles = document.getElementById("item-Roles");
    menuEstados = document.getElementById("item-Estados");
    menuUsuarios = document.getElementById("item-Usuarios");
    itempagos = document.getElementById("item-Pagos");
    itemmenu = document.getElementById("item-Menu");
    itemEstudiante = document.getElementById("item-Estudiante");
    itemIniciarSession = document.getElementById("iniciarS");
    itemCerrarSession = document.getElementById("cerrarS");
    if(token != null){
        if(token.id_rol=="1" && token.id_estado=="1"){
            //mostrar lo de administrador
            menuRoles.style.display="block";
            menuEstados.style.display="block";
            itempagos.style.display="block";
            menuUsuarios.style.display="block";
            itemmenu.style.display="block";
            itemEstudiante.style.display="none";
            itemIniciarSession.style.display="none";
            itemCerrarSession.style.display="block";
        }else if(token.id_rol=="2" && token.id_estado=="1"){
            //mostrar lo de estudiantes
            itemEstudiante.style.display="block";
            itemIniciarSession.style.display="none";
            itemCerrarSession.style.display="block";
        }else{
            //ocultar todos los items
            itemEstudiante.style.display="none";
            menuRoles.style.display="none";
            menuEstados.style.display="none";
            menuUsuarios.style.display="none";
            itemIniciarSession.style.display="none";
            itempagos.style.display="none";
            itemmenu.style.display="none";
            itemCerrarSession.style.display="block";
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error en el servidor',
                showConfirmButton: false,
                timer: 2000
            });
        }
    }else{
        //ocultar todos los items
        itemEstudiante.style.display="none";
        menuRoles.style.display="none";
        menuEstados.style.display="none";
        menuUsuarios.style.display="none";
        itemmenu.style.display="none";
        itempagos.style.display="none";
        itemIniciarSession.style.display="block";
        itemCerrarSession.style.display="none";
    }
}

function verificarLogin(){
    if(token!=null){
        window.location.href ="#home";
    }
}