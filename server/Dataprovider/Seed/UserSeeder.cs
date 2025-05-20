using Dataprovider.Enums;
using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;

namespace Dataprovider.Seed;

public class UserSeeder(DatabaseContext dbContext, IPasswordProvider passwordProvider)
{
    public async Task SeedUsers()
    {
        var existingUsers = await dbContext.Users.ToListAsync();

        var normalUser = new User()
        {
            Name = "Test user",
            Password = passwordProvider.HashPassword("1"),
            Role = UserRole.User.ToString(),
        };
        var adminUser = new User()
        {
            Name = "Admin",
            Password = passwordProvider.HashPassword("1"),
            Role = UserRole.Admin.ToString(),
        };

        if (!existingUsers.Any(x => x.Name == normalUser.Name))
        {
            await dbContext.Users.AddAsync(normalUser);
        }
        if (!existingUsers.Any(x => x.Name == adminUser.Name))
        {
            await dbContext.Users.AddAsync(adminUser);
        }

        await dbContext.SaveChangesAsync();
    }
}
