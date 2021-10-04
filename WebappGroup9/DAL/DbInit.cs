using System;
using System.Collections.Generic;
using System.Linq;
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

            // Source: https://www.bring.no/tjenester/adressetjenester/postnummer
            // Extra source: https://social.msdn.microsoft.com/Forums/vstudio/en-US/3d482df5-226f-41a4-a0a6-a67f16b2b4a1/how-to-parse-efficiently-a-tab-separated-text-file?forum=csharpgeneral
            string[] postInfo = System.IO.File.ReadAllLines("Postnummerregister-ansi.txt");
            foreach (string line in postInfo)
            {
                // Cool debug line uncommet for a billion souts
                // Console.WriteLine(line.Substring(0,4) + " " + line.Split("\t")[1]);
                var temp = new PostalCode() { Code = line.Substring(0, 4), Name = line.Split("\t")[1] };
                boatLineContext.PostalCodes.Add(temp);
            }

            /*
             * need to save these changes here so that things can be attached to postal numbers later
             * Though could also do it like they discuss on this site:
             * https://docs.microsoft.com/en-us/answers/questions/181032/having-trouble-with-foreign-key-in-entity-can39t-t.html
             */
            boatLineContext.SaveChanges();

            var route1 = new Route
            {
                Id = 1, Departure = "Vermillion City", Destination = "Sevii Islands", DurationDays = 3,
                DurationHours = 17
            };
            var route2 = new Route
                { Id = 2, Departure = "Oslo", Destination = "Copenhagen", DurationDays = 17, DurationHours = 11 };

            var cabin1 = new Cabin() { Id = 1, Type = "Luksus", Floor = "1st", Room = "02", Beds = 4, Price = 1890.99 };
            var cabin2 = new Cabin() { Id = 2, Type = "Super Luksus" };
            var cabin3 = new Cabin() { Id = 3, Type = "Billig" };


            var auroraTicket = new Ticket
            {
                Date = "01.10.21", StartTime = "10:00", Route = route1, CabinAmount = 1,
                Cabins = new HashSet<Cabin>() { cabin1, cabin2 }
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
                FirstName = "Tor", LastName = "Kratte", StreetAddress = "Oslomet P35",
                PostalCode = boatLineContext.PostalCodes.FirstOrDefault(c => c.Code == "0170"),
                Phone = "12349872",
                Payment = new Payment
                {
                    CardHolderName = "Tor Kratte",
                    CardNumber = "1234 3243 3423 1234",
                    ExpirationMonth = "03",
                    ExpirationYear = "23"
                },
                Email = "blah@oslomet.no",
                Tickets = new List<Ticket> { auroraTicket }
            };
            var customer2 = new Customer
            {
                FirstName = "Anthony", LastName = "GioGio", StreetAddress = "Oslomet P52",
                PostalCode = boatLineContext.PostalCodes.FirstOrDefault(c => c.Code == "1353"),
                Payment = new Payment
                {
                    CardHolderName = "Anthony GioGio",
                    CardNumber = "1234 1234 6454 1234",
                    ExpirationMonth = "06",
                    ExpirationYear = "24"
                },
                Phone = "REDACTED",
                Email = "blugh@oslomet.no",
                Tickets = new List<Ticket> { mysticTicket }
            };
            var customer3 = new Customer
            {
                FirstName = "Tengel", LastName = "UniDes", StreetAddress = "Datatorget", Phone = "93828393",
                Payment = new Payment
                {
                    CardHolderName = "Tengel UniDes",
                    CardNumber = "1234 1232 1234 1234",
                    CSC = "543",
                    ExpirationMonth = "05",
                    ExpirationYear = "22"
                },
                Email = "bleee@oslomet.no",
                Tickets = new List<Ticket>()
            };

            boatLineContext.Add(customer1);
            boatLineContext.Add(customer2);
            boatLineContext.Add(customer3);

            boatLineContext.SaveChanges();
        }
    }
}