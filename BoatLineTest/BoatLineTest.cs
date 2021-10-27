using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using BoatLine.Controllers;
using BoatLine.DAL.Repositories;
using BoatLine.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace BoatLineTest
{
    public class UnitTest1
    {
        private const string _loggedIn = "loggetInn";
        private const string _notLoggedInn = "";

        private readonly Mock<IAuthRepository> mockRepAuth = new Mock<IAuthRepository>();
        private readonly Mock<ILogger<AuthController>> mockLogAuth = new Mock<ILogger<AuthController>>();
        
        private readonly Mock<ICustomerRepository> mockRepBoatLine = new Mock<ICustomerRepository>();
        private readonly Mock<ILogger<BoatLineController>> mockLogBoatLine = new Mock<ILogger<BoatLineController>>();

        private readonly Mock<HttpContext> mockHttpContext = new Mock<HttpContext>();
        private readonly MockHttpSession mockSession = new MockHttpSession();
        
        /*
        [Fact]
        public async Task GetAllRoutesLoggedInnOk()
        {
            // Arrange
            var route1 = new Route
            {
                Id = 1,
                Departure = "Oslo",
                Destination = "Kiel",
                DurationDays = 3,
                DurationHours = 17
            };

            var route2 = new Route
            {
                Id = 2,
                Departure = "Oslo",
                Destination = "Copenhagen",
                DurationDays = 3,
                DurationHours = 11
            };

            var route3 = new Route
            {
                Id = 3,
                Departure = "Larvik",
                Destination = "Hirtshals",
                DurationDays = 4,
                DurationHours = 11
            };

            var routeList = new List<Route>();
            routeList.Add(route1);
            routeList.Add(route2);
            routeList.Add(route3);

            mockRep.Setup(k => k.()).ReturnsAsync(kundeListe);

            var authController = new AuthController(mockRep.Object, mockLog.Object);

            mockSession[_loggedIn] = _loggedIn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            authController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var res = await authController.HentAlle() as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK,res.StatusCode);
            Assert.Equal<List<Kunde>>((List<Kunde>)resultat.Value, kundeListe);
        }
        */
        
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
