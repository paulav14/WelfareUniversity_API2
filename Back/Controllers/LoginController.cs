using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json;

namespace welfareUniversity_API.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly WELFAREContext _context;
        public LoginController(WELFAREContext context)
        {
            _context = context;
        }

        [HttpGet("{USUARIO}/{CONTRASEÑA}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(USUARIO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult? Login(String USUARIO, String CONTRASEÑA)
        {
            USUARIO? usuario = new Usuarios(_context).login(USUARIO, CONTRASEÑA);
            if(usuario == null)
            {
                return NotFound("Usuario no encontrado");
            }
            DateTime expire = DateTime.Now.AddMinutes(15);
            IEnumerable<Claim> claims = new Claim[]
            {
                new Claim("UsuarioInfoId",usuario.Id_usuario.ToString()),
                new Claim("TiempoExpiracion",expire.ToString("yyyy-MM-dd HH:mm:ss"))
            };
            var JWToken = new JwtSecurityToken(issuer: "https://localhost:7212", audience: "https://localhost:7212", claims: claims, notBefore: new DateTimeOffset(DateTime.Now).DateTime, expires: new DateTimeOffset(expire).DateTime, signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("WelfareUniversity")), SecurityAlgorithms.HmacSha256));
            usuario.Jwt = new JwtSecurityTokenHandler().WriteToken(JWToken);
            return Ok(usuario);
        }

        [HttpPost("EnviarToken")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult? EnviarToken([FromBody] CambioClave request)
        {
            USUARIO Rusuario = new Usuarios(_context).contraseña(request.usuario);
            token Otoken = new token();
            Otoken.finicio = DateTime.Now;
            Otoken.ffin = DateTime.Now.AddMinutes(10);
            Otoken.id_user = Rusuario.Id_usuario;
            Otoken.tactivo = new Usuarios(_context).encriptar(JsonConvert.SerializeObject(Otoken));//convierte en cadena JSON clase Token obj token
            new Usuarios(_context).insertarRusuario(Otoken);
            string linkacceso = Otoken.tactivo;
            new Usuarios(_context).enviarmail(Rusuario.Correo_electronico, Otoken.tactivo, linkacceso);
            return Ok("Mensaje enviado al correo registrado.");
        }

        [HttpPost("CambiarClave")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult? CambiarClave([FromBody] CambioClave request)
        {
            string tk = request.token;
            token id = new Usuarios(_context).token_id_us(tk);
            USUARIO us = new Usuarios(_context).id_us_usuario(id.id_user);
            us.Contraseña = request.Contraseña;
            token to = new Usuarios(_context).validartoken(tk, us.Id_usuario);
            if (to.ffin > DateTime.Now)
            {
                new Usuarios(_context).Ac_User(us);
                new Usuarios(_context).enviarmail_actualizarUsuario(us.Correo_electronico, us);
                return Ok("Clave actualizada satisfactoriamente");
            }
            else
            {
                return Ok("El limite de tiempo se acabo, vuelva a iniciar el proceso");
            }
        }
    }
    public class CambioClave
    {
        public string usuario { get; set; }
        public string Contraseña { get; set; }
        public string token { get; set; }
    }
}
