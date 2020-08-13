import { Component, isDevMode, OnInit, EventEmitter, Output } from '@angular/core';
import {Poll} from '../_models/poll';
import {Option} from '../_models/option';
import {Vakjes} from '../_models/vakjes';
import {ApiserviceService} from '../_services/apiservice.service';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
name = '';
topic = '';
shareAbleLink = '';
// tslint:disable-next-line: ban-types
linkGenerated: Boolean = false;
options: {choice: string, votes: number, imgpath: string}[] =  [];
vakjes: Vakjes;
// tslint:disable-next-line: ban-types
editOptions: Boolean = false;
poll: Poll;
// tslint:disable-next-line: ban-types
topicAdded: Boolean = false;
choice = '';
pollId: Poll;
public progress: number;
public message: string;
public response: {'fullPath': ''};

// tslint:disable-next-line: no-output-on-prefix
@Output() public onUploadFinished = new EventEmitter();

   /**
   *to keep track of option being added
   *
   // tslint:disable-next-line: jsdoc-format
   * @type {string}
   * @memberof CreatePollComponent
   *
   */
  constructor(
    private apiservice: ApiserviceService,
    private http: HttpClient,
  ) { }

  ngOnInit() {}
  upload(files) {
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();

    for (let file of files) {
      formData.append(file.name, file);
    }
    const uploadReq = new HttpRequest('POST', `https://localhost:44361/api/options/uploadfile`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event.type === HttpEventType.Response) {
        this.message = 'Upload succesfull';
        console.log(event.body);
 }
    });
  }
  public createList() {
    const poll = new Poll();
    poll.topic = this.topic;
    poll.count = 0;
    this.apiservice.addPoll(poll).subscribe(result => {
      this.pollId = result, this.createPoll(result);
      }
      );


  }
  public createPoll(pollID) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.options.length; i++) {
      const option = new Vakjes();
      option.pollID = pollID.pollID;
      option.choice = this.options[i].choice;
      option.votes = this.options[i].votes;
      option.imgpath = this.options[i].imgpath;
      this.apiservice.addOptions(option).subscribe();
    }
  }

  createOption(numberofOptions): void {
    console.log(numberofOptions);
    for (let i = 0; i < numberofOptions; ++i) {
      this.options.push({choice: this.choice, votes: 0, imgpath: ''});
    }
  }
  createShareableLink(key) {
    if (isDevMode()) {
      this.shareAbleLink =
          'http://' + window.location.host + '/castvote/' + key;
    } else {
      this.shareAbleLink =
          'https://' + window.location.host + '/castvote/' + key;
    }
  }
}
