'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'inicio.html', true),
            //Ejemplo
            //new Route('ruta1', 'carpetaDentroDeComponents/visual.html'),
            //roles
            new Route('rollist', 'roles/rollistado.html'),
            new Route('roladd', 'roles/rolcrear.html'),
            new Route('rolmanage', 'roles/roladmin.html'),
            //usuarios
            new Route('UserUpdate', 'usuarios/usuariosActualizar.html'),
            new Route('UserNew', 'usuarios/usuariosCrear.html'),
            new Route('UserList', 'usuarios/usuarios.html'),
            //estados
            new Route('EstadList', 'estado/estadolistado.html'),
            new Route('EstadNew', 'estado/estadocrear.html'),
            new Route('EstadUpdate', 'estado/estadoadmin.html'),
            //Informacion Usuario Login
            new Route('InfoUser','infoUser.html'),
            //LOGIN
            new Route('login', 'acceso.html'),
            //recuperacion de Pass
            new Route('recuPass', 'recuperacion.html'),
            // componente de pagos
            new Route('pagosadmi', 'pagos/pagosadmi.html'), 
            new Route('crearPagosAdmi', 'pagos/pagoscrear.html'), 
            new Route('updatePagosAdmi', 'pagos/pagosadmin.html'), 
            // Menu
            new Route('menuadmi' , 'menu/menuadmi.html'),
            new Route('crearMenuAdmi', 'menu/menucrear.html'),
            new Route('updateMenuAdmi', 'menu/menuadmin.html'),
            //estudiantes
            new Route('viewEstudiante', 'estudiante/inicio.html'),
            //home
            new Route('home', 'inicio.html')
        ]);
    }
    init();
}());
