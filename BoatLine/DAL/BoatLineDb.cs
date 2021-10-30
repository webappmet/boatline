using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using BoatLine.Models;
using BoatLine.Models.Auth;

namespace BoatLine.DAL
{
    public sealed class BoatLineDb : DbContext
    {
        [ExcludeFromCodeCoverage]
        public BoatLineDb(DbContextOptions<BoatLineDb> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<PostalCode> PostalCodes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<Cabin> Cabins { get; set; }
        public DbSet<DbAdmin> Admins { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}