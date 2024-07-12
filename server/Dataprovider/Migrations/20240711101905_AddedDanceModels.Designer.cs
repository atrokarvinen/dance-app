﻿// <auto-generated />
using System;
using Dataprovider;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Dataprovider.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20240711101905_AddedDanceModels")]
    partial class AddedDanceModels
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.6");

            modelBuilder.Entity("DancePatternDancePattern", b =>
                {
                    b.Property<int>("CounterpartsDancePatternId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("VariationsDancePatternId")
                        .HasColumnType("INTEGER");

                    b.HasKey("CounterpartsDancePatternId", "VariationsDancePatternId");

                    b.HasIndex("VariationsDancePatternId");

                    b.ToTable("DancePatternDancePattern");
                });

            modelBuilder.Entity("Dataprovider.Models.Author", b =>
                {
                    b.Property<int>("AuthorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("AuthorId");

                    b.ToTable("Authors");

                    b.HasData(
                        new
                        {
                            AuthorId = 1,
                            Name = "Jon Skeet"
                        },
                        new
                        {
                            AuthorId = 2,
                            Name = "Erich Gamma"
                        });
                });

            modelBuilder.Entity("Dataprovider.Models.Book", b =>
                {
                    b.Property<int>("BookId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AuthorId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("BookId");

                    b.HasIndex("AuthorId");

                    b.ToTable("Books");

                    b.HasData(
                        new
                        {
                            BookId = 1,
                            AuthorId = 1,
                            Title = "C# in depth."
                        },
                        new
                        {
                            BookId = 2,
                            AuthorId = 2,
                            Title = "Design Patterns."
                        });
                });

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

                    b.Property<int?>("BasicPatternId")
                        .HasColumnType("INTEGER");

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
                            DanceId = 1,
                            Description = "Basic step for salsa",
                            Name = "Basic Step"
                        },
                        new
                        {
                            DancePatternId = 2,
                            BasicPatternId = 1,
                            DanceId = 1,
                            Description = "Alternative basic step",
                            Name = "Basic step variation"
                        },
                        new
                        {
                            DancePatternId = 3,
                            DanceId = 2,
                            Description = "Basic step for waltz",
                            Name = "Basic step"
                        });
                });

            modelBuilder.Entity("Dataprovider.Models.DancePatternVariation", b =>
                {
                    b.Property<int>("DancePatternVariationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.HasKey("DancePatternVariationId");

                    b.ToTable("DancePatternVariations");
                });

            modelBuilder.Entity("Dataprovider.Models.FavoritePattern", b =>
                {
                    b.Property<int>("FavoritePatternId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("DancePatternId")
                        .HasColumnType("INTEGER");

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

            modelBuilder.Entity("DancePatternDancePattern", b =>
                {
                    b.HasOne("Dataprovider.Models.DancePattern", null)
                        .WithMany()
                        .HasForeignKey("CounterpartsDancePatternId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Dataprovider.Models.DancePattern", null)
                        .WithMany()
                        .HasForeignKey("VariationsDancePatternId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Dataprovider.Models.Book", b =>
                {
                    b.HasOne("Dataprovider.Models.Author", "Author")
                        .WithMany("Books")
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");
                });

            modelBuilder.Entity("Dataprovider.Models.DancePattern", b =>
                {
                    b.HasOne("Dataprovider.Models.Dance", "Dance")
                        .WithMany()
                        .HasForeignKey("DanceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Dance");
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

            modelBuilder.Entity("Dataprovider.Models.Author", b =>
                {
                    b.Navigation("Books");
                });

            modelBuilder.Entity("Dataprovider.Models.User", b =>
                {
                    b.Navigation("FavoritePatterns");
                });
#pragma warning restore 612, 618
        }
    }
}
