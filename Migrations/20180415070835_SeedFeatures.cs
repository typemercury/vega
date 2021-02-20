using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace vega.Migrations
{
    public partial class SeedFeatures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Features (Name, Color) VALUES ('Feature1', 'red')");
            migrationBuilder.Sql("INSERT INTO Features (Name, Color) VALUES ('Feature2', 'black')");
            migrationBuilder.Sql("INSERT INTO Features (Name, Color) VALUES ('Feature3', 'silver')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Features WHERE Name IN ('Feature1', 'Feature2', 'Feature3')");
        }
    }
}
