using System.Collections.Generic;
using System.Threading.Tasks;
using WebappGroup9.Models;

namespace WebappGroup9.DAL
{
    public interface ICustomerRepository
    {
        Task<bool> Save(Customer frontCustomer, Ticket frontTicket);
        Task<List<Customer>> GetCustomers();
        Task<Customer> GetOne(int id);
        Task<bool> Delete(int id);
        Task<bool> Update(Customer customer);
    }
}