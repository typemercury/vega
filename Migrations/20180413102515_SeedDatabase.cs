using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace vega.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('TESLA')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('FERRARI')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('PORSCHE')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('BENZ')");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('ModelS', (SELECT ID FROM Makes WHERE Name = 'TESLA'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('ModelX', (SELECT ID FROM Makes WHERE Name = 'TESLA'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Model3', (SELECT ID FROM Makes WHERE Name = 'TESLA'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('812SUPERFAST', (SELECT ID FROM Makes WHERE Name = 'FERRARI'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('488GTB', (SELECT ID FROM Makes WHERE Name = 'FERRARI'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('LaFerrari Aperta', (SELECT ID FROM Makes WHERE Name = 'FERRARI'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('718Cayman', (SELECT ID FROM Makes WHERE Name = 'PORSCHE'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('911Carrera', (SELECT ID FROM Makes WHERE Name = 'PORSCHE'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('Panamera', (SELECT ID FROM Makes WHERE Name = 'PORSCHE'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('SL', (SELECT ID FROM Makes WHERE Name = 'BENZ'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('SLC', (SELECT ID FROM Makes WHERE Name = 'BENZ'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES ('SMG GT', (SELECT ID FROM Makes WHERE Name = 'BENZ'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
             migrationBuilder.Sql("DELETE FROM Makes WHERE Name IN ('TESLA', 'FERRARI', 'PORSCHE', 'BENZ')");
        }
    }
}
