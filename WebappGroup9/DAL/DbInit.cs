using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using WebappGroup9.Models;

namespace WebappGroup9.DAL
{
    public static class DbInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var boatLineContext = serviceScope.ServiceProvider.GetService<BoatLineDb>();

            if (boatLineContext == null) return;
            boatLineContext.Database.EnsureDeleted();
            boatLineContext.Database.EnsureCreated();

            var route1 = new Route { Id = 1, Departure = "Vermillion City", Destination = "Sevii Islands" };
            var route2 = new Route { Id = 2, Departure = "Oslo", Destination = "Copenhagen" };

            var cabin1 = new Cabin() { Id = 1, Type = "Luksus" };
            var cabin2 = new Cabin() { Id = 2, Type = "Super Luksus" };
            var cabin3 = new Cabin() { Id = 3, Type = "Billig" };


            var auroraTicket = new Ticket
            {
                Date = "01.10.21", StartTime = "10:00", EndTime = "14:00", Route = route1, CabinAmount = 1,
                Cabin = new List<Cabin> { cabin1 }
            };

            var mysticTicket = new Ticket
            {
                Date = "92.23.97", StartTime = "91:00", EndTime = "23:00", Route = route2, CabinAmount = 2,
                Cabin = new List<Cabin>
                {
                    cabin2,
                    cabin3
                }
            };

            var customer1 = new Customer
            {
                FirstName = "Tor", LastName = "Kratte", Address = "Oslomet P35", Phone = "12349872",
                Tickets = new List<Ticket> { auroraTicket }
            };
            var customer2 = new Customer
            {
                FirstName = "Anthony", LastName = "GioGio", Address = "Oslomet P52", Phone = "REDACTED",
                Tickets = new List<Ticket> { mysticTicket }
            };

            boatLineContext.Add(customer1);
            boatLineContext.Add(customer2);

            boatLineContext.SaveChanges();
        }
    }
}