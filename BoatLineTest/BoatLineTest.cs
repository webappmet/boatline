using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using BoatLine.Controllers;
using BoatLine.DAL.Repositories;
using BoatLine.Models;
using BoatLine.Models.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Xunit;

namespace BoatLineTest
{
    public class UnitTest1
    {
        private const string LoggedIn = "loggedIn";
        private const string NotLoggedInn = "";

        private readonly Mock<IAuthRepository> mockRep = new Mock<IAuthRepository>();
        private readonly Mock<ILogger<AuthController>> mockLog = new Mock<ILogger<AuthController>>();

        private readonly Mock<HttpContext> mockHttpContext = new Mock<HttpContext>();
        private readonly MockHttpSession mockSession = new MockHttpSession();
        
        [Fact]
        public async Task LogInIncorrectPasswordOrUser()
        {
            mockRep.Setup(k => k.LogIn(It.IsAny<Admin>())).ReturnsAsync(false);

            var authController = new AuthController(mockRep.Object, mockLog.Object);

            mockSession[LoggedIn] = NotLoggedInn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            authController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var res = await authController.LogIn(It.IsAny<Admin>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.False((bool)res.Value);
        }

        [Fact]
        public async Task LoggInInputError()
        {
            mockRep.Setup(k => k.LogIn(It.IsAny<Admin>())).ReturnsAsync(true);

            var authController = new AuthController(mockRep.Object, mockLog.Object);

            authController.ModelState.AddModelError("Username", "Input validation failed on server");

            mockSession[LoggedIn] = LoggedIn;
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            authController.ControllerContext.HttpContext = mockHttpContext.Object;

            // Act
            var res = await authController.LogIn(It.IsAny<Admin>()) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, res.StatusCode);
            Assert.Equal("Input validation failed on server", res.Value);
        }
        
        [Fact]
        public void LogOut()
        {
            var authController = new AuthController(mockRep.Object, mockLog.Object);
            
            mockHttpContext.Setup(s => s.Session).Returns(mockSession);
            mockSession[LoggedIn] = LoggedIn;
            authController.ControllerContext.HttpContext = mockHttpContext.Object;
         
            // Act
            authController.LogOut();

            // Assert
            Assert.Equal(NotLoggedInn,mockSession[LoggedIn]);
        }
        
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
