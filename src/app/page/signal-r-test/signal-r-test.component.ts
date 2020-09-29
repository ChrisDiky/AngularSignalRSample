import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

import { BroadcastEventListener, SignalRConnection, ConnectionStatus } from 'ng2-signalr';

@Component({
  selector: 'app-signal-r-test',
  templateUrl: './signal-r-test.component.html',
  styleUrls: ['./signal-r-test.component.css']
})
export class SignalRTestComponent implements OnInit {
  connection: SignalRConnection;
  sID: string;
  systemTime: string;
  broadcast: string;

  constructor(private activatedRoute: ActivatedRoute) {

    this.connection = activatedRoute.snapshot.data['connection'];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.sID = params.get('sid').toString();
      this.StartSignalR();
    });
  }

  StartSignalR(): void {
    // Socket斷線5秒後自動重連
    this.connection.errors.subscribe(err => {
      console.log('Error while establishing connection... Retrying...');
      timer(5000).subscribe(() => {
        this.connection.start();
        this.connection.status.subscribe(x => {
          if (x.value === 1) {
            console.log('Reconnect...Work!');
            this.ConnectiSignalR();
          }
        });
      });
    });

    this.ConnectiSignalR();
  }

  // 連接SingalR
  ConnectiSignalR(): void {
    // 1.create a listener object
    const onSystemTime = new BroadcastEventListener<any>('systemTime');
    const onBroadcast = new BroadcastEventListener<any>('broadcast');

    // 2.register the listener
    this.connection.listen(onSystemTime);
    this.connection.listen(onBroadcast);

    // 3.subscribe for incoming messages

    onSystemTime.subscribe((res: any) => {
      this.systemTime = res;
    });

    onBroadcast.subscribe((res: any) => {
      this.broadcast = res;
    });

    const data = {
      sID: this.sID,
    };
    this.connection.invoke('Register', data).catch(err => {
      console.log('Error:' + err);
    });
  }

}
