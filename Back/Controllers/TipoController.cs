using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace welfareUniversity_API.Controllers
{
    [Route("api/tipo")]
    [ApiController]
    public class TipoController : ControllerBase
    {
        private readonly WELFAREContext _context;
        public TipoController(WELFAREContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TIPO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerTipo()
        {
            List<TIPO>? listaTipo = new Usuarios(_context).datos_tipoMenu();
            return Ok(listaTipo);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult CrearTipo([FromBody] TIPO nuevoTipo)
        {
            if (nuevoTipo == null)
            {
                return BadRequest("Datos de Restaurante no válidos");
            }
            new Usuarios(_context).insertarTipoMenu(nuevoTipo);
            return Ok("guardado exitosamente");
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult EliminarTipo([FromBody] TIPO eliminarTipo)
        {
            new Usuarios(_context).eliminarTipo(eliminarTipo);
            return Ok("Eliminado exitosamente");
        }
    }
}
