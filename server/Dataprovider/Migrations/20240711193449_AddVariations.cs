using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dataprovider.Migrations
{
    /// <inheritdoc />
    public partial class AddVariations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DancePatternId",
                table: "DancePatternVariations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "VariationPatternId",
                table: "DancePatternVariations",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DancePatternVariations_DancePatternId",
                table: "DancePatternVariations",
                column: "DancePatternId");

            migrationBuilder.CreateIndex(
                name: "IX_DancePatternVariations_VariationPatternId",
                table: "DancePatternVariations",
                column: "VariationPatternId");

            migrationBuilder.AddForeignKey(
                name: "FK_DancePatternVariations_DancePatterns_DancePatternId",
                table: "DancePatternVariations",
                column: "DancePatternId",
                principalTable: "DancePatterns",
                principalColumn: "DancePatternId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DancePatternVariations_DancePatterns_VariationPatternId",
                table: "DancePatternVariations",
                column: "VariationPatternId",
                principalTable: "DancePatterns",
                principalColumn: "DancePatternId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DancePatternVariations_DancePatterns_DancePatternId",
                table: "DancePatternVariations");

            migrationBuilder.DropForeignKey(
                name: "FK_DancePatternVariations_DancePatterns_VariationPatternId",
                table: "DancePatternVariations");

            migrationBuilder.DropIndex(
                name: "IX_DancePatternVariations_DancePatternId",
                table: "DancePatternVariations");

            migrationBuilder.DropIndex(
                name: "IX_DancePatternVariations_VariationPatternId",
                table: "DancePatternVariations");

            migrationBuilder.DropColumn(
                name: "DancePatternId",
                table: "DancePatternVariations");

            migrationBuilder.DropColumn(
                name: "VariationPatternId",
                table: "DancePatternVariations");
        }
    }
}
