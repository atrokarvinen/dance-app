using Dataprovider;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DanceApp.Extensions;

public static class WebAppBuilderExtensions
{
    public static void AddAuth(this WebApplicationBuilder builder)
    {
        var jwtSecret = builder.Configuration.GetSection("Auth:JwtSecret");
        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret.Value!));
        builder.Services
            .AddAuthentication()
            .AddJwtBearer(builder =>
            {
                builder.TokenValidationParameters = new TokenValidationParameters
                {
                    IssuerSigningKey = signingKey,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true
                };
            });
    }

    public static void AddDatabase(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<DatabaseContext>(optionsBuilder =>
        {
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            var databaseProvider = builder.Configuration.GetSection("DatabaseProvider").Value;
            var env = builder.Environment.EnvironmentName;
            if (databaseProvider == "PostgreSQL")
            {
                optionsBuilder.UseNpgsql(connectionString);
            }
            else if (databaseProvider == "SQLite")
            {
                optionsBuilder.UseSqlite(connectionString);
            }
            else
            {
                throw new Exception($"Unknown database provider '{databaseProvider}'");
            }
        });
    }
}
