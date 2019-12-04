import { Component ,OnInit } from '@angular/core';
import { ApicallService } from './apicall.service';
import { core } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spacex';
  public formData = null;
  public alldata = [];
  public origialData = [];

  constructor(private apiSpacex: ApicallService) {
    this.formData = {
      "ls": false,
      "reused": false,
      "wr": false
    }
  }

  ngOnInit(): void {

    this.apiSpacex.getSpacexData().subscribe(spacexData => {
      this.alldata = spacexData;
      this.origialData = spacexData;
      console.log(this.alldata)
    });
    
  }

  public reloadData() {
    window.location.reload();
  };

  public applyFilter(type: string, $event) {

    if (this.formData[type] == true) {
      $event.srcElement.checked = false;
      this.formData[type] = false;
    } else {
      this.formData[type] = $event.srcElement.checked;
      for (var key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          if (key != type) {
            this.formData[key] = false;
          }
        }
      }
    }
    let currentData = [];
    this.origialData.forEach(data => {
      let { rocket, launch_success, flight_number, links } = data;
      let { fairings } = rocket;
      let reused = null;
      if (fairings != null) {
        reused = fairings['reused'];
      }
      if (this.formData.reused) {
        if ((reused != null && reused == true))
          currentData.push(data);
      }
      if (this.formData.ls) {
        if (launch_success == true)
          currentData.push(data);
      }

      if (this.formData.wr) {
        let { reddit_campaign, reddit_launch, reddit_media, reddit_recovery } = links;
        if (reddit_campaign != null || reddit_launch != null || reddit_media != null || reddit_recovery != null) {
          currentData.push(data);
        }
      }
    });
    if (currentData.length == 0) {
      this.alldata = this.origialData;
    } else {
      this.alldata = currentData;
    }
  }
}
