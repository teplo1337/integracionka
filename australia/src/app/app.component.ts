import { Component, OnInit } from '@angular/core';
import { LocationsService } from './locations.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { State } from './state';
import { City } from './city';
import { Location } from './location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  location: Location;
  states: State [];
  state: State;
  cities: City [];
  city: City;
  constructor (private service: LocationsService,  private route: ActivatedRoute) {}

  ngOnInit () {
    this.city = new City;
    this.location = new Location;
    this.state = new State;
    const data = {};

    this.route.queryParams.subscribe((params: Params) => {
      if (params['city_id']) {
        this.city.city_id = params['city_id'];
        this.state.state_data = [];
        this.state.state_data[0] = this.city;
        data['city_id'] = this.city.city_id;
      }
      if (params['state_id']) {
        this.state.state_id = params['state_id'];
        this.location.data = [];
        this.location.data[0] = this.state;
        data['state_id'] = this.state.state_id;
      }

      this.getData(data);
    });
  }

  getData (data) {
    this.service.getLocation(data).subscribe(
      (result: any) => {
        this.location.data = result;
        this.checklocationStatus(this.location);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  checklocationStatus (location) {
    /* If state checked */
    if (this.location.data && this.location.data.length === 1) {
      this.state = this.location.data[0];
    } else {
      this.states = this.location.data;
    }
    /* If city checked */
    if (this.state.state_data && this.state.state_data.length === 1) {
      this.city = this.state.state_data[0];
    } else {
      this.cities = this.state.state_data;
    }

    console.log(this.state)
    console.log(this.city)
  }
}
