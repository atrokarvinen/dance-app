using Dataprovider;
using Dataprovider.Repositories;
using Dataprovider.Services;
using GraphQlApi;
using GraphQlApi.Config;
using GraphQlApi.Queries;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
var jwtSecret = builder.Configuration.GetSection("Auth:JwtSecret");
var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret.Value!));

builder.Services.Configure<AuthConfig>(builder.Configuration.GetSection("Auth"));
builder.Services.AddOptions();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
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
builder.Services.AddDbContext<DatabaseContext>();
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
