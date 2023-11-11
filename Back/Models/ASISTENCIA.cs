using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("ASISTENCIA",Schema ="dbo")]
public class ASISTENCIA
{
    [Key]
    public int id_asistencia { get; set; }
    [ForeignKey("RESTAURANTE")]
    public int id_restaurante { get; set; }
    [ForeignKey("USUARIO")]
    public int id_usuario { get; set; }
    public DateTime fecha { get; set; }
    [ForeignKey("TIPO")]
    public int id_tipo { get; set; }

    public RESTAURANTE? RESTAURANTE { get; set; }
    public USUARIO? USUARIO { get; set; }
    public TIPO? TIPO { get; set; }
}