import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/task.model';
import { TasksListComponent } from '../tasks-list/tasks-list.component';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  dayjs: any = dayjs;
  deleteModalActive: boolean = false;
  editModalActive: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    public taskService: TaskService,
    public tasksList: TasksListComponent
  ) {}

  ngOnInit(): void {}

  updateTask(newDescription: string, isDescUpdate: boolean) {
    this.tasksList.loading = true;
    this.loading = true;
    if (isDescUpdate && newDescription === '') {
      this.updateTaskError();
      return;
    }
    this.taskService.updateTask(
      this.task._id,
      isDescUpdate ? this.task.completed : !this.task.completed,
      isDescUpdate ? newDescription : this.task.description,
      () => this.updateTaskSuccess(),
      () => this.updateTaskError()
    );
  }

  updateTaskSuccess() {
    this.tasksList.getTasks();
    this.loading = false;
    this.errorMessage = '';
    this.editModalActive = false;
    this.tasksList.successMessage = 'Task successfully updated!';
    setTimeout(() => {
      this.tasksList.successMessage = '';
    }, 4000);
  }

  updateTaskError() {
    this.loading = false;
    this.tasksList.loading = false;
    this.tasksList.successMessage = '';
    this.errorMessage = 'Error updating, description is required!';
    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }

  openDeleteModal() {
    this.deleteModalActive = true;
  }

  handleModalClose() {
    this.deleteModalActive = false;
  }

  handleDelete() {
    this.tasksList.loading = true;
    this.taskService.deleteTask(
      this.task._id,
      () => this.deleteSuccess(),
      () => (this.tasksList.loading = true)
    );
  }

  deleteSuccess() {
    this.tasksList.getTasks();
    this.tasksList.successMessage = 'Task successfully deleted!';
    setTimeout(() => {
      this.tasksList.successMessage = '';
    }, 4000);
  }

  preventClose(e: Event) {
    e.stopPropagation();
  }

  toggleModal() {
    this.editModalActive = !this.editModalActive;
  }
}
