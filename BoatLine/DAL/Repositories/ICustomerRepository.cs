using System.Collections.Generic;
using System.Threading.Tasks;
using BoatLine.Models;

namespace BoatLine.DAL.Repositories
{
    public interface ICustomerRepository
    {
        Task<bool> SaveCustomer(Customer frontCustomer);
        Task<bool> SaveCustomers(List<Customer> frontCustomers);
        Task<Customer> GetCustomer(string reference);
        Task<List<Customer>> GetCustomers();
        Task<bool> UpdateCustomer(Customer customer);
        Task<bool> DeleteCustomer(string reference);
        Task<Cabin> GetCabin(int id);
        Task<List<Cabin>> GetCabins();
        Task<List<Cabin>> GetCabinUnoccupied();
        Task<Route> GetRoute(int id);
        Task<List<Route>> GetRoutes();
        Task<List<Ticket>> GetTickets();
        Task<PostalCode> GetPostalCode(string code);
        Task<List<Customer>> GetCustomersByReferences(IEnumerable<string> references);
        Task<string> GenerateReference(string firstname, string lastname);
        double GeneratePrice(IEnumerable<Cabin> cabins);
        bool PaymentCheck(Payment payment);
    }
}