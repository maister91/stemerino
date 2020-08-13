import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { Poll } from '../_models/poll';
import { Option } from '../_models/option';
import { Vakjes } from '../_models/vakjes';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`https://localhost:44361/api/gebruikers`);
    }

    getPollonID(id: number) {
        return this.http.get<Poll[]>(`https://localhost:44361/api/polls/${id}`);
    }
    updateMember(pollsID: number, member: Option) {
        return this.http.put<Option>("https://localhost:44361/api/options/" + pollsID, member);
        }
    register(user: User) {
        return this.http.post<User>(`https://localhost:44361/api/gebruikers/`, user);
    }

    delete(id: number) {
        return this.http.delete(`https://localhost:44361/api/gerbuikers/${id}`);
    }
}
