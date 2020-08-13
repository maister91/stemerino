import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  file = '';

  constructor() {
   }
    onFileChanged(event) {
      const file = event.target.files[0];
      this.sendName(file);
    }

    sendName(file) {
      this.file = file.name;
    }
    onUpload() {
  // this.http.post('my-backend.com/file-upload', uploadData, {
  //   reportProgress: true,
  //   observe: 'events'
  // })
    //   this.http.post('my-backend.com/file-upload', this.selectedFile)
    // .subscribe(...);
    }
  ngOnInit() {
  }

}
