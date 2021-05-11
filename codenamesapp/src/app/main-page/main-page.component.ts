import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConnectionKey } from '../models/connectionkey';
import { WebsocketHelperService } from '../services/websocket-helper.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  connectionKey: ConnectionKey = new ConnectionKey();
  validationForm: FormGroup;

  constructor(private webSocketHelperService: WebsocketHelperService) {
    this.validationForm = new FormGroup({
      key: new FormControl('Waiting for connection key...')
    });
   }

  ngOnInit(): void {
    this.webSocketHelperService.listenConnectionKey('connection key').subscribe((data) => {
      this.validationForm.controls['key'].setValue(data);    
    });
    
  }
}
