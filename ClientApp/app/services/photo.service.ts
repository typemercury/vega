import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {

  private readonly vehiclesEndpoint = 'http://localhost:5000/api/vehicles/';  

  constructor(private http:Http) { }

  upload(vehicleId:any, photo:any) {
    var formData = new FormData();
    formData.append('file', photo);
    return this.http.post(`${this.vehiclesEndpoint}${vehicleId}/photos`, formData)
            .map(res => res.json());
  }

  getPhotos(vehicleId: any) {   
    console.log(`[get photos]: ${this.vehiclesEndpoint}${vehicleId}/photos`); 
    return this.http.get(`${this.vehiclesEndpoint}${vehicleId}/photos`)
            .map(res => res.json());
  }
}


