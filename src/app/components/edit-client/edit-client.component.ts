import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/client';
import { SettingsService } from '../../services/settings.service';
//import { FlashMessagesModule } from 'angular2-flash-messages/module/module';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: String;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnEdit: boolean;

  constructor(private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private settingService: SettingsService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingService.getSettings().disableBalanceOnEdit;
    //get id from URL
    this.id = this.route.snapshot.params['id'];
    //get client
    this.clientService.getClient(this.id).subscribe(client => this.client = client);
      console.log(this.client);
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }){
    if (!valid){
      this.flashMessage.show('please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 5000 });
    } else {
      //add id to client
      value.id = this.id;
      //update client
      this.clientService.updateClient(value);
      this.flashMessage.show('client updated', {
        cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['client/'+this.id]);
    }
   }
}
