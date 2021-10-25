using System;
using System.Threading.Tasks;
using BoatLine.Controllers;
using BoatLine.DAL.Repositories;
using BoatLine.Models;
using Moq;
using Xunit;

namespace BoatLineTest
{
    public class UnitTest1
    {
        [Fact]
        public async Task CreateRoute()
        {
            var route = new Route
            {
                Id = 1,
                Departure = "Oslo",
                Destination = "Kiel",
                DurationDays = 3,
                DurationHours = 17
            };

            var mock = new Mock<IAuthRepository>();

            mock.Setup(r => r.PostRoute(route)).ReturnsAsync(true);
            var authController = new AuthController(mock.Object);
            var res = await authController.PostRoute(route);
            //Assert.True(res.ExecuteResultAsync());
        }
    }
}
