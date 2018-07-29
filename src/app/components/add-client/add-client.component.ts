import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

import { Client } from '../../models/client';
import { SettingsService } from '../../services/settings.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnAdd: boolean;

  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private settingService: SettingsService,
    private router: Router) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }){
    console.log(value,valid);
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }
    if(!valid){
      //show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout:5000
      });

    } else {
      //add new client
      this.clientService.newClient(value);
      //show message
      this.flashMessage.show('New client addedd successfully.', {
        cssClass: 'alert-success', timeout:5000
      });
      //redirect to dashbpoard
      this.router.navigate(['/']);
    }

  }

}
