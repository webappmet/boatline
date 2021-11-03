using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using BoatLine.DAL.Utilities;
using BoatLine.Models;
using BoatLine.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BoatLine.DAL.Repositories
{
    [ExcludeFromCodeCoverage]
    public class AuthRepository : IAuthRepository
    {
        private readonly BoatLineDb _db;
        private readonly ILogger<AuthRepository> _log;

        public AuthRepository(BoatLineDb db, ILogger<AuthRepository> log)
        {
            _db = db;
            _log = log;
        }

        public async Task<bool> LogIn(Admin admin)
        {
            try
            {
                var dbAdmin = await _db.Admins.FirstOrDefaultAsync(a => a.Username == admin.Username);
                // Test if password matches
                var hash = Utility.GenerateHash(admin.Password, dbAdmin.Salt);
                var ok = hash.SequenceEqual(dbAdmin.Password);
                return ok;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }

        public async Task<bool> CreateAdmin(Admin admin)
        {
            try
            {
                var dbAdmin = await _db.Admins.FirstOrDefaultAsync(a => a.Username == admin.Username);

                if (dbAdmin == null)
                {
                    var newAdmin = new DbAdmin()
                    {
                        Username = admin.Username
                    };

                    var salt = Utility.GenerateSalt();
                    var hash = Utility.GenerateHash(admin.Password, salt);
                    newAdmin.Password = hash;
                    newAdmin.Salt = salt;
                    _db.Admins.Add(newAdmin);

                    await _db.SaveChangesAsync();
                    return true;
                }

                _log.LogInformation("Username already exists");
                return false;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }

        public async Task<bool> DeleteAdmin(string username)
        {
            try
            {
                var admin = await _db.Admins.FindAsync(username);
                _db.Admins.Remove(admin);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> PostRoute(Route route)
        {
            try
            {
                var dbRoute =
                    await _db.Routes.FirstOrDefaultAsync(r =>
                        r.Departure == route.Departure && r.Destination == route.Destination);

                if (dbRoute != null) return false;
                await _db.Routes.AddAsync(route);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }

        public async Task<bool> UpdateRoute(Route route)
        {
            try
            {
                var dbRoute = await _db.Routes.FirstOrDefaultAsync(r => r.Id == route.Id);

                if (dbRoute != null)
                {
                    dbRoute.Departure = route.Departure;
                    dbRoute.Destination = route.Destination;
                    dbRoute.DurationDays = route.DurationDays;
                    dbRoute.DurationHours = route.DurationHours;

                    await _db.SaveChangesAsync();
                }
            }
            catch
            {
                return false;
            }

            return true;
        }

        public async Task<bool> DeleteRoute(int id)
        {
            try
            {
                var route = await _db.Routes.FindAsync(id);
                _db.Routes.Remove(route);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> UpdateCabin(Cabin cabin)
        {
            try
            {
                var dbCabin = await _db.Cabins.FirstOrDefaultAsync(c => c.Id == cabin.Id);

                if (dbCabin != null)
                {
                    dbCabin.Beds = cabin.Beds;
                    dbCabin.Price = cabin.Price;
                    dbCabin.Type = cabin.Type;

                    await _db.SaveChangesAsync();
                }
            }
            catch
            {
                return false;
            }

            return true;
        }

        public async Task<bool> CreateDeparture(HttpDeparture departure, int routeId)
        {
            try
            {
                var route = _db.Routes.FirstOrDefaultAsync(r => r.Id == routeId).Result;
                if (route != null)
                {
                    var newDeparture = new Departure
                    {
                        Date = departure.Date,
                        Time = departure.Time,
                        Route = route
                    };
                    await _db.Departures.AddAsync(newDeparture);
                    await _db.SaveChangesAsync();
                    return true;
                }
                _log.LogInformation($"Route with id {routeId} could not be found");
                return false;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }

        public async Task<bool> UpdateDeparture(HttpDeparture departure, int departureId, int routeId)
        {
            try
            {
                var dbDeparture = _db.Departures.FirstOrDefaultAsync(d => d.Id == departureId).Result;
                if (dbDeparture != null)
                {
                    var route = _db.Routes.FirstOrDefaultAsync(r => r.Id == routeId).Result;
                    if (route != null)
                    {
                        dbDeparture.Route = route;
                    }
                    dbDeparture.Date = departure.Date;
                    dbDeparture.Time = departure.Time;
                    await _db.SaveChangesAsync();
                    return true;
                }
                _log.LogInformation($"Route with id {routeId} could not be found");
                return false;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }

        public async Task<bool> DeleteDeparture(int id)
        {
            try
            {
                var departure = await _db.Departures.FindAsync(id);
                _db.Departures.Remove(departure);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}