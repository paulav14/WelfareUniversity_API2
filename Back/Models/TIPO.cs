using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("TIPO",Schema ="dbo")]
public class TIPO
{
    [Key]
    public int id_tipo { get; set; }
    public string? descripcion { get; set; }
    public int costo { get; set; }

    public ICollection<ASISTENCIA>? ASISTENCIAs { get; set; }
    public ICollection<MENU>? MENUs { get; set; }
}