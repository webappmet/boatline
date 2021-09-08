using Microsoft.EntityFrameworkCore;

namespace webapp_gruppeoppgave.Models
{
    public class TurDb : DbContext
    {
        public TurDb(DbContextOptions<TurDb> options) : base(options)
        {
            Database.EnsureCreated();
        }
        
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Customer> Customers { get; set; }


    }
}