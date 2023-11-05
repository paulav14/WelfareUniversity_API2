using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace welfareUniversity_API.Controllers
{
    [Route("api/menu")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly WELFAREContext _context;
        public MenuController(WELFAREContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(menuMostrar))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerMenu()
        {
            List<menuMostrar>? listaMenu = new Usuarios(_context).datos_MenuUser();
            return Ok(listaMenu);
        }

        [HttpGet("{admin}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(MENU))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult? ObtenerMenuAdmin(string admin)
        {
            if (admin != null && admin.Equals("SI"))
            {
                List<MENU>? listaMenu = new Usuarios(_context).datos_menuAdmin();
                return Ok(listaMenu);
            }
            else
            {
                return BadRequest(new { mensaje = "Ocurrió un error al procesar la solicitud." });
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult CrearMenu([FromBody] MENU nuevoMenu)
        {
            if (nuevoMenu == null)
            {
                return BadRequest("Datos de Menu no válidos");
            }
            new Usuarios(_context).insertarMenuAdmin(nuevoMenu);
            return Ok("guardado exitosamente");
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult EliminarMenu([FromBody] MENU eliminarMenu)
        {
            new Usuarios(_context).eliminarMenu(eliminarMenu);
            return Ok("Eliminado exitosamente");
        }
    }
}
