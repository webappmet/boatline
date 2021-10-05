using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using WebappGroup9.DAL;

// using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
// using Microsoft.Extensions.Configuration;

// using Microsoft.AspNetCore.Http;
// using JavaScriptEngineSwitcher.V8;
// using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
// using React.AspNet;

namespace WebappGroup9
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddDbContext<BoatLineDb>(options => options.UseSqlite("Data Source=BoatLine.db"));
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            // Source: https://stackoverflow.com/questions/59199593/net-core-3-0-possible-object-cycle-was-detected-which-is-not-supported
            // We needed a new package to handle our complicated JSON structure, seems to just work out the box like this
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );
            
            // services.AddSpaStaticFiles(configuration => { configuration.RootPath = "wwwroot/build"; });

            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                loggerFactory.AddFile("Logs/log.txt");
                DbInit.Initialize(app);
            }

            // app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
        }
    }
}