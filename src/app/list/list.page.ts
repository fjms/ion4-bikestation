import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeviciService } from '../sevici.service';
import { Subscription } from 'rxjs';
import Utils from '../Utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit, OnDestroy {

  private serviciStationsRef: Subscription = null;

  protected stations = [];
  protected stationsCopy = [];

  constructor(public sevici: SeviciService, private router: Router) {

  }

  ngOnInit() {
    this.serviciStationsRef = this.sevici.seviciStations$.subscribe(res => {
      if (res) {
        console.log(res);
        this.stations = res.network.stations;
        this.stationsCopy = res.network.stations;
      }
    })
  }

  ngOnDestroy(): void {
    this.serviciStationsRef.unsubscribe();
  }

  doRefresh(event) {
    console.log('Volver a pedir estaciones');
    this.sevici.getEstaciones().then(() => {
      event.target.complete();
    }).catch((err) => {
      console.log(err);
      event.target.complete();
    })
  }

  resetStation() {
    this.stations = this.stationsCopy;
  }

  getStations(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.stations = this.stationsCopy.filter((station) => {
        let fullname = Utils.removeDiacritics(station.name);
        return (fullname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.resetStation()
    }
  }
}
