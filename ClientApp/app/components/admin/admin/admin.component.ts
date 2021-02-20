import { Component, OnInit } from '@angular/core';

@Component({
  // template:  '<h1>Admin</h1>'
  template:  `<h1>Admin</h1>
  <chart type="pie" [data]="data"></chart>`
  // selector: 'app-admin',
  // templateUrl: './admin.component.html',
  // styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  data = {
    labels: ["TESLA", "BENZ", "FERRARI", "PORSCHE"],
    datasets: [{
      data: [5,3,1,6],
      backgroundColor: [
        "#ff6384",
        "#36a2eb",
        "#ffce56",
        "#00ff00"
      ]
    }]
  };
 
  constructor() { }

  ngOnInit() {
  }

}
