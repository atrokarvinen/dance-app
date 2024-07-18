﻿// <auto-generated />
using Dataprovider;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Dataprovider.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.6");

            modelBuilder.Entity("Dataprovider.Models.Dance", b =>
                {
                    b.Property<int>("DanceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("DanceId");

                    b.ToTable("Dances");

                    b.HasData(
                        new
                        {
                            DanceId = 1,
                            Name = "Bachata"
                        },
                        new
                        {
                            DanceId = 2,
                            Name = "Bugg"
                        },
                        new
                        {
                            DanceId = 3,
                            Name = "Cha Cha"
                        },
                        new
                        {
                            DanceId = 4,
                            Name = "Finnish folk"
                        },
                        new
                        {
                            DanceId = 5,
                            Name = "Rumba"
                        },
                        new
                        {
                            DanceId = 6,
                            Name = "Salsa"
                        },
                        new
                        {
                            DanceId = 7,
                            Name = "Samba"
                        },
                        new
                        {
                            DanceId = 8,
                            Name = "Swing dance"
                        },
                        new
                        {
                            DanceId = 9,
                            Name = "Tango"
                        },
                        new
                        {
                            DanceId = 10,
                            Name = "Viennesse Waltz"
                        },
                        new
                        {
                            DanceId = 11,
                            Name = "Waltz"
                        });
                });

            modelBuilder.Entity("Dataprovider.Models.DancePattern", b =>
                {
                    b.Property<int>("DancePatternId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Aliases")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("DanceId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("VideoUrl")
                        .HasColumnType("TEXT");

                    b.HasKey("DancePatternId");

                    b.HasIndex("DanceId");

                    b.ToTable("DancePatterns");

                    b.HasData(
                        new
                        {
                            DancePatternId = 1,
                            Aliases = "",
                            DanceId = 6,
                            Description = "Basic step for salsa",
                            Name = "Basic step"
                        },
                        new
                        {
                            DancePatternId = 2,
                            Aliases = "",
                            DanceId = 6,
                            Description = "Alternative basic step",
                            Name = "Basic step variation"
                        },
                        new
                        {
                            DancePatternId = 3,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Box step",
                            VideoUrl = "https://www.youtube.com/watch?v=JMdAFjjxus8"
                        },
                        new
                        {
                            DancePatternId = 4,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Box with underarm turn",
                            VideoUrl = "https://www.youtube.com/watch?v=REm0nvIlOSs"
                        },
                        new
                        {
                            DancePatternId = 5,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Box with underarm turn (variation)",
                            VideoUrl = "https://www.youtube.com/watch?v=pPqfvRMuI2g"
                        },
                        new
                        {
                            DancePatternId = 6,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Left turning box",
                            VideoUrl = "https://www.youtube.com/watch?v=czKmAQw5H1A"
                        },
                        new
                        {
                            DancePatternId = 7,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Left turning box with inside turn",
                            VideoUrl = "https://www.youtube.com/watch?v=H8FLOyah61g"
                        },
                        new
                        {
                            DancePatternId = 8,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Left turning box with outside turn",
                            VideoUrl = "https://www.youtube.com/watch?v=X-d95ctAG2M"
                        },
                        new
                        {
                            DancePatternId = 9,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Waltz right turning box",
                            VideoUrl = "https://www.youtube.com/watch?v=IIQc5QuDWJM"
                        },
                        new
                        {
                            DancePatternId = 10,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Waltz progressive",
                            VideoUrl = "https://www.youtube.com/watch?v=PoP3U5cqGBQ"
                        },
                        new
                        {
                            DancePatternId = 11,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Balances side to side",
                            VideoUrl = "https://www.youtube.com/watch?v=OjflxkGSIVo"
                        },
                        new
                        {
                            DancePatternId = 12,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Hesitations forward and back",
                            VideoUrl = "https://www.youtube.com/watch?v=qTxGkP9IBzA"
                        },
                        new
                        {
                            DancePatternId = 13,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Hesitation and box",
                            VideoUrl = "https://www.youtube.com/watch?v=czS_SqSO5vQ"
                        },
                        new
                        {
                            DancePatternId = 14,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Simple twinkle",
                            VideoUrl = "https://www.youtube.com/watch?v=ieXU4xp-1aY"
                        },
                        new
                        {
                            DancePatternId = 15,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Turning twinkles",
                            VideoUrl = "https://www.youtube.com/watch?v=ImkKeLhcSVQ"
                        },
                        new
                        {
                            DancePatternId = 16,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Twinkles with head loops",
                            VideoUrl = "https://www.youtube.com/watch?v=zPYvIvdA3sg"
                        },
                        new
                        {
                            DancePatternId = 17,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Open twinkles",
                            VideoUrl = "https://www.youtube.com/watch?v=NDtRgQOrW8g"
                        },
                        new
                        {
                            DancePatternId = 18,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Open twinkles in handshake hold",
                            VideoUrl = "https://www.youtube.com/watch?v=piRVOpbSwx4"
                        },
                        new
                        {
                            DancePatternId = 19,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Fallaway twinkle",
                            VideoUrl = "https://www.youtube.com/watch?v=bRxYZX-BA3U"
                        },
                        new
                        {
                            DancePatternId = 20,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Reverse turn",
                            VideoUrl = "https://www.youtube.com/watch?v=9iRynGOzRbE"
                        },
                        new
                        {
                            DancePatternId = 21,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Natural turn",
                            VideoUrl = "https://www.youtube.com/watch?v=9iRynGOzRbE"
                        },
                        new
                        {
                            DancePatternId = 22,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Progressive outside partner",
                            VideoUrl = "https://www.youtube.com/watch?v=7hyyBj4XmzY"
                        },
                        new
                        {
                            DancePatternId = 23,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Face to face, back to back",
                            VideoUrl = "https://www.youtube.com/watch?v=VC5AB-ADopU"
                        },
                        new
                        {
                            DancePatternId = 24,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Two way underarm turn",
                            VideoUrl = "https://www.youtube.com/watch?v=RgutxhTw1os"
                        },
                        new
                        {
                            DancePatternId = 25,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Criss crosses",
                            VideoUrl = "https://www.youtube.com/watch?v=svbuuSvMa24"
                        },
                        new
                        {
                            DancePatternId = 26,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Chasse ending in promenade",
                            VideoUrl = "https://www.youtube.com/watch?v=49EOX6E8rbM"
                        },
                        new
                        {
                            DancePatternId = 27,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Chasse ending in closed",
                            VideoUrl = "https://www.youtube.com/watch?v=a3pWyB4low8"
                        },
                        new
                        {
                            DancePatternId = 28,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Grapevine",
                            VideoUrl = "https://www.youtube.com/watch?v=z-mnCqurfQM"
                        },
                        new
                        {
                            DancePatternId = 29,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Twinkle and weave",
                            VideoUrl = "https://www.youtube.com/watch?v=OErf1WWAopI"
                        },
                        new
                        {
                            DancePatternId = 30,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Fallaway slip pivot",
                            VideoUrl = "https://www.youtube.com/watch?v=ekJYIwbRnY8"
                        },
                        new
                        {
                            DancePatternId = 31,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Spin turn",
                            VideoUrl = "https://www.youtube.com/watch?v=lATiYxXO4fk"
                        },
                        new
                        {
                            DancePatternId = 32,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Closed impetus",
                            VideoUrl = "https://www.youtube.com/watch?v=3RuK2kpTsP0"
                        },
                        new
                        {
                            DancePatternId = 33,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Contra check",
                            VideoUrl = "https://www.youtube.com/watch?v=bo1iO6HlQCI"
                        },
                        new
                        {
                            DancePatternId = 34,
                            Aliases = "",
                            DanceId = 11,
                            Description = "",
                            Name = "Shadow position",
                            VideoUrl = "https://www.youtube.com/watch?v=sr20mLAV6Ec"
                        });
                });

            modelBuilder.Entity("Dataprovider.Models.DancePatternVariation", b =>
                {
                    b.Property<int>("DancePatternVariationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("OriginalId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("VariationId")
                        .HasColumnType("INTEGER");

                    b.HasKey("DancePatternVariationId");

                    b.HasIndex("OriginalId");

                    b.HasIndex("VariationId");

                    b.ToTable("DancePatternVariations");
                });

            modelBuilder.Entity("Dataprovider.Models.FavoritePattern", b =>
                {
                    b.Property<int>("FavoritePatternId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("DancePatternId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("FavoritePatternId");

                    b.HasIndex("DancePatternId");

                    b.HasIndex("UserId");

                    b.ToTable("FavoritePatterns");
                });

            modelBuilder.Entity("Dataprovider.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Dataprovider.Models.DancePattern", b =>
                {
                    b.HasOne("Dataprovider.Models.Dance", "Dance")
                        .WithMany("DancePatterns")
                        .HasForeignKey("DanceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dance");
                });

            modelBuilder.Entity("Dataprovider.Models.DancePatternVariation", b =>
                {
                    b.HasOne("Dataprovider.Models.DancePattern", "Original")
                        .WithMany("Variations")
                        .HasForeignKey("OriginalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Dataprovider.Models.DancePattern", "Variation")
                        .WithMany()
                        .HasForeignKey("VariationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Original");

                    b.Navigation("Variation");
                });

            modelBuilder.Entity("Dataprovider.Models.FavoritePattern", b =>
                {
                    b.HasOne("Dataprovider.Models.DancePattern", "DancePattern")
                        .WithMany()
                        .HasForeignKey("DancePatternId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Dataprovider.Models.User", "User")
                        .WithMany("FavoritePatterns")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DancePattern");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Dataprovider.Models.Dance", b =>
                {
                    b.Navigation("DancePatterns");
                });

            modelBuilder.Entity("Dataprovider.Models.DancePattern", b =>
                {
                    b.Navigation("Variations");
                });

            modelBuilder.Entity("Dataprovider.Models.User", b =>
                {
                    b.Navigation("FavoritePatterns");
                });
#pragma warning restore 612, 618
        }
    }
}
