using System.Collections.Generic;
using System.Threading.Tasks;
using WebappGroup9.Models;

namespace WebappGroup9.DAL
{
    public interface ICustomerRepository
    {
        Task<bool> SaveCustomer(Customer frontCustomer);
        Task<bool> SaveCustomers(List<Customer> frontCustomers);
        Task<Customer> GetCustomer(int id);
        Task<List<Customer>> GetCustomers();
        Task<bool> UpdateCustomer(Customer customer);
        Task<bool> DeleteCustomer(int id);
        Task<Cabin> GetCabin(int id);
        Task<List<Cabin>> GetCabins();
        Task<List<Cabin>> GetCabinUnoccupied();
        Task<Route> GetRoute(string departure, string destination);
        Task<List<Route>> GetRoutes();
        Task<List<Ticket>> GetTickets();
        Task<PostalCode> GetPostalCode(string code);
        Task<List<Ticket>> GetTicketByReferences(IEnumerable<string> references);
        string GenerateReference();
        double GeneratePrice(Route route, IEnumerable<Cabin> cabins);
        bool PaymentCheck(Payment payment);
    }
}