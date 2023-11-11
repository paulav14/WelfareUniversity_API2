using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace welfareUniversity_API.Controllers
{
    [Route("api/asistencia")]
    [ApiController]
    [Authorize]
    public class AsistenciaController : ControllerBase
    {
        private readonly WELFAREContext _context;
        public AsistenciaController(WELFAREContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ASISTENCIA))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerAsistencia()
        {
            List<ASISTENCIA>? listaAsistencia = new Usuarios(_context).datos_Asistencia();
            return Ok(listaAsistencia);
        }


        /// <summary>
        /// Obtiene un usuario por su ID.
        /// </summary>
        /// <param name="id">ID del usuario.</param>
        /// <returns>Un objeto de tipo Usuario.</returns>
        [HttpGet("{id_user}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(asistenciaMostrar))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerAsistenciaPorId(string id_user)
        {
            List<asistenciaMostrar>? listaAsistencia = new Usuarios(_context).datos_AsistenciaUser(id_user);
            if (listaAsistencia == null)
            {
                return NotFound("Asistencias no encontradas");
            }

            return Ok(listaAsistencia);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult CrearAsistencia([FromBody] ASISTENCIA nuevoAsistencia)
        {
            if (nuevoAsistencia == null)
            {
                return BadRequest("Datos de Asistencia no válidos");
            }
            new Usuarios(_context).insertarAsistencia(nuevoAsistencia);
            return Ok("guardado exitosamente");
        }
    }
}
