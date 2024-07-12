using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dataprovider.Migrations
{
    /// <inheritdoc />
    public partial class AddedVariationSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "DancePatternVariations",
                columns: new[] { "DancePatternVariationId", "DancePatternId", "VariationPatternId" },
                values: new object[] { 1, 1, 2 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "DancePatternVariations",
                keyColumn: "DancePatternVariationId",
                keyValue: 1);
        }
    }
}
