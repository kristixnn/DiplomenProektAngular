import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,private db:AngularFireDatabase) { }

  apiurl='https://diplomenproektcard-default-rtdb.europe-west1.firebasedatabase.app/user';
  
  RegisterUser(id:string|null|undefined,inputdata:any){
    inputdata.balance=0;
    return this.db.object(`/user/${inputdata.id}`).set({
      balance: inputdata.balance,
      email: inputdata.email,
      gender: inputdata.gender,
      isactive: inputdata.isactive,
      name: inputdata.name,
      password:inputdata.password,
      role: inputdata.role,      
    });
  }

  Getall(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiurl}.json`);
  }

  checkUserExists(username: string, email: string) {
    return this.http.get(`${this.apiurl}/${username}.json`);
  }

  getUsersIdForExpenses(){
    return sessionStorage.getItem('username');
  }

  GetUserbyCode(id: any) {
    return this.db.object(`/user/${id}`).valueChanges().pipe(
      map(userData => ({ id, ...userData as object}))
    );
  }
  
  GetUserbyUsername(username: any): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/${username}.json`)
      .pipe(map(userData => ({ id: username, ...userData })));
  }
 
  getUserIdForHome() : Observable<any>{
    const userId = sessionStorage.getItem('username');
    return of(userId)
  }

  updateuser(id:any,inputdata:any){
    return this.http.put(`${this.apiurl}/${id}.json`, inputdata);
  }

  getuserrole(){
    return this.http.get(`${this.apiurl}/role.json`);
  }
  
  isloggedin(){
  let isLoggedIn = sessionStorage.getItem('username') != null;
  return of(isLoggedIn); // Wrap the boolean value in an Observable using 'of'
  }

  getrole(){
  let role = sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
  return of(role); // Wrap the string value in an Observable using 'of'
  }
}
