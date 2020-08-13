import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiserviceService } from '../../_services/apiservice.service';
import { Poll } from '../../_models/poll';
import { Option } from '../../_models/option';
import { Chart } from 'chart.js';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
selector: 'app-results',
templateUrl: './results.component.html',
styleUrls: ['./results.component.css']
})

export class ResultsComponent implements  OnInit {
chart: Chart;
cardTitle: 'Doughnut Chart' | 'Bar Chart' = 'Doughnut Chart';
canvas: any = {};
ctx: any;
toggleDoughnut: Boolean = true;
toggleBar: Boolean = false;
sharedLink: String = '';
btnTitle: 'Doughnut Chart' | 'Bar Chart' = 'Bar Chart';
private pollId = '';
id: 0;
labels: string[] = [];
votes : number[] = [];
vote: Boolean[] = [];
member: Poll[];	// private router: Router
polls: Poll ;
options: Option;
poll: {
topic: string,
count: number,
options: {choice: string, votes: number, imgpath: string}[],
votes: number[]
}
 = { count: 0, topic: '', options: [{choice: "", votes: 0, imgpath:""}], votes: [] };
alreadyVoted: Boolean = false;
constructor(private sanitizer: DomSanitizer) { }

ngOnInit() {
  this.canvas = document.getElementById('canvas');
  console.log(this.canvas);
  this.ctx = this.canvas.getContext('2d');
  this.loadAllUsers();
}

public createImgPath = (serverPath: string) => {
  return this.sanitizer.bypassSecurityTrustUrl(serverPath);
}

private loadAllUsers() {
this.poll = history.state.data.id;
if (this.poll.options) {
  this.poll.options.forEach((element) => {
    this.labels.push(element.choice);
    this.votes.push(element.votes);
});
  this.plotGraph();
}}
/**
   * A function to toggle charts
   *
   * @memberof ResultsComponent
   */
public toggleCharts() {
  this.toggleDoughnut = !this.toggleDoughnut;
  this.toggleBar = !this.toggleBar;
  /*-------------Logic to toggle card title----------------------*/
  this.cardTitle = this.toggleDoughnut ? 'Doughnut Chart' : 'Bar Chart';
  this.btnTitle = this.toggleDoughnut ? 'Bar Chart' : 'Doughnut Chart';
  this.plotGraph();
}

/**
 * A function to plot graph
 *
 * @private
 * @memberof ResultsComponent
 */
private plotGraph() {
  this.chart = new Chart(this.ctx, {
    type: (this.toggleDoughnut ? 'doughnut' : 'bar'),
    data: {
      labels: this.labels,
      datasets: [{
        label: '# of Votes',
        data: this.votes,
        backgroundColor: [
          'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: { position: (this.toggleDoughnut ? 'right' : 'top') },
      responsive: true,
      layout: { padding: { left: 20, right: 10, top: 25, bottom: 1 } }
    }
  });
}
onShare() {
  window.location.assign('https://wa.me/?text=I\'SharingWithFriends');
}
}

