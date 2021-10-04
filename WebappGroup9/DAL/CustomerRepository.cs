using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
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

        private bool PaymentCheck(Payment payment)
        {
            // Just a psuedo method to act as actual payment verifcation, which we are not doing because we are not letting people pay for a fictional ticket
            return payment != null;
        }

        /* Method that tries to take inn a customer and their proposed ticket, so that it can be saved to the DB
         * Makes a new customer if there is none, and then appends the ticket to their customer list, then saves to DB*/
        // TODO - make sure that it is properly async
        public async Task<bool> SaveOne(Customer customer)
        {
            try
            {
                // Psuedo payment validation
                if (!PaymentCheck(customer.Payment))
                {
                    return false;
                }
                
                // Testing if the customer is already in the DB on id first, and then name if ID fails
                // (assuming things behind OR is never run when first passes, like in java)
                var dbCustomer = await _boatLineDb.Customers.FirstOrDefaultAsync(c =>
                    c.Id == customer.Id || (c.FirstName == customer.FirstName && c.LastName == customer.LastName));
                
                // Setting front customer ticket's sub values to be tied to the DB
                for (int i = 0; i < customer.Tickets.Count; i++)
                {
                    // setting route right
                    customer.Tickets[i].Route =
                        await _boatLineDb.Routes.FirstOrDefaultAsync(r => r.Id == customer.Tickets[i].Route.Id);

                    // Setting cabin right
                    var newCabinHash = new Collection<Cabin>();

                    foreach (var cabin in customer.Tickets[i].Cabins)
                    {
                        newCabinHash.Add(await _boatLineDb.Cabins.FirstOrDefaultAsync(c => c.Id == cabin.Id));
                    }

                    customer.Tickets[i].Cabins = newCabinHash;
                }
                
                

                // If customer does exist in the DB
                if (dbCustomer is not null)
                {
                    // Adds all of the frontend customers tickets onto the dbCustomers list
                    for (int i = 0; i < customer.Tickets.Count; i++)
                    {
                        dbCustomer.Tickets.Add(customer.Tickets[i]);
                    }
                }
                else // If The customer does not exist in the DB, adding the customer with the tickets automatically.
                {
                    // fixing that the postal code info is sett right
                    customer.PostalCode =
                        await _boatLineDb.PostalCodes.FirstOrDefaultAsync(p =>
                            p.Code.Equals(customer.PostalCode.Code));

                    _boatLineDb.Customers.Add(customer);
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

        // TODO make sure that this is properly async as well
        public async Task<bool> SaveMany(List<Customer> customers)
        {
            var holder = false;
            foreach (var c in customers)
            {
                holder = await SaveOne(c);
            }

            return holder;
        }

        /* old version of testing for customer
         * if (customer.Id != -1)
                {
                    var dbCustomer = _boatLineDb.Customers.FirstOrDefault(c => c.Id == customer.Id);
                }
                else                 // if the customer does not have id, adding 
                {
                    // Testing if the customer is already in the DB on id first, and then name if ID fails (assuming things behind OR is never run when first passes, like in java
                    var dbCustomer = _boatLineDb.Customers.FirstOrDefault(c =>
                        c.Id == customer.Id || (c.FirstName == customer.FirstName && c.LastName == customer.LastName));
                }
         */

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

        public async Task<List<Cabin>> GetCabins()
        {
            try
            {
                return await _boatLineDb.Cabins.ToListAsync();
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return null;
            }
        }
        
        public async Task<List<Cabin>> GetCabinUnoccupied()
        {
            try
            {
                return await _boatLineDb.Cabins.Where(c => c.Tickets.Count == 0).ToListAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<List<Route>> GetRoutes()
        {
            try
            {
                return await _boatLineDb.Routes.ToListAsync();
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return null;
            }
        }

        public async Task<List<Ticket>> GetTickets()
        {
            try
            {
                return await _boatLineDb.Tickets.ToListAsync();
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return null;
            }
        }

        public double GeneratePrice(Route route, List<Cabin> cabins)
        {
            double sum = 0;
            foreach (var cabin in cabins)
            {
                sum += cabin.Price;
            }

            sum *= route.DurationDays;

            return sum;

        }

        public async Task<Customer> GetOne(int id)
        {
            try
            {
                return await _boatLineDb.Customers.FindAsync(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> Update(Customer customer)
        {
            throw new NotImplementedException();
        }
    }
}