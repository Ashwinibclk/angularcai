import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const baseUrl = 'http://localhost:8080/users/';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(baseUrl+'get/');
  }
  get(id:any) {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data:any) {
    return this.http.post(baseUrl+'add/', data);
  }
  update(id:any, data:any) {
    return this.http.put(baseUrl+'update/'+id, data);
  }
  delete(id:any) {
    return this.http.delete(baseUrl+'/delete/'+id);
  }
  deleteAll() {
    return this.http.delete(baseUrl+'delete/');
  }
  findByName(name:any) {
    return this.http.get(`${baseUrl}?name=${name}`);
  }
}