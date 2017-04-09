import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  private redColor = 0;
  private greenColor = 0;
  private blueColor = 0;
  

  constructor(public navCtrl: NavController, private bt: BluetoothSerial) {

    this.bt.list().then(res => {

            console.log(res);
            this.bt.connect('20:16:07:14:26:33').subscribe(res => {
              console.log('Connection OK');
              console.log(res);
            }, error => { 
              console.log(error);
            });


        }).catch(res => {
            console.log(res);
        });
  }

  read () {
    this.bt.read().then(res => {
          console.log('read');
          console.log(res);
        });
  }

  colorChange () {
      this.bt.write('R' + this.pad(this.redColor, 3) + 'G' + this.pad(this.greenColor, 3) + 'B' + this.pad(this.blueColor, 3));
  }

  pad(num, size) {
      var s = "000000000" + num;
      return s.substr(s.length-size);
  }
}
