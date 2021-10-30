using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BoatLine.DAL.Repositories;
using BoatLine.Models;

namespace BoatLine.Controllers
{
    [ExcludeFromCodeCoverage]
    [Route("api/v1/[controller]/[action]")]
    public class BoatLineController : ControllerBase
    {
        private readonly ICustomerRepository _db;

        private readonly ILogger<BoatLineController> _log;

        public BoatLineController(ICustomerRepository db, ILogger<BoatLineController> log)
        {
            _db = db;
            _log = log;
        }

        public async Task<ActionResult> SaveCustomer(Customer customer)
        {
            if (ModelState.IsValid)
            {
                var res = await _db.SaveCustomer(customer);

                if (res) return Ok("Ticket saved");
                _log.LogInformation("Customer ticket was not saved");
                return BadRequest("Customer ticket was not saved");
            }

            var message = GetModelStateMessage();

            _log.LogInformation("Customer was not saved: " + message);
            return BadRequest("Customer was not saved: " + message);
        }
        
        public async Task<ActionResult> SaveCustomers(List<Customer> customers)
        {
            if (ModelState.IsValid)
            {
                var res = await _db.SaveCustomers(customers);

                if (res) return Ok("Ticket saved");
                _log.LogInformation("Customer ticket was not saved");
                return BadRequest("Customer ticket was not saved");
            }

            var message = GetModelStateMessage();

            _log.LogInformation("Input validation failed: " + message);
            return BadRequest("Input validation failed: " + message);
        }
        
        public async Task<ActionResult> GetCustomer(string reference)
        {
            var customer = await _db.GetCustomer(reference);

            if (customer != null) return Ok(customer);
            _log.LogInformation("Customer was not found");
            return NotFound("Customer was not found");
        }
        
        public async Task<ActionResult> GetCustomers()
        {
            var list = await _db.GetCustomers();

            if (list != null) return Ok(list);
            _log.LogInformation("Could not get all customers");
            return NotFound("Could not get all customers");
        }
        
        public async Task<ActionResult> UpdateCustomer(Customer customer)
        {
            if (ModelState.IsValid)
            {
                var ret = await _db.UpdateCustomer(customer);

                if (ret) return Ok("Customer updated");
                _log.LogInformation("Customer was not found");
                return NotFound("Customer was not found");
            }

            var message = GetModelStateMessage();

            _log.LogInformation("Input validation failed: " + message);
            return BadRequest("Input validation failed " + message);
        }
        
        public async Task<ActionResult> DeleteCustomer(string reference)
        {
            var ret = await _db.DeleteCustomer(reference);

            if (ret) return Ok("Customer deleted");
            _log.LogInformation("Customer was not deleted");
            return NotFound("Customer was not deleted");
        }
        
        public async Task<ActionResult> GetCabin(int id)
        {
            var cabin = await _db.GetCabin(id);

            if (cabin != null) return Ok(cabin);
            _log.LogInformation("Could not get cabin");
            return BadRequest("Could not get cabin");
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
        
        public async Task<ActionResult> GetRute(int id)
        {
            var rute = await _db.GetRoute(id);
            if (rute != null) return Ok(rute);
            _log.LogInformation("Not able to get rute");
            return NotFound("Not able to get rute");
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
        
        public async Task<ActionResult> GetPostalCode(string code)
        {
            var postalcode = await _db.GetPostalCode(code);
            if (postalcode != null) return Ok(postalcode);
            _log.LogInformation("Could not get post name");
            return NotFound("Could not get post name");
        }
        
        public ActionResult GetReference(string firstname, string lastname)
        {
            var reference = _db.GenerateReference(firstname, lastname);
            if (reference != null) return Ok(reference);
            _log.LogInformation("Could not generate reference code");
            return NotFound("Could not generate reference code");
        }

        public async Task<ActionResult> GetCustomersByReferences(string reference)
        {
            string[] references = reference.Split("-");
            
            var customers = await _db.GetCustomersByReferences(references);
            if (customers != null) return Ok(customers);
            _log.LogInformation("Did not find tickets by reference");
            return NotFound("Did not find tickets by reference");
        }

        public ActionResult GetPrice(List<Cabin> cabins)
        {
            var price = _db.GeneratePrice(cabins);
            if (double.IsNaN(price)) return Ok(price);
            _log.LogInformation("Could not generate price");
            return NotFound("Could not generate price");
        }

        public ActionResult ValidatePayment(Payment payment)
        {
            if (ModelState.IsValid)
            {
                var res = _db.PaymentCheck(payment);
                if (res) return Ok("Payment validation succeeded");
                _log.LogInformation("Payment validation failed");
                return BadRequest("Payment validation failed");
            }

            var message = GetModelStateMessage();

            _log.LogInformation("Input validation failed: " + message);
            return BadRequest("Input validation failed: " + message);
        }
        
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