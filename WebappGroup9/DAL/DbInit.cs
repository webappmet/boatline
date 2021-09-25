using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing.Template;
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
            
            //TODO read postNr values from file
            // Source: https://www.bring.no/tjenester/adressetjenester/postnummer
            string[] PostInfo = System.IO.File.ReadAllLines("Postnummerregister-ansi.txt");
            foreach (string line in PostInfo)
            {
                // Cool debug line uncommet for a billion souts
                // Console.WriteLine(line.Substring(0,4) + " " + line.Split("\t")[1]);
                var temp = new PostalNr() { Id = Int32.Parse(line.Substring(0, 4)), Name = line.Split("\t")[1]};
                boatLineContext.PostalNrs.Add(temp);
                

            }

            // for (int i = 0; i < PostInfo.Length; i++)
            // {
            //     boatLineContext.Add(new PostalNr() {Id: })
            // }
            
            
            // Console.WriteLine(PostInfo.ToString());
            
            // foreach (string line in PostInfo)
            // {
            //     PostalNr temp = new PostalNr()
            //     boatLineContext.Add(new PostalNr());
            //     
            // }

            var route1 = new Route { Id = 1, Departure = "Vermillion City", Destination = "Sevii Islands", DurationDays = 3, DurationHours = 17};
            var route2 = new Route { Id = 2, Departure = "Oslo", Destination = "Copenhagen", DurationDays = 17, DurationHours = 11};

            var cabin1 = new Cabin() { Id = 1, Type = "Luksus", Floor = "1st", Room = "02", Beds = 4, Price = 1890.99};
            var cabin2 = new Cabin() { Id = 2, Type = "Super Luksus" };
            var cabin3 = new Cabin() { Id = 3, Type = "Billig" };


            var auroraTicket = new Ticket
            {
                Date = "01.10.21", StartTime = "10:00", Route = route1, CabinAmount = 1,
                Cabins = new HashSet<Cabin>() {cabin1, cabin2}
            };


            var mysticTicket = new Ticket
            {
                Date = "92.23.97", StartTime = "91:00", Route = route2, CabinAmount = 2,
                Cabins = new HashSet<Cabin>()
                {
                    cabin1,
                    cabin3
                }
            };
            

            var customer1 = new Customer
            {
                FirstName = "Tor", LastName = "Kratte", Address = "Oslomet P35", Phone = "12349872", Email = "blah@oslomet.no",
                Tickets = new List<Ticket> { auroraTicket }
            };
            var customer2 = new Customer
            {
                FirstName = "Anthony", LastName = "GioGio", Address = "Oslomet P52", Phone = "REDACTED", Email = "blugh@oslomet.no",
                Tickets = new List<Ticket> { mysticTicket }
            };
            var customer3 = new Customer()
            {
                FirstName = "Tengel", LastName = "UniDes", Address = "Datatorget", Phone = "93828393", Email = "bleee@oslomet.no",
                Tickets = new List<Ticket>()
            };

            boatLineContext.Add(customer1);
            boatLineContext.Add(customer2);
            boatLineContext.Add(customer3);

            boatLineContext.SaveChanges();
        }
    }
}