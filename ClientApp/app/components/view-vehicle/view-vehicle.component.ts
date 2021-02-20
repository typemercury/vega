import { AuthService } from './../../services/auth.service';
import { ProgressService, BrowserXhrWithProgress } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service';
import { VehicleService } from './../../services/vehicle.service';
import { ToastyService } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild, NgZone, ErrorHandler } from '@angular/core';
import { BrowserXhr } from '@angular/http';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css'],
  providers: [
    { provide: BrowserXhr, useClass: BrowserXhrWithProgress},
    ProgressService
  ]
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  vehicle: any;
  vehicleId: number = 0;
  photos: any[] = [];
  progress: any;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private progressService: ProgressService,
    private toasty: ToastyService,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private auth: AuthService) { 

      route.params.subscribe(p => {
        this.vehicleId = +p['id'];
        if (isNaN(this.vehicleId) || this.vehicleId <= 0){
          router.navigate(['/vehicles']);
          return;
        }
      })
    }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId)
      .subscribe(p => {
        this.photos = p;
        console.log(this.photos);
      });

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe( x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto() {    

    this.progressService.startTracking()
      .subscribe(progress => {
        this.zone.run(() => {
          this.progress = progress;
        });
      },
      err => {},
      () => {this.progress = null;}
    );

    var nativeElement:HTMLInputElement = this.fileInput.nativeElement;
    if (nativeElement.files != null) {
        var file = nativeElement.files[0];
        nativeElement.value = '';
        this.photoService.upload(this.vehicleId, file)
          .subscribe(p => {
            this.photos.push(p);
          },
          err => {
            this.toasty.error({  
              title: 'Error',
              msg: err.text(),
              theme: 'bootstrap',
              showClose: true,
              timeout: 5000
            });
          });
    }    
  }


}
