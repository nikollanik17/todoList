import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class SingleTaskService {
  private baseUrl = 'https://api-nodejs-todolist.herokuapp.com/';

  constructor(private _httpClient: HttpClient) {}

  public getTask(id: string): Observable<Task> {
    const token = localStorage.getItem('jwToken');
    return this._httpClient
      .get(`${this.baseUrl}task/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(map((data: any) => this._createTaskFromObject(data?.data)));
  }

  public _createTaskFromObject(item: any) {
    return new Task(
      item.completed,
      item._id,
      item.description,
      item.owner,
      item.createdAt,
      item.updatedAt,
      item.__v
    );
  }
}
