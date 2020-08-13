import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiserviceService } from '../_services/apiservice.service';
import { UserService } from '../_services/user.service';
import { Poll } from '../_models/poll';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Option } from '../_models/option';
import { Vakjes } from '../_models/vakjes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.css'],
})
export class CastVoteComponent implements OnInit {
  private pollId = '';
  id: 0;
  vote: Boolean[] = [];
  polls: Poll;
  // private router: Router
  private router: Router;
  options: Option;

  poll = { count: 0, topic: '', options: [] };
  alreadyVoted: Boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fireBaseReq: ApiserviceService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.activatedRoute.params.subscribe((value: Params) => {
    // this.pollId = value['id'];
    // if (!window.localStorage.getItem(this.pollId) || window.localStorage.getItem(this.pollId) === 'false') {
    // 	console.log('not casted yet');
    // 	console.log(this.pollId);
    this.loadAllUsers();

    // 	window.localStorage.setItem(this.pollId, 'false');
    // } else if (window.localStorage.getItem(this.pollId) === 'true') {
    // 	this.alreadyVoted = true;
    // }
    // });
  }
  private loadAllUsers() {
    this.polls =  history.state.data.id;
  }
  public giveValue(pollValue) {
    this.poll = pollValue;
    for (let i = 0; i < pollValue; i++) {
      let option = new Vakjes();
      option.pollID = pollValue.pollID;
      option.choice = this.options[i].choice;
      option.votes = this.options[i].votes;
    }
  }

  public castVote(index, pollsoptions) {
    this.options = pollsoptions;
    this.vote = this.vote.map(() => {
      return false;
    });
    this.vote[index] = true;
  }

  public updateVote(list: Option) {
    let option = new Option();
    option = this.options;
    this.userService
      .updateMember(list.optionID, list)
      .subscribe((result) => (result));
    // this.router.navigate(['/routepath']);
    this.alreadyVoted = false;
  }
}
