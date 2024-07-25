using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dataprovider.Migrations
{
    /// <inheritdoc />
    public partial class AddedDanceImageUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Dances",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "DancePatterns",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 3,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 4,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 5,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 6,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 7,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 8,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 9,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 10,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 11,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 12,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 13,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 14,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 15,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 16,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 17,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 18,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 19,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 20,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 21,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 22,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 23,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 24,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 25,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 26,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 27,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 28,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 29,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 30,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 31,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 32,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 33,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 34,
                column: "Description",
                value: null);

            migrationBuilder.UpdateData(
                table: "Dances",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Dances",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Dances",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Dances",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Dances",
                keyColumn: "Id",
                keyValue: 5,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Dances",
                keyColumn: "Id",
                keyValue: 6,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Dances",
                keyColumn: "Id",
                keyValue: 7,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Dances",
                keyColumn: "Id",
                keyValue: 8,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Dances",
                keyColumn: "Id",
                keyValue: 9,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Dances",
                keyColumn: "Id",
                keyValue: 10,
                column: "ImageUrl",
                value: null);

            migrationBuilder.UpdateData(
                table: "Dances",
                keyColumn: "Id",
                keyValue: 11,
                column: "ImageUrl",
                value: null);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Dances");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "DancePatterns",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 3,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 4,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 5,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 6,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 7,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 8,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 9,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 10,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 11,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 12,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 13,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 14,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 15,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 16,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 17,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 18,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 19,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 20,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 21,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 22,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 23,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 24,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 25,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 26,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 27,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 28,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 29,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 30,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 31,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 32,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 33,
                column: "Description",
                value: "");

            migrationBuilder.UpdateData(
                table: "DancePatterns",
                keyColumn: "Id",
                keyValue: 34,
                column: "Description",
                value: "");
        }
    }
}
