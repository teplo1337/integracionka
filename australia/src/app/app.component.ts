import { Component, OnInit } from '@angular/core';
import { LocationsService } from './locations.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { State } from './state';
import { City } from './city';
import { MyLocation } from './location';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myLocation: MyLocation;
  states: State [];
  selectedState: State;
  cities: City [];
  selectedCity: City;
  constructor (private location: Location, private service: LocationsService,  private router: Router, private route: ActivatedRoute) {}

  ngOnInit () {
    this.myLocation = new MyLocation;
    const data = {};

    this.route.queryParams.subscribe((params: Params) => {
      if (params['city_id']) {
        data['city_id'] = params['city_id'];
      }
      if (params['state_id']) {
        data['state_id'] = params['state_id'];
      }
      this.getData(data);
    });
  }

  getData (data) {
    console.log(data)
    this.service.getLocation(data).subscribe(
      (result: any) => {
        this.myLocation.data = result;
        this.checklocationStatus(this.myLocation);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  checklocationStatus (location) {
    /* If state checked */
    if (this.myLocation.data && this.myLocation.data.length === 1) {
      this.selectedState = new State;
      this.selectedState = this.myLocation.data[0];
      this.states = this.myLocation.data;
      this.cities = this.selectedState.state_data;
    } else {
      this.states = this.myLocation.data;
    }
    /* If city checked */
    if (this.selectedState) {
      if (this.selectedState.state_data && this.selectedState.state_data.length === 1) {
        this.selectedCity = new City;
        this.selectedCity = this.selectedState.state_data[0];
        this.cities = this.selectedState.state_data;
      }
    } else if (this.selectedState) {
      this.cities = this.selectedState.state_data;
    }
  }

  selectState (state) {
    this.location.replaceState('', 'state_id=' + state.state_id);
    this.selectedState = state;
    this.getData({'state_id' : state.state_id});
  }

  selectCity (city) {
    this.location.replaceState('', 'state_id=' + this.selectedState.state_id + 'city_id=' + city.city_id);
    this.selectedCity = city;
  }

  unselectCity () {
    this.location.replaceState('', 'state_id=' + this.selectedState.state_id);
    this.selectedCity = void 0;
  }

  unselectState () {
    this.location.replaceState('', '');
    this.cities = [];
    this.selectedCity = void 0;
    this.selectedState = void 0;
    this.getData({});
  }
}
