import { Injectable } from '@angular/core';
import axios from '../config/axios';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  getTasks(successCallback: Function, errorCallback: Function): void {
    axios
      .get('task')
      .then((response) => {
        successCallback(response.data?.data);
      })
      .catch((err) => {
        errorCallback(err?.response?.data);
      });
  }

  updateTask(
    id: string,
    completed: boolean,
    description: string,
    successCallback: Function,
    errorCallback: Function
  ): void {
    axios
      .put(`task/${id}`, { completed, description })
      .then((response) => {
        successCallback();
      })
      .catch((err) => {
        errorCallback();
      });
  }

  deleteTask(
    id: string,
    successCallback: Function,
    errorCallback: Function
  ): void {
    axios
      .delete(`task/${id}`)
      .then((response) => {
        successCallback();
      })
      .catch((err) => {
        errorCallback();
      });
  }

  addTask(
    description: string,
    successCallback: Function,
    errorCallback: Function
  ): void {
    axios
      .post(`task`, { description })
      .then((response) => {
        successCallback();
      })
      .catch((err) => {
        errorCallback(err?.response?.data);
      });
  }
}
