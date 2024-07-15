﻿// <auto-generated />
using Dataprovider;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Dataprovider.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20240715130750_AddedVideoAndImageSeed")]
    partial class AddedVideoAndImageSeed
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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
                            Name = "Salsa"
                        },
                        new
                        {
                            DanceId = 2,
                            Name = "Waltz"
                        },
                        new
                        {
                            DanceId = 3,
                            Name = "Tango"
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
                            DanceId = 1,
                            Description = "Basic step for salsa",
                            Name = "Basic Step"
                        },
                        new
                        {
                            DancePatternId = 2,
                            Aliases = "",
                            DanceId = 1,
                            Description = "Alternative basic step",
                            Name = "Basic step variation"
                        },
                        new
                        {
                            DancePatternId = 3,
                            Aliases = "",
                            DanceId = 2,
                            Description = "Basic step for waltz",
                            Name = "Box step",
                            VideoUrl = "https://www.youtube.com/watch?v=JMdAFjjxus8"
                        },
                        new
                        {
                            DancePatternId = 4,
                            Aliases = "",
                            DanceId = 2,
                            Description = "Simple twinkle",
                            ImageUrl = "https://www.ballroomdancers.com/dances/awa/twinkle.jpg",
                            Name = "Twinkle",
                            VideoUrl = "https://www.youtube.com/watch?v=ieXU4xp-1aY"
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

                    b.HasData(
                        new
                        {
                            DancePatternVariationId = 1,
                            OriginalId = 1,
                            VariationId = 2
                        });
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

                    b.HasData(
                        new
                        {
                            FavoritePatternId = 1,
                            DancePatternId = 1,
                            DisplayName = "",
                            UserId = 1
                        });
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

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Name = "John Doe",
                            Password = "password"
                        });
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