using Microsoft.EntityFrameworkCore;

namespace webapp_gruppeoppgave.Models
{
    public class RouteDb : DbContext
    {
        public RouteDb(DbContextOptions<RouteDb> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
    }
}