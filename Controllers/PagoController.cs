using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace welfareUniversity_API.Controllers
{
    [Route("api/pagos")]
    [ApiController]
    public class PagoController : ControllerBase
    {
        private readonly WELFAREContext _context;
        public PagoController(WELFAREContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PAGO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerPagos()
        {
            List<PAGO>? listaPagos = new Usuarios(_context).datos_pagos();
            return Ok(listaPagos);
        }

        [HttpGet("{id_user}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(pagosMostrar))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult ObtenerPagoPorId(string id_user)
        {
            List<pagosMostrar>? pagos = new Usuarios(_context).datos_PagosUser(id_user);
            if (pagos == null)
            {
                return NotFound("Asistencias no encontradas");
            }

            return Ok(pagos);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult CrearPagos([FromBody] PAGO nuevoPagos)
        {
            if (nuevoPagos == null)
            {
                return BadRequest("Datos de Pagos no válidos");
            }
            new Usuarios(_context).insertarPago(nuevoPagos);
            return Ok("guardado exitosamente");
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult ActualizarPago(int id, [FromBody] PAGO pagoActualizado)
        {
            new Usuarios(_context).Ac_Pagos(pagoActualizado);
            return Ok("actualizado exitosamente");
        }
    }
}
