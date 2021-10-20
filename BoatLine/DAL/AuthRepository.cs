using System;
using System.Linq;
using System.Threading.Tasks;
using BoatLine.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BoatLine.DAL
{
    public class AuthRepository : IAuthRepository
    {
        private readonly BoatLineDb _db;
        private readonly ILogger<CustomerRepository> _log;

        public AuthRepository(BoatLineDb db, ILogger<CustomerRepository> log)
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
    }
}