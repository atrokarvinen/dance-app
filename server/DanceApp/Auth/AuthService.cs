using DanceApp.Auth.Models;
using DanceApp.Config;
using DanceApp.Exceptions;
using DanceApp.Outputs;
using Dataprovider;
using Dataprovider.Enums;
using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DanceApp.Auth;

public class AuthService(
    DatabaseContext dbContext,
    IOptions<AuthConfig> authConfig,
    IPasswordProvider passwordProvider)
{
    public async Task<SignupOutput> Signup(SignupPayload payload, string? role = null)
    {
        var (username, password) = payload;
        var userExists = await dbContext.Users.AnyAsync(u => u.Name == username);
        if (userExists)
        {
            throw new UsernameTakenException("User already exists");
        }
        var hashedPassword = passwordProvider.HashPassword(password);
        var userRole = UserRole.User;
        if (role != null)
        {
            userRole = Enum.Parse<UserRole>(role);
        }
        var user = new User
        {
            Name = username,
            Password = hashedPassword,
            Role = userRole.ToString(),
        };
        await dbContext.Users.AddAsync(user);
        await dbContext.SaveChangesAsync();
        var jwt = GenerateJWTToken(user.Name, user.Id.ToString(), user.Role, authConfig.Value.JwtSecret);
        return new SignupOutput()
        {
            Username = user.Name,
            UserId = user.Id,
            Token = jwt,
        };
    }

    public async Task<LoginOutput> Login(LoginPayload payload)
    {
        var (username, password) = payload;
        var jwtSecret = authConfig.Value.JwtSecret;
        var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Name == username);
        if (user == null)
        {
            throw new InvalidCredentialsException("Invalid username or password");
        }
        var passwordMatches = passwordProvider.VerifyPassword(user.Password, password);
        if (!passwordMatches)
        {
            throw new InvalidCredentialsException("Invalid username or password");
        }
        var token = GenerateJWTToken(user.Name, user.Id.ToString(), user.Role, jwtSecret);
        var response = new LoginOutput() { Token = token };
        return response;
    }

    public async Task<User> DeleteUser(string name)
    {
        var users = await dbContext.Users.Where(u => u.Name == name).ToListAsync();
        dbContext.Users.RemoveRange(users);
        await dbContext.SaveChangesAsync();
        return new User();
    }

    private static string GenerateJWTToken(string name, string userId, string role, string secret)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Name, name),
            new Claim(ClaimTypes.Role, role),
        };
        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var jwtToken = new JwtSecurityToken(
            claims: claims,
            notBefore: DateTime.UtcNow,
            expires: DateTime.UtcNow.AddDays(30),
            signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature));
        var jwt = new JwtSecurityTokenHandler().WriteToken(jwtToken);
        return jwt;
    }

    public User WhoAmI(ClaimsPrincipal claims)
    {
        var userId = claims.FindFirstValue(ClaimTypes.NameIdentifier);
        var name = claims.FindFirstValue(ClaimTypes.Name);

        _ = int.TryParse(userId, out int parsedId);

        var user = new User()
        {
            Name = name ?? "N/A",
            Id = parsedId,
        };

        return user;
    }
}
