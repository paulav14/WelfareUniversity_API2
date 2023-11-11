using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("ESTADO",Schema ="dbo")]
public class ESTADO
{
    [Key]
    public int Id_estado { get; set; }
    public string? Nombre { get; set; }

    public ICollection<USUARIO>? USUARIOs { get; set; }
}