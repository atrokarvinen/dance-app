namespace DanceApp.Exceptions;

public class UserAuthenticationException : Exception
{
    public UserAuthenticationException(string message) : base(message) { }
}
