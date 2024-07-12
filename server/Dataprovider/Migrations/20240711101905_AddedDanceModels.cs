using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Dataprovider.Migrations
{
    /// <inheritdoc />
    public partial class AddedDanceModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DancePatternVariations",
                columns: table => new
                {
                    DancePatternVariationId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DancePatternVariations", x => x.DancePatternVariationId);
                });

            migrationBuilder.CreateTable(
                name: "Dances",
                columns: table => new
                {
                    DanceId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dances", x => x.DanceId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "DancePatterns",
                columns: table => new
                {
                    DancePatternId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    VideoUrl = table.Column<string>(type: "TEXT", nullable: true),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: true),
                    DanceId = table.Column<int>(type: "INTEGER", nullable: false),
                    BasicPatternId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DancePatterns", x => x.DancePatternId);
                    table.ForeignKey(
                        name: "FK_DancePatterns_Dances_DanceId",
                        column: x => x.DanceId,
                        principalTable: "Dances",
                        principalColumn: "DanceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DancePatternDancePattern",
                columns: table => new
                {
                    CounterpartsDancePatternId = table.Column<int>(type: "INTEGER", nullable: false),
                    VariationsDancePatternId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DancePatternDancePattern", x => new { x.CounterpartsDancePatternId, x.VariationsDancePatternId });
                    table.ForeignKey(
                        name: "FK_DancePatternDancePattern_DancePatterns_CounterpartsDancePatternId",
                        column: x => x.CounterpartsDancePatternId,
                        principalTable: "DancePatterns",
                        principalColumn: "DancePatternId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DancePatternDancePattern_DancePatterns_VariationsDancePatternId",
                        column: x => x.VariationsDancePatternId,
                        principalTable: "DancePatterns",
                        principalColumn: "DancePatternId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FavoritePatterns",
                columns: table => new
                {
                    FavoritePatternId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    DancePatternId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FavoritePatterns", x => x.FavoritePatternId);
                    table.ForeignKey(
                        name: "FK_FavoritePatterns_DancePatterns_DancePatternId",
                        column: x => x.DancePatternId,
                        principalTable: "DancePatterns",
                        principalColumn: "DancePatternId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FavoritePatterns_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Dances",
                columns: new[] { "DanceId", "Name" },
                values: new object[,]
                {
                    { 1, "Salsa" },
                    { 2, "Waltz" },
                    { 3, "Tango" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Name", "Password" },
                values: new object[] { 1, "John Doe", "password" });

            migrationBuilder.InsertData(
                table: "DancePatterns",
                columns: new[] { "DancePatternId", "BasicPatternId", "DanceId", "Description", "ImageUrl", "Name", "VideoUrl" },
                values: new object[,]
                {
                    { 1, null, 1, "Basic step for salsa", null, "Basic Step", null },
                    { 2, 1, 1, "Alternative basic step", null, "Basic step variation", null },
                    { 3, null, 2, "Basic step for waltz", null, "Basic step", null }
                });

            migrationBuilder.InsertData(
                table: "FavoritePatterns",
                columns: new[] { "FavoritePatternId", "DancePatternId", "UserId" },
                values: new object[] { 1, 1, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_DancePatternDancePattern_VariationsDancePatternId",
                table: "DancePatternDancePattern",
                column: "VariationsDancePatternId");

            migrationBuilder.CreateIndex(
                name: "IX_DancePatterns_DanceId",
                table: "DancePatterns",
                column: "DanceId");

            migrationBuilder.CreateIndex(
                name: "IX_FavoritePatterns_DancePatternId",
                table: "FavoritePatterns",
                column: "DancePatternId");

            migrationBuilder.CreateIndex(
                name: "IX_FavoritePatterns_UserId",
                table: "FavoritePatterns",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DancePatternDancePattern");

            migrationBuilder.DropTable(
                name: "DancePatternVariations");

            migrationBuilder.DropTable(
                name: "FavoritePatterns");

            migrationBuilder.DropTable(
                name: "DancePatterns");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Dances");
        }
    }
}
