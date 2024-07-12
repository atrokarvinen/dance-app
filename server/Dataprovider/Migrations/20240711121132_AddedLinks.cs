using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dataprovider.Migrations
{
    /// <inheritdoc />
    public partial class AddedLinks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DancePatternDancePattern");

            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "FavoritePatterns",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Aliases",
                table: "DancePatterns",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "DancePatternId",
                keyValue: 1,
                column: "Aliases",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "DancePatternId",
                keyValue: 2,
                column: "Aliases",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "DancePatternId",
                keyValue: 3,
                column: "Aliases",
                value: "");

            migrationBuilder.UpdateData(
                table: "FavoritePatterns",
                keyColumn: "FavoritePatternId",
                keyValue: 1,
                column: "DisplayName",
                value: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "FavoritePatterns");

            migrationBuilder.DropColumn(
                name: "Aliases",
                table: "DancePatterns");

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

            migrationBuilder.CreateIndex(
                name: "IX_DancePatternDancePattern_VariationsDancePatternId",
                table: "DancePatternDancePattern",
                column: "VariationsDancePatternId");
        }
    }
}
