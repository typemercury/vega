import { AuthService } from './../../services/auth.service';
import { KeyValuePair, Vehicle } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;

  queryResult: any = {};
  makes: KeyValuePair[] = [];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    {title: 'Id'},
    {title: 'Contact Name', key: 'contacName', isSortable: true},
    {title: 'Make', key: 'make', isSortable: true},
    {title: 'Model', key: 'model', isSortable: true},
    { }
  ];
   
  constructor(private vehicleService: VehicleService, private auth: AuthService) { 
    auth.handleAuthentication("vehiclelist");
  }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();

  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe(result => {
        this.queryResult = result
        console.log(this.queryResult);
      });
  }

  onFilterChange() {
    console.log("filter");
    this.query.page = 1;
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicles();
  }

  sortBy(columnName: string)   {
     if (this.query.sortBy === columnName) {
       this.query.isSortAscending = !this.query.isSortAscending;
     } else {
       this.query.sortBy = columnName ;
       this.query.isSortAscending = true;
     }
     this.populateVehicles();
  }

  onPageChange(page: any) {
    this.query.page = page; 
    this.populateVehicles();
  }

}
