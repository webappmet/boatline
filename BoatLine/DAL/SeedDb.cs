using System;
using System.Collections;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using BoatLine.DAL.Utilities;
using BoatLine.Models;
using BoatLine.Models.Auth;
using Microsoft.EntityFrameworkCore;

namespace BoatLine.DAL
{
    [ExcludeFromCodeCoverage]
    public class SeedDb
    {
        private readonly BoatLineDb _db;

        public SeedDb(BoatLineDb db)
        {
            _db = db;
        }

        /**
         * Method for seeding postal codes
         */
        public void SeedPostalCodes()
        {
            // Source: https://www.bring.no/tjenester/adressetjenester/postnummer
            // Extra source: https://social.msdn.microsoft.com/Forums/vstudio/en-US/3d482df5-226f-41a4-a0a6-a67f16b2b4a1/how-to-parse-efficiently-a-tab-separated-text-file?forum=csharpgeneral
            var postInfo = System.IO.File.ReadAllLines("Postnummerregister-ansi.txt");
            foreach (var line in postInfo)
            {
                var temp = new PostalCode()
                {
                    Code = line.Substring(0, 4),
                    Name = line.Split("\t")[1]
                };
                _db.PostalCodes.Add(temp);
            }

            _db.SaveChanges();
        }

        /**
         * Method for seeding cabins into database
         */
        public void SeedCabins()
        {
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
                        case <= 4:
                            cabin.Beds = 2;
                            cabin.Type = "First class";
                            cabin.Price = (double)1200 * (10 + i) / 10;
                            break;
                        case <= 8:
                            cabin.Beds = 2;
                            cabin.Type = "Business";
                            cabin.Price = (double)1000 * (10 + i) / 10;
                            break;
                        case <= 16:
                            cabin.Beds = 5;
                            cabin.Type = "Family economy";
                            cabin.Price = (double)700 * (10 + i) / 10;
                            break;
                        default:
                            cabin.Beds = 3;
                            cabin.Type = "Economy";
                            cabin.Price = (double)500 * (10 + i) / 10;
                            break;
                    }

                    _db.Cabins.Add(cabin);
                }
            }

            _db.SaveChanges();
        }

        /**
         * Method for seeding routes into database
         */
        public void SeedRoutes()
        {
            var route1 = new Route
            {
                Departure = "Oslo",
                Destination = "Kiel",
                DurationDays = 3,
                DurationHours = 17
            };

            var route2 = new Route
            {
                Departure = "Oslo",
                Destination = "Copenhagen",
                DurationDays = 3,
                DurationHours = 11
            };

            var route3 = new Route
            {
                Departure = "Larvik",
                Destination = "Hirtshals",
                DurationDays = 4,
                DurationHours = 11
            };

            var route4 = new Route
            {
                Departure = "Kristiansand",
                Destination = "Hirtshals",
                DurationDays = 2,
                DurationHours = 15
            };

            var route5 = new Route
            {
                Departure = "Str??mstad",
                Destination = "Sandefjord",
                DurationDays = 5,
                DurationHours = 13
            };

            _db.Routes.Add(route1);
            _db.Routes.Add(route2);
            _db.Routes.Add(route3);
            _db.Routes.Add(route4);
            _db.Routes.Add(route5);

            _db.SaveChanges();
        }

        /**
         * Method for seeding admin into database
         */
        public void SeedAuthAdmin()
        {
            var admin = new DbAdmin()
            {
                Username = "Admin"
            };

            const string password = "Admin123";
            var salt = Utility.GenerateSalt();
            var hash = Utility.GenerateHash(password, salt);
            admin.Password = hash;
            admin.Salt = salt;
            _db.Admins.Add(admin);

            _db.SaveChanges();
        }

        public void SeedDepartures()
        {
            var routes = _db.Routes.ToList();
            
            var date = DateTime.Today;
            for (var i = 0; i < 30; i++)
            {
                foreach (var route in routes)
                {
                    _db.Departures.Add(new Departure
                    {
                        Route = route,
                        Date = date.ToString("yyyy-MM-dd"),
                        Time = "10:30"
                    });
                
                    _db.Departures.Add(new Departure
                    {
                        Route = route,
                        Date = date.ToString("yyyy-MM-dd"),
                        Time = "17:45"
                    });
                }

                date = date.AddDays(1);
            }

            _db.SaveChanges();
        }
    }
}