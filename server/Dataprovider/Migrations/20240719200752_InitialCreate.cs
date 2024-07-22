using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Dataprovider.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Dances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dances", x => x.Id);
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
                    Aliases = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    VideoUrl = table.Column<string>(type: "TEXT", nullable: true),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: true),
                    DanceId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DancePatterns", x => x.DancePatternId);
                    table.ForeignKey(
                        name: "FK_DancePatterns_Dances_DanceId",
                        column: x => x.DanceId,
                        principalTable: "Dances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DancePatternVariations",
                columns: table => new
                {
                    DancePatternVariationId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OriginalId = table.Column<int>(type: "INTEGER", nullable: false),
                    VariationId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DancePatternVariations", x => x.DancePatternVariationId);
                    table.ForeignKey(
                        name: "FK_DancePatternVariations_DancePatterns_OriginalId",
                        column: x => x.OriginalId,
                        principalTable: "DancePatterns",
                        principalColumn: "DancePatternId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DancePatternVariations_DancePatterns_VariationId",
                        column: x => x.VariationId,
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
                    DisplayName = table.Column<string>(type: "TEXT", nullable: false),
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
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Bachata" },
                    { 2, "Bugg" },
                    { 3, "Cha Cha" },
                    { 4, "Finnish folk" },
                    { 5, "Rumba" },
                    { 6, "Salsa" },
                    { 7, "Samba" },
                    { 8, "Swing dance" },
                    { 9, "Tango" },
                    { 10, "Viennesse Waltz" },
                    { 11, "Waltz" }
                });

            migrationBuilder.InsertData(
                table: "DancePatterns",
                columns: new[] { "DancePatternId", "Aliases", "DanceId", "Description", "ImageUrl", "Name", "VideoUrl" },
                values: new object[,]
                {
                    { 1, "", 6, "Basic step for salsa", null, "Basic step", null },
                    { 2, "", 6, "Alternative basic step", null, "Basic step variation", null },
                    { 3, "", 11, "", null, "Box step", "https://www.youtube.com/watch?v=JMdAFjjxus8" },
                    { 4, "", 11, "", null, "Box with underarm turn", "https://www.youtube.com/watch?v=REm0nvIlOSs" },
                    { 5, "", 11, "", null, "Box with underarm turn (variation)", "https://www.youtube.com/watch?v=pPqfvRMuI2g" },
                    { 6, "", 11, "", null, "Left turning box", "https://www.youtube.com/watch?v=czKmAQw5H1A" },
                    { 7, "", 11, "", null, "Left turning box with inside turn", "https://www.youtube.com/watch?v=H8FLOyah61g" },
                    { 8, "", 11, "", null, "Left turning box with outside turn", "https://www.youtube.com/watch?v=X-d95ctAG2M" },
                    { 9, "", 11, "", null, "Right turning box", "https://www.youtube.com/watch?v=IIQc5QuDWJM" },
                    { 10, "", 11, "", null, "Progressive step", "https://www.youtube.com/watch?v=PoP3U5cqGBQ" },
                    { 11, "", 11, "", null, "Balances side to side", "https://www.youtube.com/watch?v=OjflxkGSIVo" },
                    { 12, "", 11, "", null, "Hesitations forward and back", "https://www.youtube.com/watch?v=qTxGkP9IBzA" },
                    { 13, "", 11, "", null, "Hesitation and box", "https://www.youtube.com/watch?v=czS_SqSO5vQ" },
                    { 14, "", 11, "", null, "Simple twinkle", "https://www.youtube.com/watch?v=ieXU4xp-1aY" },
                    { 15, "", 11, "", null, "Turning twinkles", "https://www.youtube.com/watch?v=ImkKeLhcSVQ" },
                    { 16, "", 11, "", null, "Twinkles with head loops", "https://www.youtube.com/watch?v=zPYvIvdA3sg" },
                    { 17, "", 11, "", null, "Open twinkles", "https://www.youtube.com/watch?v=NDtRgQOrW8g" },
                    { 18, "", 11, "", null, "Open twinkles in handshake hold", "https://www.youtube.com/watch?v=piRVOpbSwx4" },
                    { 19, "", 11, "", null, "Fallaway twinkle", "https://www.youtube.com/watch?v=bRxYZX-BA3U" },
                    { 20, "", 11, "", null, "Reverse turn", "https://www.youtube.com/watch?v=9iRynGOzRbE" },
                    { 21, "", 11, "", null, "Natural turn", "https://www.youtube.com/watch?v=9iRynGOzRbE" },
                    { 22, "", 11, "", null, "Progressive outside partner", "https://www.youtube.com/watch?v=7hyyBj4XmzY" },
                    { 23, "", 11, "", null, "Face to face, back to back", "https://www.youtube.com/watch?v=VC5AB-ADopU" },
                    { 24, "", 11, "", null, "Two way underarm turn", "https://www.youtube.com/watch?v=RgutxhTw1os" },
                    { 25, "", 11, "", null, "Criss crosses", "https://www.youtube.com/watch?v=svbuuSvMa24" },
                    { 26, "", 11, "", null, "Chasse ending in promenade", "https://www.youtube.com/watch?v=49EOX6E8rbM" },
                    { 27, "", 11, "", null, "Chasse ending in closed", "https://www.youtube.com/watch?v=a3pWyB4low8" },
                    { 28, "", 11, "", null, "Grapevine", "https://www.youtube.com/watch?v=z-mnCqurfQM" },
                    { 29, "", 11, "", null, "Twinkle and weave", "https://www.youtube.com/watch?v=OErf1WWAopI" },
                    { 30, "", 11, "", null, "Fallaway slip pivot", "https://www.youtube.com/watch?v=ekJYIwbRnY8" },
                    { 31, "", 11, "", null, "Spin turn", "https://www.youtube.com/watch?v=lATiYxXO4fk" },
                    { 32, "", 11, "", null, "Closed impetus", "https://www.youtube.com/watch?v=3RuK2kpTsP0" },
                    { 33, "", 11, "", null, "Contra check", "https://www.youtube.com/watch?v=bo1iO6HlQCI" },
                    { 34, "", 11, "", null, "Shadow position", "https://www.youtube.com/watch?v=sr20mLAV6Ec" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_DancePatterns_DanceId",
                table: "DancePatterns",
                column: "DanceId");

            migrationBuilder.CreateIndex(
                name: "IX_DancePatternVariations_OriginalId",
                table: "DancePatternVariations",
                column: "OriginalId");

            migrationBuilder.CreateIndex(
                name: "IX_DancePatternVariations_VariationId",
                table: "DancePatternVariations",
                column: "VariationId");

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
