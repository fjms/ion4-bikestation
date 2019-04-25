import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeviciService {

  private seviciStationsSource = new BehaviorSubject<any>(null);
  public seviciStations$: Observable<any> = this.seviciStationsSource.asObservable();

  constructor(private http: HttpClient) {
    this.getEstaciones();
  }

  private getSpainStation() {
    this.http.get("https://api.citybik.es/v2/networks/?fields=id,location").subscribe((res: any) => {
      let spainServices = res.networks.filter(element => {
        if (element.location.country == "ES") {
          return true;
        } else {
          return false;
        }
      });
      console.log(spainServices);
    })
  }

  public getEstaciones() {
    return new Promise((resolve, reject) => {
      this.http.get("https://api.citybik.es/v2/networks/sevici").subscribe((res: any) => {
        res.network.stations.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.seviciStationsSource.next(res);
        resolve(true);
      })
    })
  }
}
