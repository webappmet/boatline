using Microsoft.EntityFrameworkCore;

namespace webapp_gruppeoppgave.Models
{
    public class BoatLineDb : DbContext
    {
        public BoatLineDb(DbContextOptions<BoatLineDb> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
    }
}