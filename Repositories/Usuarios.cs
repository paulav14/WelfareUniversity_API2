using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
public class Usuarios
{
    private readonly WELFAREContext _context;
    public Usuarios(WELFAREContext context)
    {
        _context = context;
    }
    public void insertarRestaurante(RESTAURANTE nuevo)
    {
        if (_context.RESTAURANTEs == null) { }
        else
        {
            _context.RESTAURANTEs.Add(nuevo);
            _context.SaveChanges();
        }
    }
    public void insertarPago(PAGO nuevo)
    {
        if (_context.PAGOs == null) { }
        else
        {
            _context.PAGOs.Add(nuevo);
            _context.SaveChanges();
        }
    }
    public void eliminarUsuario(USUARIO nuevo)
    {
        if (_context.USUARIOs == null) { }
        else
        {
            _context.USUARIOs.Attach(nuevo);
            _context.USUARIOs.Remove(nuevo);
            _context.SaveChanges();
        }
    }
    public void eliminarTipo(TIPO nuevo)
    {
        if (_context.TIPOs == null) { }
        else
        {
            _context.TIPOs.Attach(nuevo);
            _context.TIPOs.Remove(nuevo);
            _context.SaveChanges();
        }
    }
    public void eliminarRol(ROL nuevo)
    {
        if (_context.ROLs == null) { }
        else
        {
            _context.ROLs.Attach(nuevo);
            _context.ROLs.Remove(nuevo);
            _context.SaveChanges();
        }
    }
    public void eliminarRestaurante(RESTAURANTE nuevo)
    {
        if (_context.RESTAURANTEs == null) { }
        else
        {
            _context.RESTAURANTEs.Attach(nuevo);
            _context.RESTAURANTEs.Remove(nuevo);
            _context.SaveChanges();
        }
    }
    public void eliminarMenu(MENU nuevo)
    {
        if (_context.MENUs == null) { }
        else
        {
            _context.MENUs.Attach(nuevo);
            _context.MENUs.Remove(nuevo);
            _context.SaveChanges();
        }
    }
    public void insertarTipoMenu(TIPO nuevo)
    {
        if (_context.TIPOs == null) { }
        else
        {
            _context.TIPOs.Add(nuevo);
            _context.SaveChanges();
        }
    }
    public void insertarAsistencia(ASISTENCIA nuevo)
    {
        if (_context.ASISTENCIAs == null) { }
        else
        {
            _context.ASISTENCIAs.Add(nuevo);
            _context.SaveChanges();
        }
    }
    public void insertarToken(token Rtoken)
    {
        if (_context.TOKENs == null) { }
        else
        {
            _context.TOKENs.Add(Rtoken);
            _context.SaveChanges();
        }
    }
    public USUARIO? contraseña(string usuario)
    {
        if (_context.USUARIOs == null)
        {
            return null;
        }
        else
        {
            USUARIO? eusuario = _context.USUARIOs.Where(u => u.Usuario == usuario).FirstOrDefault();
            return eusuario;
        }
    }
    public token? tokenActivo(string token)
    {
        if (_context.TOKENs == null)
        {
            return null;
        }
        else
        {
            token? tk = _context.TOKENs.Where(u => u.tactivo == token).FirstOrDefault();
            return tk;
        }
    }
    public USUARIO? id_us_usuario(int id)
    {
        if (_context.USUARIOs == null)
        {
            return null;
        }
        else
        {
            USUARIO? eusuario = _context.USUARIOs.Where(u => u.Id_usuario == id).FirstOrDefault();
            return eusuario;
        }
    }
    public List<PAGO>? datos_pagos()
    {
        List<PAGO> pagos;
        if (_context.PAGOs == null)
        {
            return null;
        }
        else
        {
            pagos = _context.PAGOs.OrderBy(x => x.Id_pago).ToList();
        }
        return pagos;
    }
    public List<USUARIO>? datos_usuarios()
    {
        List<USUARIO> usuarios;
        if (_context.USUARIOs == null) {
            return null;
        }
        else
        {
            usuarios = _context.USUARIOs.OrderBy(x => x.Id_usuario).ToList();
        }
        foreach (USUARIO user in usuarios)
        {
            if (user.Contraseña != null)
            {
                user.Contraseña = DesEncriptar(user.Contraseña);
            }
        }
        return usuarios;
    }
    public List<TIPO>? datos_tipoMenu()
    {
        List<TIPO> usuarios;
        if (_context.TIPOs == null)
        {
            return null;
        }
        else
        {
            usuarios = _context.TIPOs.OrderBy(x => x.id_tipo).ToList();
        }
        return usuarios;
    }
    public List<ASISTENCIA>? datos_Asistencia()
    {
        List<ASISTENCIA> usuarios;
        if (_context.ASISTENCIAs == null)
        {
            return null;
        }
        else
        {
            usuarios = _context.ASISTENCIAs.OrderBy(x => x.id_asistencia).ToList();
        }
        return usuarios;
    }
    public List<asistenciaMostrar>? datos_AsistenciaUser(string id)
    {
        int id_usuario = int.Parse(id);
        int idRestaurante = 0;
        int idTipo = 0;
        List<ASISTENCIA> asistencias;
        List<asistenciaMostrar> final = new List<asistenciaMostrar>();
        if (_context.ASISTENCIAs == null)
        {
            return null;
        }
        else
        {
            asistencias = _context.ASISTENCIAs.Where(x => x.id_usuario == id_usuario).OrderBy(x => x.id_asistencia).ToList();
        }
        foreach (ASISTENCIA asistencia in asistencias)
        {
            idRestaurante = asistencia.id_restaurante;
            idTipo = asistencia.id_tipo;
            RESTAURANTE? restaurantes;
            if (_context.RESTAURANTEs == null)
            {
                return null;
            }
            {
                restaurantes = _context.RESTAURANTEs.Where(x => x.Id_restaurante == idRestaurante).OrderBy(x => x.Id_restaurante).FirstOrDefault();
            }
            asistenciaMostrar nuevo = new asistenciaMostrar();
            TIPO? tipo;
            if (_context.TIPOs == null)
            {
                return null;
            }
            {
                tipo = _context.TIPOs.Where(x => x.id_tipo == idTipo).OrderBy(x => x.id_tipo).FirstOrDefault();
            }
            if (restaurantes!= null && tipo!=null)
            {
                nuevo.nombreRestaurante = restaurantes.Nombre;
                nuevo.tipoAsistencia = tipo.descripcion;
                nuevo.fechaAsistencia = asistencia.fecha;
                final.Add(nuevo);
            }            
        }
        return final;
    }
    public List<pagosMostrar>? datos_PagosUser(string id)
    {
        int id_usuario = int.Parse(id);
        List<PAGO> pagos;
        List<pagosMostrar> final = new List<pagosMostrar>();
        if (_context.PAGOs == null)
        {
            return null;
        }
        else
        {
            pagos = _context.PAGOs.Where(x => x.Id_estudiante == id_usuario).OrderBy(x => x.Id_pago).ToList();
        }
        foreach (PAGO pago in pagos)
        {
            pagosMostrar nuevo = new pagosMostrar();
            nuevo.fecha = pago.Fechas;
            nuevo.pagado = int.Parse(pago.Cantidad + "");
            final.Add(nuevo);
        }
        return final;
    }
    public List<menuMostrar>? datos_MenuUser()
    {
        List<MENU> menus;
        List<menuMostrar> final = new List<menuMostrar>();
        if (_context.MENUs == null)
        {
            return null;
        }
        else
        {
            menus = _context.MENUs.OrderBy(x => x.Id_menu).ToList();
        }
        foreach (MENU menu in menus)
        {
            menuMostrar nuevo = new menuMostrar();
            nuevo.fecha = menu.Dia;
            if (menu.Menu != null)
            {
                nuevo.menu = menu.Menu;
            }
            TIPO? tipo = new TIPO();
            if (_context.TIPOs == null) { return null; }
            {
                tipo = _context.TIPOs.Where(x => x.id_tipo == menu.id_Tipo).OrderBy(x => x.id_tipo).FirstOrDefault();
                if (tipo != null)
                {
                    nuevo.tipo = tipo.descripcion;
                    final.Add(nuevo);
                }
                
            }
        }
        return final;
    }
    public List<ESTADO>? datos_estadosAdmin()
    {
        List<ESTADO> estados;
        if (_context.ESTADOs == null)
        {
            return null;
        }
        else
        {
            estados = _context.ESTADOs.OrderBy(x => x.Id_estado).ToList();
        }
        return estados;
    }
    public List<ROL>? datos_rolAdmin()
    {
        List<ROL> estados;
        if (_context.ROLs == null)
        {
            return null;
        }
        else
        {
            estados = _context.ROLs.OrderBy(x => x.Id_rol).ToList();
        }
        return estados;
    }
    public List<RESTAURANTE>? datos_restauranteAdmin()
    {
        List<RESTAURANTE> estados;
        if (_context.RESTAURANTEs == null)
        {
            return null;
        }
        else
        {
            estados = _context.RESTAURANTEs.OrderBy(x => x.Id_restaurante).ToList();
        }
        return estados;
    }
    public List<MENU>? datos_menuAdmin()
    {
        List<MENU> estados;
        if (_context.MENUs == null)
        {
            return null;
        }
        else
        {
            estados = _context.MENUs.OrderBy(x => x.Id_menu).ToList();
        }
        return estados;
    }
    public void insertarUsuario(USUARIO usuarios)
    {
        usuarios.Id_rol = 2;
        usuarios.Id_estado = 1;

        usuarios.Contraseña = Encriptar(usuarios.Contraseña);
        if (_context.USUARIOs == null) { }
        else
        {
            _context.USUARIOs.Add(usuarios);
            _context.SaveChanges();
        }
    }
    public void insertarUsuarioAdmin(USUARIO usuarios)
    {
        usuarios.Contraseña = Encriptar(usuarios.Contraseña);
        if (_context.USUARIOs == null) { }
        else
        {
            _context.USUARIOs.Add(usuarios);
            _context.SaveChanges();
        }
    }
    public USUARIO? login(string usuario, string contraseña)
    {
        contraseña = Encriptar(contraseña);
        if (_context.USUARIOs == null)
        {
            return null;
        }
        else
        {
            USUARIO? eusuario = _context.USUARIOs.Where(u => u.Usuario == usuario).Where(c => c.Contraseña == contraseña).FirstOrDefault();
            if (eusuario == null)
            {
                return null;
            }
            else
            {

                eusuario.Contraseña = DesEncriptar(eusuario.Contraseña);
                return eusuario;
            }
        }
    }
    public string Encriptar(string? clave)
    {
        string result = string.Empty;
        byte[] encryted = System.Text.Encoding.Unicode.GetBytes(clave+"");
        result = Convert.ToBase64String(encryted);
        Console.WriteLine("clave encriptada" + result);
        return result;
    }
    public string DesEncriptar(string? claveE)
    {
        try
        {
            string result = string.Empty;
            byte[] decryted = Convert.FromBase64String(claveE+"");
            //result = System.Text.Encoding.Unicode.GetString(decryted, 0, decryted.ToArray().Length);
            result = System.Text.Encoding.Unicode.GetString(decryted);
            Console.WriteLine("clave desencriptada" + result);
            return result;
        }
        catch (Exception ex)
        {
            Console.WriteLine("error", ex);
            return claveE + "";
        }
    }
    public void Ac_User(USUARIO usuario)
    {
        usuario.Contraseña = Encriptar(usuario.Contraseña);
        if (_context.USUARIOs == null) { }
        else
        {
            _context.USUARIOs.Attach(usuario);
            var entry = _context.Entry(usuario);
            entry.State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
    public void Ac_Pagos(PAGO pago)
    {
        if (_context.PAGOs == null) { }
        else
        {
            _context.PAGOs.Attach(pago);
            var entry = _context.Entry(pago);
            entry.State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
    public USUARIO? datos_usuario_log(int id)
    {
        USUARIO? usuarios;
        if (_context.USUARIOs == null)
        {
            return null;
        }
        else
        {
            usuarios = _context.USUARIOs.Where(x => x.Id_usuario == id).FirstOrDefault();
            if (usuarios != null)
            {
                usuarios.Contraseña = DesEncriptar(usuarios.Contraseña);
                return usuarios;
            }
        }
        return null;
    }
    public USUARIO? datos_usuario_cc(Decimal cc)
    {
        USUARIO? usuarios;
        if (_context.USUARIOs == null)
        {
            return null;
        }
        else
        {
            usuarios = _context.USUARIOs.Where(x => x.Identificacion == cc).FirstOrDefault();
            if (usuarios != null)
            {
                usuarios.Contraseña = DesEncriptar(usuarios.Contraseña);
                return usuarios;
            }
        }
        return null;
    }
    public USUARIO? comprobar_usuario(USUARIO user)
    {
        if (_context.USUARIOs == null)
        {
            return null;
        }
        else
        {
            return (USUARIO?)_context.USUARIOs.FirstOrDefault(x => (x.Usuario ?? "") == user.Usuario);
        }
    }
    public void insertarEstadoAdmin(ESTADO usuarios)
    {
        if (_context.ESTADOs == null) { }
        else
        {
            _context.ESTADOs.Add(usuarios);
            _context.SaveChanges();
        }
    }
    public void insertarRolAdmin(ROL usuarios)
    {
        if (_context.ROLs == null) { }
        else
        {
            _context.ROLs.Add(usuarios);
            _context.SaveChanges();
        }
    }
    public void insertarMenuAdmin(MENU usuarios)
    {
        if (_context.MENUs == null) { }
        else
        {
            _context.MENUs.Add(usuarios);
            _context.SaveChanges();
        }
    }

    internal void Ac_Estado(ESTADO estadoActualizado)
    {
        if (_context.ESTADOs == null) { }
        else
        {
            _context.ESTADOs.Attach(estadoActualizado);
            var entry = _context.Entry(estadoActualizado);
            entry.State = EntityState.Modified;
            _context.SaveChanges();
        }
    }

    internal void eliminarEstado(ESTADO eliminarEstado)
    {
        if (_context.ESTADOs == null) { }
        else
        {
            _context.ESTADOs.Attach(eliminarEstado);
            _context.ESTADOs.Remove(eliminarEstado);
            _context.SaveChanges();
        }
    }

    internal void Ac_Rol(ROL rolActualizado)
    {
        if (_context.ROLs == null) { }
        else
        {
            _context.ROLs.Attach(rolActualizado);
            var entry = _context.Entry(rolActualizado);
            entry.State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}