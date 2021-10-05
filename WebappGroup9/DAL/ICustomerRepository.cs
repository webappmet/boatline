using System.Collections.Generic;
using System.Threading.Tasks;
using WebappGroup9.Models;

namespace WebappGroup9.DAL
{
    public interface ICustomerRepository
    {
        Task<bool> SaveOne(Customer frontCustomer);
        Task<PostalCode> GetPostname(string code);
        Task<bool> SaveMany(List<Customer> frontCustomers);
        Task<List<Customer>> GetCustomers();
        Task<Customer> GetOne(int id);
        Task<List<Cabin>> GetCabins();
        Task<Cabin> GetCabin(int id);
        Task<List<Cabin>> GetCabinUnoccupied();
        Task<Route> GetRoute(string departure, string destination);
        Task<List<Route>> GetRoutes();
        Task<List<Ticket>> GetTickets();
        double GeneratePrice(Route route, List<Cabin> cabins);
        bool PaymentCheck(Payment payment);
        Task<bool> Delete(int id);
        Task<bool> Update(Customer customer);
    }
}