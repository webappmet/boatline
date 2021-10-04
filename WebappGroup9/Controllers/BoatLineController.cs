using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebappGroup9.DAL;
using WebappGroup9.Models;

namespace WebappGroup9.Controllers
{
    [Route("[controller]/[action]")]
    public class BoatLineController : ControllerBase
    {
        private readonly ICustomerRepository _db;

        private readonly ILogger<BoatLineController> _log;

        public BoatLineController(ICustomerRepository db, ILogger<BoatLineController> log)
        {
            _db = db;
            _log = log;
        }

        private string GetModelStateMessage()
        {
            return string.Join(", ", ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage));
        }

        public async Task<ActionResult> SaveOne(Customer customer)
        {
            if (ModelState.IsValid)
            {
                var res = await _db.SaveOne(customer);

                if (res) return Ok("Ticket saved");
                _log.LogInformation("Customer ticket was not saved");
                return BadRequest("Customer ticket was not saved");
            }

            var message = GetModelStateMessage();
            
            _log.LogInformation("Customer was not saved: " + message);
            return BadRequest("Customer was not saved: " + message);
        }
        
        public async Task<ActionResult> SaveMany(List<Customer> customers)
        {
            if (ModelState.IsValid)
            {
                var res = await _db.SaveMany(customers);

                if (res) return Ok("Ticket saved");
                _log.LogInformation("Customer ticket was not saved");
                return BadRequest("Customer ticket was not saved");
            }

            var message = GetModelStateMessage();

            _log.LogInformation("Input validation failed: " + message);
            return BadRequest("Input validation failed: " + message);
        }

        public async Task<ActionResult> GetCustomers()
        {
            var list = await _db.GetCustomers();

            if (list != null) return Ok(list);
            _log.LogInformation("Could not get all customers");
            return NotFound("Could not get all customers");
        }
        
        public async Task<ActionResult> GetOne(int id)
        {
            var customer = await _db.GetOne(id);

            if (customer != null) return Ok(customer);
            _log.LogInformation("Customer was not found");
            return NotFound("Customer was not found");
        }
        
        public async Task<ActionResult> GetCabins()
        {
            var list = await _db.GetCabins();

            if (list != null) return Ok(list);
            _log.LogInformation("Could not get all cabins");
            return NotFound("Could not get all cabins");
        }

        public async Task<ActionResult> GetCabinUnoccupied()
        {
            var list = await _db.GetCabinUnoccupied();
            if (list != null) return Ok(list);
            _log.LogInformation("Not able to get unoccupied cabins");
            return NotFound("Not able to get unoccupied cabins");
        }
        
        public async Task<ActionResult> GetRoutes()
        {
            var list = await _db.GetRoutes();

            if (list != null) return Ok(list);
            _log.LogInformation("Could not get all routes");
            return NotFound("Could not get all routes");
        }
        
        public async Task<ActionResult> GetTickets()
        {
            var list = await _db.GetTickets();

            if (list != null) return Ok(list);
            _log.LogInformation("Could not get all tickets");
            return NotFound("Could not get all tickets");
        }

        public async Task<ActionResult> GetPrice(Route route, List<Cabin> cabins)
        {
            var price = _db.GeneratePrice(route, cabins);
            if (double.IsNaN(price)) return Ok(price);
            _log.LogInformation("Could not generate price");
            return NotFound("Could not generate price");
        }

        public async Task<ActionResult> Delete(int id)
        {
            var ret = await _db.Delete(id);

            if (ret) return Ok("Customer deleted");
            _log.LogInformation("Customer was not deleted");
            return NotFound("Customer was not deleted");
        }

        public async Task<ActionResult> Update(Customer customer)
        {
            if (ModelState.IsValid)
            {
                var ret = await _db.Update(customer);

                if (ret) return Ok("Customer updated");
                _log.LogInformation("Customer was not found");
                return NotFound("Customer was not found");
            }

            var message = GetModelStateMessage();

            _log.LogInformation("Input validation failed: " + message);
            return BadRequest("Input validation failed " + message);
        }
    }
}