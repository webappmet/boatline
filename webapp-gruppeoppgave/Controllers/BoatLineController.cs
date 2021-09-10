using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using webapp_gruppeoppgave.Models;


namespace webapp_gruppeoppgave.Controllers
{
    [Route("[controller]/[action]")]
    public class BoatLineController : ControllerBase
    {
        private readonly BoatLineDb _boatLineDb;

        public BoatLineController(BoatLineDb boatLineDb)
        {
            _boatLineDb = boatLineDb;
        }

        /* Method that tries to take inn a customer and their proposed ticket, so that it can be saved to the DB
         * Makes a new customer if there is none, and then appends the ticket to their customer list, then saves to DB*/
        public bool Save(Customer frontCustomer, Ticket frontTicket)
        {
            try
            {
                // Testing if the customer is already in the DB
                Customer dbCustomer = _boatLineDb.Customers.FirstOrDefault(c =>
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
                
                _boatLineDb.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                // throw; // rider default i dunno
                return false;
            }
        }

        /* Method that tries to to get all the customers to the frontend, so that the customers and their lists of
         * tickets can be formatted into a table of customers and tickets. Probably will be user based later, for
         * as of now they will be sorted per customers which is kind of strage*/
        public List<Customer> GetCustomers()
        {
            try
            {
                //TODO figure out why this is this way
                // get will litterarily not work if we do not have this line and i have no idea
                List<Ticket> tickets = _boatLineDb.Tickets.ToList();
                return _boatLineDb.Customers.ToList();
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