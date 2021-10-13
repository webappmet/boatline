using System.Collections.Generic;
using System.Linq;
using WebappGroup9.Models;

namespace WebappGroup9.DAL
{
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
            string[] postInfo = System.IO.File.ReadAllLines("Postnummerregister-ansi.txt");
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

        public void SeedRoutes()
        {
            var route1 = new Route
            {
                Id = 1,
                Departure = "Oslo",
                Destination = "Kiel",
                DurationDays = 3,
                DurationHours = 17
            };

            var route2 = new Route
            {
                Id = 2, 
                Departure = "Oslo", 
                Destination = "Copenhagen", 
                DurationDays = 3, 
                DurationHours = 11
            };

            var route3 = new Route
            {
                Id = 3, 
                Departure = "Larvik", 
                Destination = "Hirtshals", 
                DurationDays = 4, 
                DurationHours = 11
            };

            var route4 = new Route
            {
                Id = 4, 
                Departure = "Kristiansand", 
                Destination = "Hirtshals", 
                DurationDays = 2, 
                DurationHours = 15
            };

            var route5 = new Route
            {
                Id = 5, 
                Departure = "Strømstad", 
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
    }
}