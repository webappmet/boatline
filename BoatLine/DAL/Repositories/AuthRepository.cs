using System;
using System.Linq;
using System.Threading.Tasks;
using BoatLine.DAL.Utilities;
using BoatLine.Models;
using BoatLine.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BoatLine.DAL.Repositories
{
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
                _log.LogInformation("Admin whit username: " + admin.Username + " has logged in");
                return ok;
            }
            catch (Exception e)
            {
                _log.LogInformation("Admin whit username: " + admin.Username + " has not been logged in");
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
                    _log.LogInformation("A new admin whit username: " + admin.Username + " was created");
                    return true;
                }

                _log.LogInformation("Username already exists");
                return false;
            }
            catch (Exception e)
            {
                _log.LogInformation("A new admin whit username: " + admin.Username + " was not created");
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
                _log.LogInformation("Admin with username: " + username + " was deleted");
                return true;
            }
            catch
            {
                _log.LogInformation("Admin with username: " + username + " was not deleted");
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
                _log.LogInformation("A new route has been created");
                return true;
            }
            catch (Exception e)
            {
                _log.LogInformation("Was not able to create a new route");
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
                    _log.LogInformation("Route with id: " + route.Id + " was updated");
                    return true;
                }
                _log.LogInformation("Did not find rout with given id: " + route.Id + ". Route was not updated");
                return false;
            }
            catch
            {
                _log.LogInformation("Route with id: " + route.Id + " was not updated");
                return false;
            }
        }

        public async Task<bool> DeleteRoute(int id)
        {
            try
            {
                var route = await _db.Routes.FindAsync(id);
                _db.Routes.Remove(route);
                await _db.SaveChangesAsync();
                _log.LogInformation("Route with id: " + id + " was deleted");
                return true;
            }
            catch
            {
                _log.LogInformation("Route with id: " + id + " was not deleted");
                return false;
            }
        }

        public async Task<bool> PostCabin(Cabin cabin)
        {
            try
            {
                var dbCabin = await _db.Cabins.FirstOrDefaultAsync(r => r.Id == cabin.Id);

                if (dbCabin != null) return false;
                await _db.Cabins.AddAsync(cabin);
                await _db.SaveChangesAsync();
                _log.LogInformation("Cabin whit id: " + cabin.Id + " was created");
                return true;
            }
            catch (Exception e)
            {
                _log.LogInformation("Cabin whit id: " + cabin.Id + " was not created");
                _log.LogInformation(e.Message);
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
                    _log.LogInformation("Cabin whit id: " + cabin.Id + " was updated");
                    return true;
                }
                _log.LogInformation("Cabin whit id: " + cabin.Id + " was not created");
                return false;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }

        public async Task<bool> DeleteCabin(int id)
        {
            try
            {
                var cabin = await _db.Cabins.FindAsync(id);
                _db.Cabins.Remove(cabin);
                await _db.SaveChangesAsync();
                _log.LogInformation("Cabin with id: " + id + " was deleted");
                return true;
            }
            catch
            {
                _log.LogInformation("Cabin with id: " + id + " was not deleted");
                return false;
            }
        }

        /**
         * Method that updates the city name from postal code
         */
        public async Task<bool> UpdatePostalCode(PostalCode postalCode)
        {
            try
            {
                var dbPostalCode = await _db.PostalCodes.FirstOrDefaultAsync(p => p.Code == postalCode.Code);

                if (dbPostalCode != null)
                {
                    dbPostalCode.Name = postalCode.Name;
                    await _db.SaveChangesAsync();
                    _log.LogInformation("");
                }
            }
            catch
            {
                return false;
            }

            return true;
        }

        /**
         * Method that deletes postalcode with given code
         */
        public async Task<bool> DeletePostalCode(string code)
        {
            try
            {
                var postalCode = await _db.PostalCodes.FindAsync(code);
                _db.PostalCodes.Remove(postalCode);
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