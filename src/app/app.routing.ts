import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { CastVoteComponent } from './cast-vote/cast-vote.component';
import { ResultsComponent } from './my-polls/results/results.component';
import { MyPollsComponent } from './my-polls/my-polls.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path : 'lists', component: CreatePollComponent},
    {path: 'vote', component: CastVoteComponent},
    {path: 'results', component: ResultsComponent},
    {path: 'mylists', component: MyPollsComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
