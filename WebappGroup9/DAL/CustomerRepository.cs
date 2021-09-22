using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebappGroup9.Models;

namespace WebappGroup9.DAL
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly BoatLineDb _boatLineDb;

        private readonly ILogger<CustomerRepository> _log;

        public CustomerRepository(BoatLineDb boatLineDb, ILogger<CustomerRepository> log)
        {
            _boatLineDb = boatLineDb;
            _log = log;
        }

        /* Method that tries to take inn a customer and their proposed ticket, so that it can be saved to the DB
         * Makes a new customer if there is none, and then appends the ticket to their customer list, then saves to DB*/
        public async Task<bool> Save(Customer frontCustomer, Ticket frontTicket)
        {
            try
            {
                // Testing if the customer is already in the DB
                var dbCustomer = _boatLineDb.Customers.FirstOrDefault(c =>
                    c.FirstName == frontCustomer.FirstName && c.LastName == frontCustomer.LastName);

                // If customer does exist in the DB
                if (dbCustomer is not null)
                {
                    dbCustomer.Tickets.Add(frontTicket);
                }
                // If The customer does not exist in the DB, adding the ticket to the customer, then adding to DB
                else
                {
                    // I think that the constructor runs and gives it an empty list, and that is how we can add to
                    // frontCustomer immediately but not sure
                    frontCustomer.Tickets.Add(frontTicket);
                    _boatLineDb.Customers.Add(frontCustomer);
                }

                await _boatLineDb.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }

        /* Method that tries to to get all the customers to the frontend, so that the customers and their lists of
         * tickets can be formatted into a table of customers and tickets. Probably will be user based later, for
         * as of now they will be sorted per customers which is kind of strage*/
        public async Task<List<Customer>> GetCustomers()
        {
            try
            {
                return await _boatLineDb.Customers.ToListAsync();
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return null;
            }
        }

        public Task<Customer> GetOne(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Customer customer)
        {
            throw new NotImplementedException();
        }
    }
}