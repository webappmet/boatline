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
        public DbSet<Cabin> Cabins { get; set; }


        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
        
        // For a small ammount of time it needed this thing to work with many to many, but now it does not.
        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);
        // }
                
        // Some guide wanted me to use this stuff, did not work, now it doesn't compile without the stuff on top
        // protected override void OnModelCreating(DbModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);
        // }
        
        /*
         * Some sources:
         * https://www.learnentityframeworkcore.com/configuration/fluent-api
         * https://www.entityframeworktutorial.net/code-first/configure-many-to-many-relationship-in-code-first.aspx
         */
    }
}