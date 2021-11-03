using System;
using System.Threading.Tasks;
using BoatLine.DAL.Repositories;
using BoatLine.DAL.Utilities;
using BoatLine.Models;
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

        private const string LoggedIn = "loggedIn";
        private const string NotLoggedIn = "";

        public AuthController(IAuthRepository db, ILogger<AuthController> log)
        {
            _db = db;
            _log = log;
        }

        public async Task<ActionResult> LogIn(string credentials)
        {
            var admin = Utility.DecodeAdmin(credentials);
            
            if (ModelState.IsValid)
            {
                var ret = await _db.LogIn(admin);
                if (ret)
                {
                    HttpContext.Session.SetString(LoggedIn, LoggedIn);
                    return Ok(true);
                }

                _log.LogInformation("Log in failed for admin");
                HttpContext.Session.SetString(LoggedIn, NotLoggedIn);
                return Ok(false);
            }

            _log.LogInformation("Input validation failed on server");
            return BadRequest("Input validation failed on server");
        }

        public void LogOut()
        {
            HttpContext.Session.SetString(LoggedIn, "");
            _log.LogInformation("Logged out");
        }

        /**
         * Already authorized user creates new admin user
         */
        public async Task<ActionResult> CreateAdmin(string credentials)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }

            var admin = Utility.DecodeAdmin(credentials);

            if (ModelState.IsValid)
            {
                var ret = await _db.CreateAdmin(admin);
                
                if (ret)
                {
                    _log.LogInformation("New admin user created");
                    return Ok(true);
                }

                _log.LogInformation("Failed to create admin");
                return Ok(false);
            }

            _log.LogInformation("Input validation for admin failed on server");
            return BadRequest("Input validation for admin failed on server");
        }
        
        /**
         * Already authorized user deletes admin user
         */
        public async Task<ActionResult> DeleteAdmin(string username)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }
            var ret = await _db.DeleteAdmin(username);

            if (ret) return Ok("Admin deleted");
            _log.LogInformation("Admin was not found and not deleted");
            return NotFound("Admin was not found and not deleted");
        }

        public async Task<ActionResult> PostRoute(Route route)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }
            if (ModelState.IsValid)
            {
                var res = await _db.PostRoute(route);

                if (res) return Ok("Route saved");
                _log.LogInformation("Route was not saved");
                return BadRequest("Route was not saved");
            }

            _log.LogInformation("Input validation for route failed on server");
            return BadRequest("Input validation for route failed on server");
        }

        public async Task<ActionResult> UpdateRoute(Route route)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }

            if (ModelState.IsValid)
            {
                var ret = await _db.UpdateRoute(route);
                if (ret)
                {
                    _log.LogInformation("Route updated");
                    return Ok("Route updated");
                }

                _log.LogInformation("Route was not found");
                return NotFound("Route was not found");
            }

            _log.LogInformation("Input validation for route failed on server");
            return BadRequest("Input validation for route failed on server");
        }

        public async Task<ActionResult> DeleteRoute(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }
            var ret = await _db.DeleteRoute(id);

            if (ret) return Ok("Route deleted");
            _log.LogInformation("Route was not found");
            return NotFound("Route was not found");
        }
        
        public async Task<ActionResult> UpdateCabin(Cabin cabin)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }
            
            var ret = await _db.UpdateCabin(cabin);
            if (ret)
            {
                _log.LogInformation("Cabin updated");
                return Ok("Cabin updated");
            }

            _log.LogInformation("Cabin was not found");
            return NotFound("Cabin was not found");
        }
        
        public async Task<ActionResult> PostDeparture([FromBody] HttpDeparture departure, int routeId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }

            if (ModelState.IsValid)
            {
                var res = await _db.CreateDeparture(departure, routeId);

                if (res) return Ok("Departure saved");
                _log.LogInformation("Departure was not saved");
                return BadRequest("Departure was not saved");
            }

            _log.LogInformation("Input validation for departure failed on server");
            return BadRequest("Input validation for departure failed on server");
        }

        public async Task<ActionResult> UpdateDeparture([FromBody] HttpDeparture departure, int departureId, int routeId)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }

            if (ModelState.IsValid)
            {
                var ret = await _db.UpdateDeparture(departure, departureId, routeId);
                if (ret)
                {
                    _log.LogInformation("Departure updated");
                    return Ok("Departure updated");
                }

                _log.LogInformation("Departure was not found");
                return NotFound("Departure was not found");
            }
            _log.LogInformation("Input validation for departure failed on server");
            return BadRequest("Input validation for departure failed on server");
        }

        public async Task<ActionResult> DeleteDeparture(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }
            var ret = await _db.DeleteDeparture(id);

            if (ret) return Ok("Departure deleted");
            _log.LogInformation("Departure was not found");
            return NotFound("Departure was not found");
        }
    }
}