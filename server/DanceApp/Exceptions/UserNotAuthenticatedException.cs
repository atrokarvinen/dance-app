namespace DanceApp.Exceptions;

public class UserNotAuthenticatedException : Exception
{
    public UserNotAuthenticatedException(string message) : base(message) { }
}
