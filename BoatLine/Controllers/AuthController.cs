using System.Threading.Tasks;
using BoatLine.DAL;
using BoatLine.Models.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BoatLine.Controllers
{
    [Route("api/v1/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _db;

        private readonly ILogger<AuthController> _log;

        private const string LoggedIn = "logedIn";

        public AuthController(IAuthRepository db, ILogger<AuthController> log)
        {
            _db = db;
            _log = log;
        }
        
        public async Task<ActionResult> LogIn(Admin admin) 
        {
            if (ModelState.IsValid)
            {
                var ret = await _db.LogIn(admin);
                if (ret)
                {
                    HttpContext.Session.SetString(LoggedIn, "LoggedIn");
                    return Ok(true);
                }
                _log.LogInformation("Log in failed for admin: " + admin.Username);
                HttpContext.Session.SetString(LoggedIn, "");
                return Ok(false);
            }
            _log.LogInformation("Input validation failed");
            return BadRequest("Input validation failed on server");
        }

        public void LogOut()
        {
            HttpContext.Session.SetString(LoggedIn, "");
            _log.LogInformation("Logged out");
        }
        
    }
}