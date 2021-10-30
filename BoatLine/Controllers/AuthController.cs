using System.Linq;
using System.Threading.Tasks;
using BoatLine.DAL.Repositories;
using BoatLine.Models;
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

        private const string LoggedIn = "loggedIn";
        private const string NotLoggedIn = "";

        public AuthController(IAuthRepository db, ILogger<AuthController> log)
        {
            _db = db;
            _log = log;
        }
        
        /**
         * Constructor for unit testing
         */
        public AuthController(IAuthRepository db)
        {
            _db = db;
        }
        
        public async Task<ActionResult> LogIn(Admin admin)
        {
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
        public async Task<ActionResult> CreateAdmin(Admin admin)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }
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

            _log.LogInformation("Input validation for admin failed");
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
            _log.LogInformation("Admin was not deleted");
            return NotFound("Admin was not deleted");
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

            var message = GetModelStateMessage();

            _log.LogInformation("Route was not saved: " + message);
            return BadRequest("Route was not saved: " + message);
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

            _log.LogInformation("Input validation for route failed");
            return BadRequest("Input validation for route failed");
        }

        public async Task<ActionResult> DeleteRoute(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }
            var ret = await _db.DeleteRoute(id);

            if (ret) return Ok("Route deleted");
            _log.LogInformation("Route was not deleted");
            return NotFound("Route was not deleted");
        }

        public async Task<ActionResult> PostCabin(Cabin cabin)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }
            if (ModelState.IsValid)
            {
                var res = await _db.PostCabin(cabin);

                if (res) return Ok("Cabin saved");
                _log.LogInformation("Cabin was not saved");
                return BadRequest("Cabin was not saved");
            }

            var message = GetModelStateMessage();

            _log.LogInformation("Cabin was not saved: " + message);
            return BadRequest("Cabin was not saved: " + message);
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
                return Ok("Route updated");
            }

            _log.LogInformation("Cabin was not found");
            return NotFound("Cabin was not found");
        }

        public async Task<ActionResult> DeleteCabin(int id)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }
            var ret = await _db.DeleteCabin(id);

            if (ret) return Ok("Cabin deleted");
            _log.LogInformation("Cabin was not deleted");
            return NotFound("Cabin was not deleted");
        }

        public async Task<ActionResult> DeletePostalCode(string code)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }
            var ret = await _db.DeletePostalCode(code);

            if (ret) return Ok("Postal code deleted");
            _log.LogInformation("Postal code was not deleted");
            return NotFound("Postal code was not deleted");
        }

        public async Task<ActionResult> UpdatePostalCode(PostalCode postalCode)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }

            if (ModelState.IsValid)
            {
                var ret = await _db.UpdatePostalCode(postalCode);
                if (ret)
                {
                    _log.LogInformation("Postal code updated");
                    return Ok("Postal code updated");
                }

                _log.LogInformation("Postal code was not found");
                return NotFound("Postal code was not found");
            }

            _log.LogInformation("Input validation for postal code failed");
            return BadRequest("Input validation for postal code failed");
        }
        
        /*
        public async Task<ActionResult> UpdateTicket(Ticket ticket)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }

            if (ModelState.IsValid)
            {
                var ret = await _db.UpdateTicket(ticket);
                if (ret)
                {
                    _log.LogInformation("Ticket updated");
                    return Ok("Ticket updated");
                }

                _log.LogInformation("Ticket was not found");
                return NotFound("Ticket was not found");
            }

            _log.LogInformation("Input validation for ticket failed");
            return BadRequest("Input validation for ticket failed");
        }
        */

        /*
        public async Task<ActionResult> UpdateCustomer(Customer customer)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(LoggedIn)))
            {
                return Unauthorized("Not logged in");
            }

            if (ModelState.IsValid)
            {
                var ret = await _db.UpdateCustomer(customer);
                if (ret)
                {
                    _log.LogInformation("Customer updated");
                    return Ok("Customer updated");
                }

                _log.LogInformation("Customer was not found");
                return NotFound("Customer was not found");
            }

            _log.LogInformation("Input validation for customer failed");
            return BadRequest("Input validation for customer failed");
        }
        */

        /**
         * Formatting multiple model state messages for better logging
         */
        private string GetModelStateMessage()
        {
            return string.Join(", ", ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage));
        }
    }
}