using Microsoft.EntityFrameworkCore;
using WebappGroup9.Models;

namespace WebappGroup9.DAL
{
    public sealed class BoatLineDb : DbContext
    {
        public BoatLineDb(DbContextOptions<BoatLineDb> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Route> Routes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}