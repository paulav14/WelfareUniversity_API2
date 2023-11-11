using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Query;

[Table("USUARIO",Schema="dbo")]
public class USUARIO
{
    [Key]
    public int Id_usuario { get; set; }
    [ForeignKey("ESTADO")]
    public int Id_estado { get; set; }
    [ForeignKey("ROL")]
    public int Id_rol { get; set; }
    public string? Nombre { get; set; }
    public string? Usuario { get; set; }
    public string? Contraseña { get; set; }
    public Decimal Telefono { get; set; }
    public string? Correo_electronico { get; set; }
    public Decimal Identificacion { get; set; }

    [NotMapped]
    public String? Jwt { get; set; } = String.Empty;

    //tablas referenciadas
    public ROL? ROL { get; set; }
    public ESTADO? ESTADO { get; set; }

    //tablas donde existe referencia
    public ICollection<token>? tokens { get; set; }
    public ICollection<PAGO>? PAGOs { get; set; }
    public ICollection<ASISTENCIA>? ASISTENCIAs { get; set; }
}