using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

[Table("Pago", Schema = "dbo")]
public class PAGO
{
    [Key]
    public int Id_pago { get; set; }

    [ForeignKey("USUARIO")]
    public int Id_estudiante { get; set; }
    public string? Fechas { get; set; }
    public decimal Cantidad { get; set; }
    public string? Concepto { get; set; }


    public USUARIO? USUARIO { get; set; }
}