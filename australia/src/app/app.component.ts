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
  selectedState: State;
  cities: City [];
  selectedCity: City;
  constructor (private service: LocationsService,  private route: ActivatedRoute) {}

  ngOnInit () {
    this.location = new Location;
    const data = {};

    this.route.queryParams.subscribe((params: Params) => {
      if (params['city_id']) {
        this.selectedCity = new City;
        this.selectedCity.city_id = params['city_id'];
        data['city_id'] = this.selectedCity.city_id;
      }
      if (params['state_id']) {
        this.selectedState = new State;
        this.selectedState.state_id = params['state_id'];
        data['state_id'] = this.selectedState.state_id;
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
    console.log(location)
    /* If state checked */
    if (this.location.data && this.location.data.length === 1) {
      this.selectedState = new State;
      this.selectedState = this.location.data[0];
      this.states = this.location.data;
      this.cities = this.selectedState.state_data;
    } else {
      this.states = this.location.data;
    }
    /* If city checked */
    if (this.selectedState) {
      if (this.selectedState.state_data && this.selectedState.state_data.length === 1) {
        this.selectedCity = new City;
        this.selectedCity = this.selectedState.state_data[0];
        this.cities = this.selectedState.state_data;
      }
    } else if(this.selectedState) {
      this.cities = this.selectedState.state_data;
    }
  }

  selectState (state) {
    this.selectedState = state;
    this.getData({'state_id' : state.state_id});
  }

  selectCity (city) {
    this.selectedCity = city;
  }

  unselectCity () {
    this.selectedCity = void 0;
  }

  unselectState () {
    this.cities = [];
    this.selectedState = void 0;
    this.getData({});
  }
}
