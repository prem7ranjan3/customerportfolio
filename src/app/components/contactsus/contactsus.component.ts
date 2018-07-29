import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-contactsus',
  templateUrl: './contactsus.component.html',
  styleUrls: ['./contactsus.component.css']
})
export class ContactsusComponent implements OnInit {

  title: string = 'Get In Touch';
  lat: number = 37.432439;
  lng: number = -121.8996;
  public origin: {}
  public destination: {}

  constructor(private agm: AgmCoreModule) { }

  ngOnInit() {
    this.getDirection()
  }

  getDirection() {
    this.origin = { lat: 24.799448, lng: 120.979021 }
    this.destination = { lat: 24.799524, lng: 120.975017 }
   
    // this.origin = 'Taipei Main Station'
    // this.destination = 'Taiwan Presidential Office'
  }

}
