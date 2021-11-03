using System.Net;
using System.Threading.Tasks;
using BoatLine.Controllers;
using BoatLine.DAL.Repositories;
using BoatLine.DAL.Utilities;
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

        private readonly Mock<IAuthRepository> _mockRep = new();
        private readonly Mock<ILogger<AuthController>> _mockLog = new();

        private readonly Mock<HttpContext> _mockHttpContext = new();
        private readonly MockHttpSession _mockSession = new();
        
        /**
         * --------------------------------- Test logg in -----------------------------
         */
        
        [Fact]
        public async Task LoggInnOk()
        {
            _mockRep.Setup(k => k.LogIn(It.IsAny<Admin>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            const string str = "Admin:Admin123";
            var encode = Utility.Base64Encode(str);
            var credentials = "Basic " + encode;
            // Act
            var res = await authController.LogIn(credentials) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.True((bool)res.Value);
        }

        [Fact]
        public async Task LogInIncorrectPasswordOrUser()
        {
            _mockRep.Setup(k => k.LogIn(It.IsAny<Admin>())).ReturnsAsync(false);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = NotLoggedInn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;
            
            const string str = "Admin:Admin123";
            var encode = Utility.Base64Encode(str);
            var credentials = "Basic " + encode;
            // Act
            var res = await authController.LogIn(credentials) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.False((bool)res.Value);
        }

        [Fact]
        public async Task LoggInInputError()
        {
            _mockRep.Setup(k => k.LogIn(It.IsAny<Admin>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            authController.ModelState.AddModelError("Username", "Input validation failed on server");

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            const string str = "Admin:Admin123";
            var encode = Utility.Base64Encode(str);
            var credentials = "Basic " + encode;
            
            // Act
            var res = await authController.LogIn(credentials) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, res.StatusCode);
            Assert.Equal("Input validation failed on server", res.Value);
        }
        
        [Fact]
        public void LogOut()
        {
            var authController = new AuthController(_mockRep.Object, _mockLog.Object);
            
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            _mockSession[LoggedIn] = LoggedIn;
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;
         
            // Act
            authController.LogOut();

            // Assert
            Assert.Equal(NotLoggedInn,_mockSession[LoggedIn]);
        }
        
        /**
         * --------------------------------- Test create admin -----------------------------
         */

        [Fact]
        public async Task CreateAdminLoggedInOk()
        {
            _mockRep.Setup(k => k.CreateAdmin(It.IsAny<Admin>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;
            
            const string str = "Admin:Admin123";
            var encode = Utility.Base64Encode(str);
            var credentials = "Basic " + encode;

            // Act
            var res = await authController.CreateAdmin(credentials) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.True((bool)res.Value);
        }
        
        [Fact]
        public async Task CreateAdminNotLoggedIn()
        {
            var newAdmin = new Admin { Username = "TestAdmin", Password = "NewAdmin4" };
            
            _mockRep.Setup(k => k.CreateAdmin(newAdmin)).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = NotLoggedInn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;
            
            const string str = "Admin:Admin123";
            var encode = Utility.Base64Encode(str);
            var credentials = "Basic " + encode;

            // Act
            var res = await authController.CreateAdmin(credentials) as UnauthorizedObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.Unauthorized, res.StatusCode);
            Assert.Equal("Not logged in", res.Value);
        }
        
        [Fact]
        public async Task CreateAdminLoggedInInvalidModelState()
        {
            // Arrange
            var newAdmin = new Admin { Username = "", Password = "NewAdmin4" };
            
            _mockRep.Setup(k => k.CreateAdmin(newAdmin)).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            authController.ModelState.AddModelError("Username", "Input validation for admin failed on server");

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;
            
            const string str = "Admin:Admin123";
            var encode = Utility.Base64Encode(str);
            var credentials = "Basic " + encode;

            // Act
            var res = await authController.CreateAdmin(credentials) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, res.StatusCode);
            Assert.Equal("Input validation for admin failed on server", res.Value);
        }
        
        [Fact]
        public async Task CreateAdminLoggInFailedToCreate()
        {
            var newAdmin = new Admin { Username = "TestAdmin", Password = "NewAdmin4" };
            
            _mockRep.Setup(k => k.CreateAdmin(newAdmin)).ReturnsAsync(false);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;
            
            const string str = "Admin:Admin123";
            var encode = Utility.Base64Encode(str);
            var credentials = "Basic " + encode;

            // Act
            var res = await authController.CreateAdmin(credentials) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.False((bool)res.Value);
        }
        
        /**
         * --------------------------------- Test delete admin -----------------------------
         */
        
        [Fact]
        public async Task DeleteAdminLoggedInOk()
        {
            _mockRep.Setup(k => k.DeleteAdmin(It.IsAny<string>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.DeleteAdmin(It.IsAny<string>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.Equal("Admin deleted", res.Value);
        }
        
        [Fact]
        public async Task DeleteAdminNotLoggedIn()
        {
            _mockRep.Setup(k => k.DeleteAdmin(It.IsAny<string>())).ReturnsAsync((true));

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = NotLoggedInn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.DeleteAdmin(It.IsAny<string>()) as UnauthorizedObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.Unauthorized, res.StatusCode);
            Assert.Equal("Not logged in", res.Value);
        }
        
        [Fact]
        public async Task DeleteAdminLoggedInNotFound()
        {
            _mockRep.Setup(k => k.DeleteAdmin(It.IsAny<string>())).ReturnsAsync(false);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.DeleteAdmin(It.IsAny<string>()) as NotFoundObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.NotFound, res.StatusCode);
            Assert.Equal("Admin was not found and not deleted", res.Value);
        }
        
        /**
         * --------------------------------- Test post route -----------------------------
         */
        
        [Fact]
        public async Task PostRouteLoggedInOk()
        {
            // Arrange
            _mockRep.Setup(k => k.PostRoute(It.IsAny<Route>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.PostRoute(It.IsAny<Route>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.Equal("Route saved", res.Value);
        }
        
        [Fact]
        public async Task PostRouteNotLoggedIn()
        {
            // Arrange
            _mockRep.Setup(k => k.PostRoute(It.IsAny<Route>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = NotLoggedInn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.PostRoute(It.IsAny<Route>()) as UnauthorizedObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.Unauthorized, res.StatusCode);
            Assert.Equal("Not logged in", res.Value);
        }
        
        [Fact]
        public async Task PostRouteLoggedInOkInvalidModelState()
        {
            // Arrange
            _mockRep.Setup(k => k.PostRoute(It.IsAny<Route>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            authController.ModelState.AddModelError("Departure","Input validation for route failed on server");

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.PostRoute(It.IsAny<Route>()) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, res.StatusCode);
            Assert.Equal("Input validation for route failed on server", res.Value);
        }
        
        [Fact]
        public async Task PostRouteLoggedInNotOk()
        {
            // Arrange
            _mockRep.Setup(k => k.PostRoute(It.IsAny<Route>())).ReturnsAsync(false);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.PostRoute(It.IsAny<Route>()) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, res.StatusCode);
            Assert.Equal("Route was not saved", res.Value);
        }
        
        /**
         * --------------------------------- Test update route -----------------------------
         */

        [Fact]
        public async Task UpdateRouteLoggedInOk()
        {
            // Arrange
            _mockRep.Setup(k => k.UpdateRoute(It.IsAny<Route>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.UpdateRoute(It.IsAny<Route>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.Equal("Route updated", res.Value);
        }
        
        [Fact]
        public async Task UpdateRouteNotLoggedIn()
        {
            // Arrange
            _mockRep.Setup(k => k.UpdateRoute(It.IsAny<Route>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = NotLoggedInn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.UpdateRoute(It.IsAny<Route>()) as UnauthorizedObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.Unauthorized, res.StatusCode);
            Assert.Equal("Not logged in", res.Value);
        }
        
        [Fact]
        public async Task UpdateRouteLoggedInNotOk()
        {
            // Arrange
            _mockRep.Setup(k => k.UpdateRoute(It.IsAny<Route>())).ReturnsAsync(false);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.UpdateRoute(It.IsAny<Route>()) as NotFoundObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.NotFound, res.StatusCode);
            Assert.Equal("Route was not found", res.Value);
        }
        
        [Fact]
        public async Task UpdateRouteLoggedInInvalidModelState()
        {
            // Arrange
            _mockRep.Setup(k => k.UpdateRoute(It.IsAny<Route>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            authController.ModelState.AddModelError("Departure","Input validation for route failed on server");

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.UpdateRoute(It.IsAny<Route>()) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, res.StatusCode);
            Assert.Equal("Input validation for route failed on server", res.Value);
        }
        
        /**
         * --------------------------------- Test delete route -----------------------------
         */

        [Fact]
        public async Task DeleteRouteLoggedInOk()
        {
            // Arrange
            _mockRep.Setup(k => k.DeleteRoute(It.IsAny<int>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.DeleteRoute(It.IsAny<int>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.Equal("Route deleted", res.Value);
        }
        
        [Fact]
        public async Task DeleteRouteNotLoggedIn()
        {
            // Arrange
            _mockRep.Setup(k => k.DeleteRoute(It.IsAny<int>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = NotLoggedInn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.DeleteRoute(It.IsAny<int>()) as UnauthorizedObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.Unauthorized, res.StatusCode);
            Assert.Equal("Not logged in", res.Value);
        }
        
        [Fact]
        public async Task DeleteRouteLoggedInNotOk()
        {
            // Arrange
            _mockRep.Setup(k => k.DeleteRoute(It.IsAny<int>())).ReturnsAsync(false);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.DeleteRoute(It.IsAny<int>()) as NotFoundObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.NotFound, res.StatusCode);
            Assert.Equal("Route was not found", res.Value);
        }

        /**
         * --------------------------------- Test update cabin -----------------------------
         */
        
        [Fact]
        public async Task UpdateCabinLoggedInOk()
        {
            // Arrange
            _mockRep.Setup(k => k.UpdateCabin(It.IsAny<Cabin>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.UpdateCabin(It.IsAny<Cabin>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.Equal("Cabin updated", res.Value);
        }
        
        [Fact]
        public async Task UpdateCabinNotLoggedIn()
        {
            // Arrange
            _mockRep.Setup(k => k.UpdateCabin(It.IsAny<Cabin>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = NotLoggedInn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.UpdateCabin(It.IsAny<Cabin>()) as UnauthorizedObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.Unauthorized, res.StatusCode);
            Assert.Equal("Not logged in", res.Value);
        }

        [Fact]
        public async Task UpdateCabinLoggedInNotOk()
        {
            // Arrange
            _mockRep.Setup(k => k.UpdateCabin(It.IsAny<Cabin>())).ReturnsAsync(false);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.UpdateCabin(It.IsAny<Cabin>()) as NotFoundObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.NotFound, res.StatusCode);
            Assert.Equal("Cabin was not found", res.Value);
        }
        
        /**
         * --------------------------------- Test create departure -----------------------------
         */
        
        [Fact]
        public async Task PostDepartureLoggedInOk()
        {
            // Arrange
            _mockRep.Setup(k => k.CreateDeparture(It.IsAny<Departure>(), It.IsAny<int>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.PostDeparture(It.IsAny<Departure>(), It.IsAny<int>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.Equal("Departure saved", res.Value);
        }
        
        [Fact]
        public async Task PostDepartureNotLoggedIn()
        {
            // Arrange
            _mockRep.Setup(k => k.CreateDeparture(It.IsAny<Departure>(), It.IsAny<int>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = NotLoggedInn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.PostDeparture(It.IsAny<Departure>(), It.IsAny<int>()) as UnauthorizedObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.Unauthorized, res.StatusCode);
            Assert.Equal("Not logged in", res.Value);
        }
        
        [Fact]
        public async Task PostDepartureLoggedInOkInvalidModelState()
        {
            // Arrange
            _mockRep.Setup(k => k.CreateDeparture(It.IsAny<Departure>(), It.IsAny<int>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            authController.ModelState.AddModelError("Departure","Input validation for route failed on server");

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.PostDeparture(It.IsAny<Departure>(), It.IsAny<int>()) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, res.StatusCode);
            Assert.Equal("Input validation for departure failed on server", res.Value);
        }
        
        [Fact]
        public async Task PostDepartureLoggedInNotOk()
        {
            // Arrange
            _mockRep.Setup(k => k.CreateDeparture(It.IsAny<Departure>(), It.IsAny<int>())).ReturnsAsync(false);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.PostDeparture(It.IsAny<Departure>(), It.IsAny<int>()) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, res.StatusCode);
            Assert.Equal("Departure was not saved", res.Value);
        }
        
        /**
         * --------------------------------- Test update departure -----------------------------
         */
        
        [Fact]
        public async Task UpdateDepartureLoggedInOk()
        {
            // Arrange
            _mockRep.Setup(k => k.UpdateDeparture(It.IsAny<Departure>(), It.IsAny<int>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.UpdateDeparture(It.IsAny<Departure>(), It.IsAny<int>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.Equal("Departure updated", res.Value);
        }
        
        [Fact]
        public async Task UpdateDepartureNotLoggedIn()
        {
            // Arrange
            _mockRep.Setup(k => k.UpdateDeparture(It.IsAny<Departure>(), It.IsAny<int>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = NotLoggedInn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.UpdateDeparture(It.IsAny<Departure>(), It.IsAny<int>()) as UnauthorizedObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.Unauthorized, res.StatusCode);
            Assert.Equal("Not logged in", res.Value);
        }
        
        [Fact]
        public async Task UpdateDepartureLoggedInNotOk()
        {
            // Arrange
            _mockRep.Setup(k => k.UpdateDeparture(It.IsAny<Departure>(), It.IsAny<int>())).ReturnsAsync(false);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.UpdateDeparture(It.IsAny<Departure>(), It.IsAny<int>()) as NotFoundObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.NotFound, res.StatusCode);
            Assert.Equal("Departure was not found", res.Value);
        }
        
        [Fact]
        public async Task UpdateDepartureLoggedInInvalidModelState()
        {
            // Arrange
            _mockRep.Setup(k => k.UpdateDeparture(It.IsAny<Departure>(), It.IsAny<int>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            authController.ModelState.AddModelError("Departure","Input validation for route failed on server");

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.UpdateDeparture(It.IsAny<Departure>(), It.IsAny<int>()) as BadRequestObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.BadRequest, res.StatusCode);
            Assert.Equal("Input validation for departure failed on server", res.Value);
        }
        
        /**
         * --------------------------------- Test delete departure -----------------------------
         */
        
        [Fact]
        public async Task DeleteDepartureLoggedInOk()
        {
            // Arrange
            _mockRep.Setup(k => k.DeleteDeparture(It.IsAny<int>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.DeleteDeparture(It.IsAny<int>()) as OkObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.OK, res.StatusCode);
            Assert.Equal("Departure deleted", res.Value);
        }
        
        [Fact]
        public async Task DeleteDepartureNotLoggedIn()
        {
            // Arrange
            _mockRep.Setup(k => k.DeleteDeparture(It.IsAny<int>())).ReturnsAsync(true);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = NotLoggedInn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.DeleteDeparture(It.IsAny<int>()) as UnauthorizedObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.Unauthorized, res.StatusCode);
            Assert.Equal("Not logged in", res.Value);
        }
        
        [Fact]
        public async Task DeleteDepartureLoggedInNotOk()
        {
            // Arrange
            _mockRep.Setup(k => k.DeleteDeparture(It.IsAny<int>())).ReturnsAsync(false);

            var authController = new AuthController(_mockRep.Object, _mockLog.Object);

            _mockSession[LoggedIn] = LoggedIn;
            _mockHttpContext.Setup(s => s.Session).Returns(_mockSession);
            authController.ControllerContext.HttpContext = _mockHttpContext.Object;

            // Act
            var res = await authController.DeleteDeparture(It.IsAny<int>()) as NotFoundObjectResult;

            // Assert 
            Assert.Equal((int)HttpStatusCode.NotFound, res.StatusCode);
            Assert.Equal("Departure was not found", res.Value);
        }
    }
}
