using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dataprovider.Migrations
{
    /// <inheritdoc />
    public partial class AddedVideoAndImageSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "DancePatternId",
                keyValue: 3,
                columns: new[] { "Name", "VideoUrl" },
                values: new object[] { "Box step", "https://www.youtube.com/watch?v=JMdAFjjxus8" });

            migrationBuilder.InsertData(
                table: "DancePatterns",
                columns: new[] { "DancePatternId", "Aliases", "DanceId", "Description", "ImageUrl", "Name", "VideoUrl" },
                values: new object[] { 4, "", 2, "Simple twinkle", "https://www.ballroomdancers.com/dances/awa/twinkle.jpg", "Twinkle", "https://www.youtube.com/watch?v=ieXU4xp-1aY" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "DancePatterns",
                keyColumn: "DancePatternId",
                keyValue: 4);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "DancePatternId",
                keyValue: 3,
                columns: new[] { "Name", "VideoUrl" },
                values: new object[] { "Basic step", null });
        }
    }
}
