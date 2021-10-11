using System.Collections.Generic;
using System.Linq;
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

            // Source: https://www.bring.no/tjenester/adressetjenester/postnummer
            // Extra source: https://social.msdn.microsoft.com/Forums/vstudio/en-US/3d482df5-226f-41a4-a0a6-a67f16b2b4a1/how-to-parse-efficiently-a-tab-separated-text-file?forum=csharpgeneral
            string [] postInfo = System.IO.File.ReadAllLines("Postnummerregister-ansi.txt");
            foreach (var line in postInfo)
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
                Id = 1, Departure = "Oslo", Destination = "Kiel", DurationDays = 3, DurationHours = 17
            };

            var route2 = new Route
            {
                Id = 2, Departure = "Oslo", Destination = "Copenhagen", DurationDays = 3, DurationHours = 11
            };

            var route3 = new Route
            {
                Id = 3, Departure = "Larvik", Destination = "Hirtshals", DurationDays = 4, DurationHours = 11
            };

            var route4 = new Route
            {
                Id = 4, Departure = "Kristiansand", Destination = "Hirtshals", DurationDays = 2, DurationHours = 15
            };

            var route5 = new Route
            {
                Id = 5, Departure = "Strømstad", Destination = "Sandefjord", DurationDays = 5, DurationHours = 13
            };
            
            boatLineContext.Routes.Add(route1);
            boatLineContext.Routes.Add(route2);
            boatLineContext.Routes.Add(route3);
            boatLineContext.Routes.Add(route4);
            boatLineContext.Routes.Add(route5);

            boatLineContext.SaveChanges();

            for (var i = 1; i < 4; i++) // i = floor level
            {
                for (var j = 1; j <= 26; j++) // j = room number
                {
                    var cabin = new Cabin
                    {
                        Id = i * 100 + j
                    };
                    switch (j)
                    {
                        case <= 10:
                            cabin.Beds = 2;
                            cabin.Type = "Economy";
                            cabin.Price = (double) 500 * (10 + i) / 10;
                            break;
                        case <= 18:
                            cabin.Beds = 5;
                            cabin.Type = "Premium economy";
                            cabin.Price = (double) 700 * (10 + i) / 10;
                            break;
                        case < 22:
                            cabin.Beds = 4;
                            cabin.Type = "Business";
                            cabin.Price = (double) 1000 * (10 + i) / 10;
                            break;
                        default:
                            cabin.Beds = 2;
                            cabin.Type = "First class";
                            cabin.Price = (double) 1200 * (10 + i) / 10;
                            break;
                    }

                    boatLineContext.Cabins.Add(cabin);
                }
            }

            boatLineContext.SaveChanges();

            var ticket1 = new Ticket
            {
                Date = "01.10.21",
                StartTime = "10:00",
                Route = route1,
                Cabins = new HashSet<Cabin>()
                {
                    boatLineContext.Cabins.FirstOrDefault(c => c.Id == 102),
                    boatLineContext.Cabins.FirstOrDefault(c => c.Id == 110)
                }
            };
            
            var ticket2 = new Ticket
            {
                Date = "12.10.21",
                StartTime = "12:00",
                Route = route2,
                Cabins = new HashSet<Cabin>()
                {
                    boatLineContext.Cabins.FirstOrDefault(c => c.Id == 201),
                    boatLineContext.Cabins.FirstOrDefault(c => c.Id == 202)
                }
            };

            var ticket3 = new Ticket
            {
                Date = "15.11.21",
                StartTime = "14:00",
                Route = route3,
                Cabins = new HashSet<Cabin>()
                {
                    boatLineContext.Cabins.FirstOrDefault(c => c.Id == 301)
                }
            };

            var customer1 = new Customer
            {
                FirstName = "Ola",
                LastName = "Nordmann",
                StreetAddress = "Norgesveien 22",
                PostalCode = boatLineContext.PostalCodes.FirstOrDefault(c => c.Code == "0170"),
                Phone = "43575454",
                Email = "ola@nordmann.no",
                Payment = new Payment
                {
                    CardHolderName = "Ola Nordmann",
                    CardNumber = "1234 3243 3423 1234",
                    CSC = "123",
                    ExpirationMonth = "03",
                    ExpirationYear = "23"
                },
                Tickets = new List<Ticket> { ticket1 }
            };


            var customer2 = new Customer
            {
                FirstName = "Lisa",
                LastName = "Heimstad",
                StreetAddress = "Heimstadveien 45",
                PostalCode = boatLineContext.PostalCodes.FirstOrDefault(c => c.Code == "1353"),
                Phone = "78534376",
                Email = "lisa@heimstad.no",
                Payment = new Payment
                {
                    CardHolderName = "Lisa Heimstad",
                    CardNumber = "1234 1234 6454 1234",
                    CSC = "321",
                    ExpirationMonth = "06",
                    ExpirationYear = "24"
                },
                Tickets = new List<Ticket> { ticket2 }
            };


            var customer3 = new Customer
            {
                FirstName = "Markus",
                LastName = "Liebraad",
                StreetAddress = "Lierbakken 2",
                PostalCode = boatLineContext.PostalCodes.FirstOrDefault(c => c.Code == "2656"),
                Phone = "93828393",
                Email = "markus@liebraad.no",
                Payment = new Payment
                {
                    CardHolderName = "Markus Liebraad",
                    CardNumber = "1234 5436 1234 1234",
                    CSC = "543",
                    ExpirationMonth = "05",
                    ExpirationYear = "22"
                },
                Tickets = new List<Ticket> { ticket3 }
            };

            boatLineContext.Add(customer1);
            boatLineContext.Add(customer2);
            boatLineContext.Add(customer3);

            boatLineContext.SaveChanges();
        }
    }
}