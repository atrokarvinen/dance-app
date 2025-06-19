using DanceApp.Auth;
using DanceApp.Config;
using DanceApp.DancePatterns;
using DanceApp.Dances;
using DanceApp.Extensions;
using DanceApp.Favorites;
using DanceApp.Initialization;
using DanceApp.Services;
using Dataprovider;
using Dataprovider.Repositories;
using Dataprovider.Seed;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

builder.Services.Configure<AuthConfig>(builder.Configuration.GetSection("Auth"));
builder.Services.Configure<BlobConfig>(builder.Configuration.GetSection("Blob"));
builder.Services.AddOptions();
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();

builder.AddAuth();
builder.AddDatabase();

builder.Services.AddScoped<DanceRepository>();
builder.Services.AddScoped<DancePatternRepository>();
builder.Services.AddScoped<FavoriteRepository>();
builder.Services.AddScoped<FavoritesService>();
builder.Services.AddScoped<BlobService>();
builder.Services.AddAuthorization();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<DanceService>();
builder.Services.AddScoped<DancePatternService>();
builder.Services.AddScoped<FavoriteService>();
builder.Services.AddScoped<UserSeeder>();
builder.Services.AddScoped<IPasswordProvider, PasswordProvider>();

builder.Services.AddHostedService<DbSeeder>();

builder.Host.UseSerilog((context, config) =>
    config.ReadFrom.Configuration(context.Configuration)
);

var app = builder.Build();

app.UseCors(builder => builder
    .WithOrigins([
        "http://localhost:5173",
        "http://localhost:4173"
    ])
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
    );

app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
