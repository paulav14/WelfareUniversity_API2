using Microsoft.AspNetCore.Mvc;

namespace welfareUniversity_API.Controllers
{
    [Route("api/token")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly WELFAREContext _context;
        public TokenController(WELFAREContext context)
        {
            _context = context;
        }

        [HttpGet("{tokenValidar}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(token))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerToken(string tokenValidar)
        {
            token? token = new Usuarios(_context).tokenActivo(tokenValidar);
            return Ok(token);
        }

        [HttpPost]
        public IActionResult CrearToken([FromBody] token nuevoToken)
        {
            if (nuevoToken == null)
            {
                return BadRequest("Datos de Token no válidos");
            }
            new Usuarios(_context).insertarToken(nuevoToken);
            return Ok("guardado exitosamente");
        }

    }
}
