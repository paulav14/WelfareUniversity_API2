using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace welfareUniversity_API.Controllers
{
    [Route("api/restaurante")]
    [ApiController]
    public class RestauranteController : ControllerBase
    {
        private readonly WELFAREContext _context;
        public RestauranteController(WELFAREContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(RESTAURANTE))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerRestaurantes()
        {
            List<RESTAURANTE>? listaRestaurante = new Usuarios(_context).datos_restauranteAdmin();
            return Ok(listaRestaurante);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult CrearRestaurante([FromBody] RESTAURANTE nuevoRestaurante)
        {
            if (nuevoRestaurante == null)
            {
                return BadRequest("Datos de Restaurante no válidos");
            }
            new Usuarios(_context).insertarRestaurante(nuevoRestaurante);
            return Ok("guardado exitosamente");
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult EliminarRestaurante([FromBody] RESTAURANTE eliminarRestaurante)
        {
            new Usuarios(_context).eliminarRestaurante(eliminarRestaurante);
            return Ok("Eliminado exitosamente");
        }
    }
}
