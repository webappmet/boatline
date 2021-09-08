using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using webapp_gruppeoppgave.Models;


namespace webapp_gruppeoppgave.Controllers
{
    [Route("[controller]/[action]")]
    public class TurController : ControllerBase
    {
        private readonly TurDb _turDb;

        public TurController(TurDb turDb)
        {
            _turDb = turDb;
        }

        public bool save(Customer frontCustomer, Ticket frontTicket)
        {
            try
            {
                Customer dbCustomer = _turDb.Customers.FirstOrDefault(c =>
                    c.firstName == frontCustomer.firstName && c.lastName == frontCustomer.lastName);

                if (dbCustomer is not null)
                {
                    dbCustomer.Tickets.Add(frontTicket);
                }
                else
                {
                    
                }
                
                _turDb.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                // throw; // rider default i dunno
                return false
            }
            return false;
        }

        public bool getRoutes()
        {
            return false;
        }
    }

}