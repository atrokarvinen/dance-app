using Dataprovider;
using GraphQlApi.Queries;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<DatabaseContext>();
builder.Services
    .AddGraphQLServer()
    .RegisterDbContext<DatabaseContext>()
    .AddQueryType(q => q.Name("Query"))
    .AddType<MyQuery>()
    .AddType<AnotherQuery>()
    .AddMutationType<MyMutation>()
    ;

var app = builder.Build();

app.MapGraphQL();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
