using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebappGroup9.Models
{
    public interface ICustomerRepository
    {
        Task<bool> Save(Customer frontCustomer, Ticket frontTicket);
        Task<List<Customer>> GetCustomers();
    }
}