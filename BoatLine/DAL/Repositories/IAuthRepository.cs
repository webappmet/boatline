using System.Threading.Tasks;
using BoatLine.Models;
using BoatLine.Models.Auth;

namespace BoatLine.DAL.Repositories
{
    public interface IAuthRepository
    {
        Task<bool> LogIn(Admin admin);
        Task<bool> CreateAdmin(Admin admin);
        Task<bool> DeleteAdmin(string username);
        Task<bool> PostRoute(Route route);
        Task<bool> UpdateRoute(Route route);
        Task<bool> DeleteRoute(int id);
        Task<bool> PostCabin(Cabin cabin);
        Task<bool> UpdateCabin(Cabin cabin);
        Task<bool> DeleteCabin(int id);
        Task<bool> UpdatePostalCode(PostalCode postalCode);
        Task<bool> DeletePostalCode(string code);
    }
}