import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Poll } from '../_models/poll';
import { Option } from '../_models/option';
import { Vakjes } from '../_models/vakjes';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  public currentPoll: Observable<Poll>;
  constructor(private http: HttpClient) { }


  public addOptions(options){
    const option = new Vakjes;
    option.pollID = options.pollID;
    option.choice = options.choice;
    option.votes = options.votes;
    option.imgpath = options.imgpath;
    return this.http.post<Option>(`https://localhost:44361/api/options`, option);

    // let option = new Option;
    // option.choice = options[0].choice;
    // option.votes = options[0].votes;
    // console.log(option,"options");
    // return this.http.post<Option>(`https://localhost:44361/api/options`, option)


  }
  public addPoll(polls){
    return this.http.post<Poll>(`https://localhost:44361/api/polls`, polls);
  }

  public getAllPolls(){
    return this.http.get<Poll>('https://localhost:44361/api/polls');
  }

  getPollonID(id: number) {
    console.log(id);
    return this.http.get<Poll>(`https://localhost:44361/api/polls/${id}`);
}
}
