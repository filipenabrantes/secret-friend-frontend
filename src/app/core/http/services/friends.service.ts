import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecretFriendApi } from '../endpoints/secret-friend.api';

@Injectable({
  providedIn: 'root'
})
export class FriendsService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getFriends(): Observable<any> {
    this.setHeader();
    return this.http.get(SecretFriendApi.getFriends(), { headers: this.headers })
  }

  newFriend(body): Observable<any> {
    this.setHeader();
    return this.http.post(SecretFriendApi.postNewFriend(), body, { headers: this.headers })
  }

  editFriends(id: string, body): Observable<any> {
    this.setHeader();
    return this.http.put(SecretFriendApi.putEditFriend(id), body, { headers: this.headers })
  }

  drawFriends(): Observable<any> {
    this.setHeader();
    return this.http.post(SecretFriendApi.postDrawFriend(), {}, { headers: this.headers })
  }

  deleteFriend(id: string): Observable<any> {
    this.setHeader();
    return this.http.delete(SecretFriendApi.deleteFriend(id), { headers: this.headers })
  }
}
