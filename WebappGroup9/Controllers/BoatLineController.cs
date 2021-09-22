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

        public async Task<ActionResult> Save(Customer frontCustomer, Ticket frontTicket)
        {
            if (ModelState.IsValid)
            {
                var res = await _db.Save(frontCustomer, frontTicket);

                if (res) return Ok("Ticket saved");
                _log.LogInformation("Customer ticket was not saved");
                return BadRequest("Customer ticket was not saved");
            }
            _log.LogInformation("Input validation failed");
            return BadRequest("Input validation failed");
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
            _log.LogInformation("Input validation failed");
            return BadRequest("Input validation failed");
        }
    }
}