import { SaveVehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class VehicleService {

  private readonly apiEndpoint = 'http://localhost:5000/api'
  private readonly vehiclesEndpoint = this.apiEndpoint + '/vehicles'

  constructor(private http:Http, private authHttp:AuthHttp) { }

  getMakes() {
    //console.log(`[httpGet] ${this.apiEndpoint}/makes`);
    return this.http.get(`${this.apiEndpoint}/makes`)
      .map(res => res.json());
  }

  getFeatures() {
    //console.log(`[httpGet] ${this.apiEndpoint}/features`);
    return this.http.get(`${this.apiEndpoint}/features`)
      .map(res => res.json());
  }

  getVehicle(id: any) {
    //console.log(`[httpGet] ${this.apiEndpoint}/vehicles/${id}`);
    return this.http.get(this.vehiclesEndpoint + '/' + id)
      .map(res => res.json());    
  }

  getVehicles(filter: any) {
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter))
      .map(res => res.json());
  }

  create(vehicle: any) { 
    //authhttp會找local storage裡面的token
    return this.authHttp.post(this.vehiclesEndpoint, vehicle)
      .map(res => res.json());
  }

  update(vehicle: SaveVehicle) {
    return this.authHttp.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle)
      .map(res => res.json());
  }

  delete(id: any) { 
    return this.authHttp.delete(this.vehiclesEndpoint + '/' + id)
      .map(res => res.json());
  }

  private toQueryString(obj: any) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value)); 
      }
    }
    return parts.join('&');
  }

}
