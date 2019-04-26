import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { SeviciService } from '../sevici.service';
import { Subscription } from 'rxjs';
import Utils from '../Utils';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})


export class ListPage implements OnInit, OnDestroy {


  @ViewChild('searchbar') searchbar: any;

  private serviciStationsRef: Subscription = null;

  public stations = [];
  public stationsCopy = [];

  constructor(public sevici: SeviciService) {

  }

  ngOnInit() {
    this.serviciStationsRef = this.sevici.seviciStations$.subscribe(res => {
      if (res) {
        this.stations = res.network.stations;
        this.stationsCopy = res.network.stations;
      }
    })
  }

  ngOnDestroy(): void {
    this.serviciStationsRef.unsubscribe();
  }

  ionViewWillEnter() {
    if (this.searchbar.el.className.includes("searchbar-has-value")) {
      this.searchbar.setFocus();
    }
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
