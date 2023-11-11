using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace welfareUniversity_API.Controllers
{
    [Route("api/Estado")]
    [ApiController]
    public class EstadoController : ControllerBase
    {
        private readonly WELFAREContext _context;
        public EstadoController(WELFAREContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ESTADO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerEstado()
        {
            List<ESTADO>? listaEstado = new Usuarios(_context).datos_estadosAdmin();
            return Ok(listaEstado);
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ESTADO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerEstadoId(int id)
        {
            ESTADO? seleccion=null;
            List<ESTADO>? lista = new Usuarios(_context).datos_estadosAdmin();
            if(lista != null)
            {
                foreach (var item in lista)
                {
                    if (item.Id_estado == id)
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
        public IActionResult CrearEstado([FromBody] ESTADO nuevoEstado)
        {
            if (nuevoEstado == null)
            {
                return BadRequest("Datos de Estado no válidos");
            }
            new Usuarios(_context).insertarEstadoAdmin(nuevoEstado);
            return Ok("guardado exitosamente");
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult ActualizarEstado(int id, [FromBody] ESTADO estadoActualizado)
        {
            new Usuarios(_context).Ac_Estado(estadoActualizado);
            return Ok("actualizado exitosamente");
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult EliminarEstado([FromBody] ESTADO eliminarEstado)
        {
            new Usuarios(_context).eliminarEstado(eliminarEstado);
            return Ok("Eliminado exitosamente");
        }
    }
}
