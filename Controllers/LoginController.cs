using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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

    }
}
