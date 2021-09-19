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

            var auroraTicket = new Ticket
                { Date = "01.10.21", StartTime = "10:00", EndTime = "14:00", Route = route1 };
            var mysticTicket = new Ticket
                { Date = "92.23.97", StartTime = "91:00", EndTime = "23:00", Route = route2 };

            var customer1 = new Customer
            {
                FirstName = "Tor", LastName = "Kratte", Address = "Oslomet P35", Phone = "12349872",
                Tickets = new List<Ticket>()
            };
            customer1.Tickets.Add(auroraTicket);
            var customer2 = new Customer
            {
                FirstName = "Anthony", LastName = "GioGio", Address = "Oslomet P52", Phone = "REDACTED",
                Tickets = new List<Ticket>()
            };
            customer2.Tickets.Add(mysticTicket);

            boatLineContext.Add(customer1);
            boatLineContext.Add(customer2);

            boatLineContext.SaveChanges();
        }
    }
}