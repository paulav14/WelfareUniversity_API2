
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class WELFAREContext : DbContext
{
    public WELFAREContext(DbContextOptions dbContextOptions) : base(dbContextOptions) { }
   
    public DbSet<ESTADO> ESTADOs { get; set; }
    public DbSet<MENU> MENUs { get; set; }
    public DbSet<PAGO> PAGOs { get; set; }
    public DbSet<RESTAURANTE> RESTAURANTEs { get; set; }
    public DbSet<ROL> ROLs { get; set; }
    public DbSet<USUARIO> USUARIOs { get; set; }
    public DbSet<token> TOKENs { get; set; }
    public DbSet<TIPO> TIPOs { get; set; }
    public DbSet<ASISTENCIA> ASISTENCIAs { get; set; }
    
}