using Dataprovider;
using Dataprovider.Models;
using Microsoft.AspNetCore.Identity;

namespace DanceApp.Auth;

public class PasswordProvider : IPasswordProvider
{
    public string HashPassword(string password)
    {
        var hashedPassword = new PasswordHasher<User>().HashPassword(new User(), password);
        return hashedPassword;
    }

    public bool VerifyPassword(string hashedPassword, string providedPassword)
    {
        var passwordMatches = new PasswordHasher<User>().VerifyHashedPassword(new User(), hashedPassword, providedPassword);
        return passwordMatches == PasswordVerificationResult.Success;
    }
}
