using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace welfareUniversity_API.Controllers
{
    [Route("api/usuarios")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly WELFAREContext _context;
        public UsuariosController(WELFAREContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(USUARIO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerUsuarios()
        {
            List<USUARIO>? listaUsuarios = new Usuarios(_context).datos_usuarios();
            return Ok(listaUsuarios);
        }

        [HttpGet("oculto/{idOculto}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(USUARIO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerUsuarioIdOculto(int idOculto)
        {
            USUARIO? Usuario = new Usuarios(_context).id_us_usuario(idOculto);
            return Ok(Usuario);
        }

        [HttpGet("publico/{idPublico}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(USUARIO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerUsuarioIdPublico(int idPublico)
        {
            USUARIO? Usuario = new Usuarios(_context).datos_usuario_log(idPublico);
            return Ok(Usuario);
        }

        [HttpGet("identificacion/{identificacion}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(USUARIO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerUsuarioIdentificacion(Decimal identificacion)
        {
            USUARIO? Usuario = new Usuarios(_context).datos_usuario_cc(identificacion);
            return Ok(Usuario);
        }

        [HttpGet("login/{login}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(USUARIO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerUsuariologin(string login)
        {
            USUARIO? Usuario = new Usuarios(_context).contraseña(login);
            return Ok(Usuario);
        }

        [HttpPost("{admin}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult CrearUsuarios(string admin,[FromBody] USUARIO nuevoUsuarios)
        {
            if (nuevoUsuarios == null)
            {
                return BadRequest("Datos de Usuarios no válidos");
            }
            if(admin != null && admin.Equals("SI"))
            {
                new Usuarios(_context).insertarUsuarioAdmin(nuevoUsuarios);
            }
            else
            {
                new Usuarios(_context).insertarUsuario(nuevoUsuarios);
            }
            return Ok("guardado exitosamente");
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(USUARIO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ComprobarUsuarios([FromBody] USUARIO comprobarUsuarios)
        {
            if (comprobarUsuarios == null)
            {
                return BadRequest("Datos de Usuarios no válidos");
            }
            USUARIO? Usuario = new Usuarios(_context).comprobar_usuario(comprobarUsuarios);
            return Ok(Usuario);
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult EliminarUsuarios([FromBody] USUARIO eliminarUsuarios)
        {
            new Usuarios(_context).eliminarUsuario(eliminarUsuarios);
            return Ok("Eliminado exitosamente");
        }


        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult ActualizarUsuario(int id, [FromBody] USUARIO usuarioActualizado)
        {
            new Usuarios(_context).Ac_User(usuarioActualizado);
            return Ok("actualizado exitosamente");
        }
    }
}
