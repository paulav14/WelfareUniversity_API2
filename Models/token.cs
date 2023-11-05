using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("token", Schema = "dbo")]
public class token
{
    [Key]
    public int id_token { get; set; }
    [ForeignKey("USUARIO")]
    public int id_user { get; set; }
    public DateTime finicio { get; set; }
    public DateTime ffin { get; set; }
    public string? tactivo { get; set; }

    public USUARIO? USUARIO { get; set; }
}