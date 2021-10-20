using System.Threading.Tasks;
using BoatLine.Models;
using BoatLine.Models.Auth;

namespace BoatLine.DAL
{
    public interface IAuthRepository
    {
        Task<bool> LogIn(Admin admin);
    }
}