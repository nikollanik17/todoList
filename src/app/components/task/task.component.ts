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

  constructor(
    public taskService: TaskService,
    public tasksList: TasksListComponent
  ) {}

  ngOnInit(): void {}

  updateTask() {
    this.tasksList.loading = true;
    this.taskService.updateTask(
      this.task._id,
      !this.task.completed,
      () => this.updateTaskSuccess(),
      () => (this.tasksList.loading = false)
    );
  }

  updateTaskSuccess() {
    this.tasksList.getTasks();
    this.tasksList.successMessage = 'Task successfully updated!';
    setTimeout(() => {
      this.tasksList.successMessage = '';
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
}
