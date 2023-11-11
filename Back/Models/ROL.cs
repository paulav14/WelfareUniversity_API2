using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("ROL",Schema ="dbo")]
public class ROL
{
    [Key]
    public int Id_rol { get; set; }
    public string? Nombre { get; set; }

    public ICollection<USUARIO>? USUARIOs { get; set; }
}