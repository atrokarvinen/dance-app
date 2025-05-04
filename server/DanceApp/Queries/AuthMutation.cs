using DanceApp.Auth;
using DanceApp.Auth.Models;
using DanceApp.Exceptions;
using DanceApp.Outputs;
using Dataprovider.Models;

namespace DanceApp.Queries;

[ExtendObjectType("Mutation")]
public class AuthMutation
{
    [Error<UsernameTakenException>]
    public Task<SignupOutput> Signup(
        [Service] AuthService authService,
        string username,
        string password)
    {
        var payload = new SignupPayload(username, password);
        return authService.Signup(payload);
    }

    [Error<InvalidCredentialsException>]
    public Task<LoginOutput> Login(
        [Service] AuthService authService,
        string username,
        string password)
    {
        var payload = new LoginPayload(username, password);
        return authService.Login(payload);
    }

    public Task<User> DeleteUser([Service] AuthService authService, string name)
    {
        return authService.DeleteUser(name);
    }
}
