using DanceApp.Config;
using DanceApp.Extensions;
using DanceApp.Queries;
using Dataprovider;
using Dataprovider.Repositories;
using Dataprovider.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true);

builder.Services.Configure<AuthConfig>(builder.Configuration.GetSection("Auth"));
builder.Services.AddOptions();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.AddAuth();
builder.AddDatabase();
builder.Services.AddScoped<DanceRepository>();
builder.Services.AddScoped<DancePatternRepository>();
builder.Services.AddScoped<FavoritesRepository>();
builder.Services.AddScoped<FavoritesService>();
builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .RegisterDbContext<DatabaseContext>()
    .AddQueryType(q => q.Name("Query"))
    .AddMutationType(m => m.Name("Mutation"))
    .AddType<AuthQuery>()
    .AddType<AuthMutation>()
    .AddType<DanceQuery>()
    .AddType<DanceMutation>()
    .AddType<DancePatternQuery>()
    .AddType<DancePatternMutation>()
    .AddType<FavoritesQuery>()
    .AddType<FavoritesMutation>()
    ;

var app = builder.Build();

app.MapGraphQL();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
