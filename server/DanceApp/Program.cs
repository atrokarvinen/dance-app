using DanceApp.Config;
using DanceApp.Extensions;
using DanceApp.Queries;
using DanceApp.Services;
using Dataprovider;
using Dataprovider.Repositories;
using Dataprovider.Services;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

builder.Services.Configure<AuthConfig>(builder.Configuration.GetSection("Auth"));
builder.Services.Configure<BlobConfig>(builder.Configuration.GetSection("Blob"));
builder.Services.AddOptions();
builder.Services.AddControllers();
builder.Services.AddHttpClient();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.AddAuth();
builder.AddDatabase();
builder.Services.AddScoped<DanceRepository>();
builder.Services.AddScoped<DancePatternRepository>();
builder.Services.AddScoped<FavoritesRepository>();
builder.Services.AddScoped<FavoritesService>();
builder.Services.AddScoped<BlobService>();
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
    .AddType<UploadType>()
    .AddMutationConventions()
    ;

builder.Host.UseSerilog((context, config) =>
    config.ReadFrom.Configuration(context.Configuration)
);

var app = builder.Build();

app.MapGraphQL();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
