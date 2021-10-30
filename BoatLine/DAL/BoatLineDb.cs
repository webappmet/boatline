using Microsoft.EntityFrameworkCore;
using BoatLine.Models;
using BoatLine.Models.Auth;
using Microsoft.Extensions.Logging;

namespace BoatLine.DAL
{
    public sealed class BoatLineDb : DbContext
    {
        private readonly ILoggerFactory _loggerFactory;

        public BoatLineDb(DbContextOptions<BoatLineDb> options, ILoggerFactory loggerFactory) : base(options)
        {
            this._loggerFactory = loggerFactory;
            Database.EnsureCreated();
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<PostalCode> PostalCodes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<Cabin> Cabins { get; set; }
        
        public DbSet<Departure> Departures { get; set; }
        public DbSet<DbAdmin> Admins { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
            optionsBuilder.UseLoggerFactory(this._loggerFactory);
        }
    }
}