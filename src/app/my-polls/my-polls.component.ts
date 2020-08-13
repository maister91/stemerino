import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiserviceService} from '../_services/apiservice.service';
import { first } from 'rxjs/operators';
import { Poll } from '../_models/poll';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.component.html',
  styleUrls: ['./my-polls.component.css']
})
export class MyPollsComponent implements OnInit {
  items: Poll;
  constructor(private apiService: ApiserviceService,
              private router: Router) {
  }

  ngOnInit() {
    this.apiService.getAllPolls().pipe(first())
    .subscribe(result => this.items = result);
  }

  showResults(id) {
    this.router.navigate(['results'], {state: {data: {id}}}); }
    showVotes(id) {
      this.router.navigate(['vote'], {state: {data: {id}}}); }
}
