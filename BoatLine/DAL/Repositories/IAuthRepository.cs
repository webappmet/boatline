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
        Task<bool> UpdateCabin(Cabin cabin);
        Task<bool> CreateDeparture(Departure departure, int routeId);
    }
}