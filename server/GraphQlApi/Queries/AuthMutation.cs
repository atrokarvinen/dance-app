using Dataprovider;
using Dataprovider.Models;
using GraphQlApi.Config;
using GraphQlApi.Inputs;
using GraphQlApi.Outputs;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GraphQlApi.Queries;

[ExtendObjectType("Mutation")]
public class AuthMutation
{
    public SignupOutput Signup([Service] DatabaseContext context, [Service] IOptions<AuthConfig> authConfig, SignupInput input)
    {
        var userExists = context.Users.Any(u => u.Name == input.Username);
        if (userExists)
        {
            throw new Exception("User already exists");
        }
        var hashedPassword = new PasswordHasher<User>().HashPassword(new(), input.Password);
        var user = new User
        {
            Name = input.Username,
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

    public LoginOutput Login([Service] DatabaseContext context, [Service] IOptions<AuthConfig> authConfig, LoginInput input)
    {
        var jwtSecret = authConfig.Value.JwtSecret;
        var username = input.Username;
        var password = input.Password;
        var user = context.Users.FirstOrDefault(u => u.Name == username);
        if (user == null)
        {
            throw new Exception("Invalid username or password");
        }
        var passwordMatches = new PasswordHasher<User>().VerifyHashedPassword(new(), user.Password, password);
        if (passwordMatches == PasswordVerificationResult.Failed)
        {
            throw new Exception("Invalid username or password");
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

    public User Logout([Service] DatabaseContext context, LogoutInput input)
    {
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
