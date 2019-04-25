import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeviciService } from '../sevici.service';

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.page.html',
  styleUrls: ['./station-details.page.scss'],
})
export class StationDetailsPage implements OnInit, OnDestroy {

  private serviciStationsRef: Subscription = null;

  station: any;

  constructor(private activatedRoute: ActivatedRoute,
    public sevici: SeviciService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.serviciStationsRef = this.sevici.seviciStations$.subscribe(res => {
      if (res) {
        this.station = res.network.stations.find(station => {
          if (station.id == id) {
            return true;
          } else {
            return false;
          }
        });
        // this.station.free_bikes = this.station.free_bikes.toString();
        // this.station.empty_slots = this.station.empty_slots.toString();
      }
    })
  }

  ngOnDestroy(): void {
    this.serviciStationsRef.unsubscribe();
  }

}
