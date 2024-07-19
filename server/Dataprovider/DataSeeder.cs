using Dataprovider.Models;
using Microsoft.EntityFrameworkCore;

namespace Dataprovider;

public class DataSeeder
{
    public static void Seed(ModelBuilder modelBuilder)
    {
        var danceNames = new List<string>()
        {
            "Bachata",
            "Bugg",
            "Cha Cha",
            "Finnish folk",
            "Rumba",
            "Salsa",
            "Samba",
            "Swing dance",
            "Tango",
            "Viennesse Waltz",
            "Waltz",
        };

        var dances = danceNames.Select((x, i) => new Dance()
        {
            Name = x,
            DanceId = i + 1,
        });

        var patterns = new List<DancePattern>()
        {
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Salsa") + 1,
                Name = "Basic step",
                Description = "Basic step for salsa",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Salsa") + 1,
                Name = "Basic step variation",
                Description = "Alternative basic step",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Box step",
                VideoUrl= "https://www.youtube.com/watch?v=JMdAFjjxus8",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Box with underarm turn",
                VideoUrl= "https://www.youtube.com/watch?v=REm0nvIlOSs",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Box with underarm turn (variation)",
                VideoUrl= "https://www.youtube.com/watch?v=pPqfvRMuI2g",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Left turning box",
                VideoUrl= "https://www.youtube.com/watch?v=czKmAQw5H1A",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Left turning box with inside turn",
                VideoUrl= "https://www.youtube.com/watch?v=H8FLOyah61g",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Left turning box with outside turn",
                VideoUrl= "https://www.youtube.com/watch?v=X-d95ctAG2M",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Right turning box",
                VideoUrl= "https://www.youtube.com/watch?v=IIQc5QuDWJM",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Progressive step",
                VideoUrl= "https://www.youtube.com/watch?v=PoP3U5cqGBQ",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Balances side to side",
                VideoUrl= "https://www.youtube.com/watch?v=OjflxkGSIVo",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Hesitations forward and back",
                VideoUrl= "https://www.youtube.com/watch?v=qTxGkP9IBzA",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Hesitation and box",
                VideoUrl= "https://www.youtube.com/watch?v=czS_SqSO5vQ",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Simple twinkle",
                VideoUrl= "https://www.youtube.com/watch?v=ieXU4xp-1aY",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Turning twinkles",
                VideoUrl= "https://www.youtube.com/watch?v=ImkKeLhcSVQ",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Twinkles with head loops",
                VideoUrl= "https://www.youtube.com/watch?v=zPYvIvdA3sg",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Open twinkles",
                VideoUrl= "https://www.youtube.com/watch?v=NDtRgQOrW8g",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Open twinkles in handshake hold",
                VideoUrl= "https://www.youtube.com/watch?v=piRVOpbSwx4",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Fallaway twinkle",
                VideoUrl= "https://www.youtube.com/watch?v=bRxYZX-BA3U",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Reverse turn",
                VideoUrl= "https://www.youtube.com/watch?v=9iRynGOzRbE",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Natural turn",
                VideoUrl= "https://www.youtube.com/watch?v=9iRynGOzRbE",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Progressive outside partner",
                VideoUrl= "https://www.youtube.com/watch?v=7hyyBj4XmzY",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Face to face, back to back",
                VideoUrl= "https://www.youtube.com/watch?v=VC5AB-ADopU",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Two way underarm turn",
                VideoUrl= "https://www.youtube.com/watch?v=RgutxhTw1os",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Criss crosses",
                VideoUrl= "https://www.youtube.com/watch?v=svbuuSvMa24",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Chasse ending in promenade",
                VideoUrl= "https://www.youtube.com/watch?v=49EOX6E8rbM",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Chasse ending in closed",
                VideoUrl= "https://www.youtube.com/watch?v=a3pWyB4low8",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Grapevine",
                VideoUrl= "https://www.youtube.com/watch?v=z-mnCqurfQM",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Twinkle and weave",
                VideoUrl= "https://www.youtube.com/watch?v=OErf1WWAopI",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Fallaway slip pivot",
                VideoUrl= "https://www.youtube.com/watch?v=ekJYIwbRnY8",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Spin turn",
                VideoUrl= "https://www.youtube.com/watch?v=lATiYxXO4fk",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Closed impetus",
                VideoUrl= "https://www.youtube.com/watch?v=3RuK2kpTsP0",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Contra check",
                VideoUrl= "https://www.youtube.com/watch?v=bo1iO6HlQCI",
            },
            new DancePattern()
            {
                DanceId = danceNames.IndexOf("Waltz") + 1,
                Name = "Shadow position",
                VideoUrl= "https://www.youtube.com/watch?v=sr20mLAV6Ec",
            },
        };
        for (int i = 0; i < patterns.Count; i++)
        {
            patterns[i].DancePatternId = i + 1;
        }

        modelBuilder.Entity<Dance>().HasData(dances);
        modelBuilder.Entity<DancePattern>().HasData(patterns);
    }
}
