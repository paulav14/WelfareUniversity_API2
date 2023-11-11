using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("RESTAURANTE",Schema ="dbo")]
public class RESTAURANTE
{
    [Key]
    public int Id_restaurante { get; set; }
    public string? Nombre { get; set; }
}