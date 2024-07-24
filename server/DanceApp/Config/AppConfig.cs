﻿namespace DanceApp.Config;

public class AppConfig
{
    public AuthConfig Auth { get; set; } = new AuthConfig();
    public BlobConfig Blob { get; set; } = new BlobConfig();
}
