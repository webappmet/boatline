using System.Collections.Generic;
using System.Threading.Tasks;
using WebappGroup9.Models;

namespace WebappGroup9.DAL
{
    public interface ICustomerRepository
    {
        Task<bool> SaveOne(Customer frontCustomer);
        Task<bool> SaveMany(List<Customer> frontCustomers);
        Task<List<Customer>> GetCustomers();
        Task<Customer> GetOne(int id);
        Task<List<Cabin>> GetCabins();
        Task<List<Route>> GetRoutes();
        Task<List<Ticket>> GetTickets();
        Task<bool> Delete(int id);
        Task<bool> Update(Customer customer);
    }
}