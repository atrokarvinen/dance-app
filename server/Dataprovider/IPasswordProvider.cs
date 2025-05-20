namespace Dataprovider;

public interface IPasswordProvider
{
    string HashPassword(string password);
    bool VerifyPassword(string hashedPassword, string providedPassword);
}