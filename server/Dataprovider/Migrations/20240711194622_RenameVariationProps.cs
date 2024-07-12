using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dataprovider.Migrations
{
    /// <inheritdoc />
    public partial class RenameVariationProps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DancePatternVariations_DancePatterns_DancePatternId",
                table: "DancePatternVariations");

            migrationBuilder.DropForeignKey(
                name: "FK_DancePatternVariations_DancePatterns_VariationPatternId",
                table: "DancePatternVariations");

            migrationBuilder.RenameColumn(
                name: "VariationPatternId",
                table: "DancePatternVariations",
                newName: "VariationId");

            migrationBuilder.RenameColumn(
                name: "DancePatternId",
                table: "DancePatternVariations",
                newName: "OriginalId");

            migrationBuilder.RenameIndex(
                name: "IX_DancePatternVariations_VariationPatternId",
                table: "DancePatternVariations",
                newName: "IX_DancePatternVariations_VariationId");

            migrationBuilder.RenameIndex(
                name: "IX_DancePatternVariations_DancePatternId",
                table: "DancePatternVariations",
                newName: "IX_DancePatternVariations_OriginalId");

            migrationBuilder.AddForeignKey(
                name: "FK_DancePatternVariations_DancePatterns_OriginalId",
                table: "DancePatternVariations",
                column: "OriginalId",
                principalTable: "DancePatterns",
                principalColumn: "DancePatternId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DancePatternVariations_DancePatterns_VariationId",
                table: "DancePatternVariations",
                column: "VariationId",
                principalTable: "DancePatterns",
                principalColumn: "DancePatternId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DancePatternVariations_DancePatterns_OriginalId",
                table: "DancePatternVariations");

            migrationBuilder.DropForeignKey(
                name: "FK_DancePatternVariations_DancePatterns_VariationId",
                table: "DancePatternVariations");

            migrationBuilder.RenameColumn(
                name: "VariationId",
                table: "DancePatternVariations",
                newName: "VariationPatternId");

            migrationBuilder.RenameColumn(
                name: "OriginalId",
                table: "DancePatternVariations",
                newName: "DancePatternId");

            migrationBuilder.RenameIndex(
                name: "IX_DancePatternVariations_VariationId",
                table: "DancePatternVariations",
                newName: "IX_DancePatternVariations_VariationPatternId");

            migrationBuilder.RenameIndex(
                name: "IX_DancePatternVariations_OriginalId",
                table: "DancePatternVariations",
                newName: "IX_DancePatternVariations_DancePatternId");

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
    }
}
