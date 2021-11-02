using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace BoatLine.DAL
{
    public static class DbInit
    {
        [ExcludeFromCodeCoverage]
        public static void Initialize(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            var boatLineContext = serviceScope.ServiceProvider.GetService<BoatLineDb>();

            if (boatLineContext == null) return;
            boatLineContext.Database.EnsureDeleted();
            boatLineContext.Database.EnsureCreated();

            var seedDb = new SeedDb(boatLineContext);

            // Seeding database with initial values
            seedDb.SeedPostalCodes();
            seedDb.SeedRoutes();
            seedDb.SeedCabins();
            seedDb.SeedAuthAdmin();
            seedDb.SeedDepartures();
        }
    }
}