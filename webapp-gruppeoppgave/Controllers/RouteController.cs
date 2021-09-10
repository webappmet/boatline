using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using webapp_gruppeoppgave.Models;


namespace webapp_gruppeoppgave.Controllers
{
    [Route("[controller]/[action]")]
    public class RouteController : ControllerBase
    {
        private readonly RouteDb _routeDb;

        public RouteController(RouteDb routeDb)
        {
            _routeDb = routeDb;
        }

        /* Method that tries to take inn a customer and their proposed ticket, so that it can be saved to the DB
         * Makes a new customer if there is none, and then appends the ticket to their customer list, then saves to DB*/
        public bool Save(Customer frontCustomer, Ticket frontTicket)
        {
            try
            {
                // Testing if the customer is already in the DB
                Customer dbCustomer = _routeDb.Customers.FirstOrDefault(c =>
                    c.firstName == frontCustomer.firstName && c.lastName == frontCustomer.lastName);

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
                    _routeDb.Customers.Add(frontCustomer);
                }
                
                _routeDb.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                // throw; // rider default i dunno
                return false;
            }
            return false;
        }

        /* Method that tries to to get all the customers to the frontend, so that the customers and their lists of
         * tickets can be formatted into a table of customers and tickets. Probably will be user based later, for
         * as of now they will be sorted per customers which is kind of strage*/
        public List<Customer> GetCustomers()
        {
            try
            {
                 return _routeDb.Customers.ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                // throw;
                return null;
            }
        }
    }

}