using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebappGroup9.Models;

namespace WebappGroup9.Controllers
{
    [Route("[controller]/[action]")]
    public class BoatLineController : ControllerBase
    {
        private readonly ICustomerRepository _db;

        public BoatLineController(ICustomerRepository db)
        {
            _db = db;
        }
        
        public async Task<bool> Save(Customer frontCustomer, Ticket frontTicket)
        {
            return await _db.Save(frontCustomer, frontTicket);
        }

        public async Task<List<Customer>> GetCustomers()
        {
            return await _db.GetCustomers();
        }
        /*
        public async Task<bool> Delete(int id)
        {
            return await _db.Delete(id);
        }

        public async Task<Customer> GetOne(int id)
        {
            return await _db.GetOne(id);
        }

        public async Task<bool> Update(Customer customer)
        {
            return await _db.Update(customer);
        }
        */
    }

}