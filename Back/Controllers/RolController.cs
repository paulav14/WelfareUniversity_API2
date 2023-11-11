using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace welfareUniversity_API.Controllers
{
    [Route("api/rol")]
    [ApiController]
    public class RolController : ControllerBase
    {
        private readonly WELFAREContext _context;
        public RolController(WELFAREContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ROL))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerRol()
        {
            List<ROL>? listaRol = new Usuarios(_context).datos_rolAdmin();
            return Ok(listaRol);
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ROL))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerEstadoId(int id)
        {
            ROL? seleccion = null;
            List<ROL>? lista = new Usuarios(_context).datos_rolAdmin();
            if (lista != null)
            {
                foreach (var item in lista)
                {
                    if (item.Id_rol == id)
                    {
                        seleccion = item;
                    }
                }
                if (seleccion != null)
                {
                    return Ok(seleccion);
                }
                else
                {
                    return BadRequest("No existe ese dato");
                }
            }
            else
            {
                return BadRequest("No hay datos");
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult CrearRol([FromBody] ROL nuevoRol)
        {
            if (nuevoRol == null)
            {
                return BadRequest("Datos de Restaurante no válidos");
            }
            new Usuarios(_context).insertarRolAdmin(nuevoRol);
            return Ok("guardado exitosamente");
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult EliminarRol([FromBody] ROL eliminarRol)
        {
            new Usuarios(_context).eliminarRol(eliminarRol);
            return Ok("Eliminado exitosamente");
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult ActualizarRol(int id, [FromBody] ROL rolActualizado)
        {
            new Usuarios(_context).Ac_Rol(rolActualizado);
            return Ok("actualizado exitosamente");
        }
    }
}
