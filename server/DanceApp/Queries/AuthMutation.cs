using DanceApp.Config;
using DanceApp.Exceptions;
using DanceApp.Outputs;
using Dataprovider;
using Dataprovider.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DanceApp.Queries;

[ExtendObjectType("Mutation")]
public class AuthMutation
{
    [Error<UsernameTakenException>]
    public SignupOutput Signup(
        [Service] DatabaseContext context,
        [Service] IOptions<AuthConfig> authConfig,
        string username,
        string password)
    {
        var userExists = context.Users.Any(u => u.Name == username);
        if (userExists)
        {
            throw new UsernameTakenException("User already exists");
        }
        var hashedPassword = new PasswordHasher<User>().HashPassword(new User(), password);
        var user = new User
        {
            Name = username,
            Password = hashedPassword,
        };
        context.Users.Add(user);
        context.SaveChanges();
        var jwt = GenerateJWTToken(user.Name, user.UserId.ToString(), authConfig.Value.JwtSecret);
        return new SignupOutput()
        {
            Username = user.Name,
            UserId = user.UserId,
            Token = jwt,
        };
    }

    [Error<InvalidCredentialsException>]
    public LoginOutput Login(
        [Service] DatabaseContext context,
        [Service] IOptions<AuthConfig> authConfig,
        string username,
        string password)
    {
        var jwtSecret = authConfig.Value.JwtSecret;
        var user = context.Users.FirstOrDefault(u => u.Name == username);
        if (user == null)
        {
            throw new InvalidCredentialsException("Invalid username or password");
        }
        var passwordMatches = new PasswordHasher<User>().VerifyHashedPassword(new User(), user.Password, password);
        if (passwordMatches == PasswordVerificationResult.Failed)
        {
            throw new InvalidCredentialsException("Invalid username or password");
        }
        var token = GenerateJWTToken(user.Name, user.UserId.ToString(), jwtSecret);
        var response = new LoginOutput() { Token = token };
        return response;
    }

    public User DeleteUser([Service] DatabaseContext context, string name)
    {
        context.Users.RemoveRange(context.Users.Where(u => u.Name == name));
        context.SaveChanges();
        return new User();
    }

    private string GenerateJWTToken(string name, string userId, string secret)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Name, name),
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
}
