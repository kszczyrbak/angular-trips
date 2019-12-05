import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Trip, Currency } from '../models/trip.model';
import { trips } from 'src/assets/fake-dane';

@Injectable({
  providedIn: 'root'
})
export class InMemoryTripService implements InMemoryDbService {

  constructor() { }

  createDb() {
    return {
      trips: trips
    };
  }
}
