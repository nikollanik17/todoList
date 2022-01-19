import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  tasks: Task[];
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  filterValue: string = 'all';
  addModalVisible: boolean = false;

  constructor(public taskService: TaskService) {}

  getTasks() {
    this.loading = true;
    this.taskService.getTasks(
      (data: any[]) => {
        this.setTasks(data);
        this.loading = false;
      },
      () => (this.loading = false)
    );
  }

  setTasks(data: any[]) {
    this.tasks = data;
  }

  ngOnInit(): void {
    this.getTasks();
  }

  handleSelectChange(e: Event) {
    this.filterValue = (e.target as HTMLTextAreaElement).value;
  }

  toggleModal() {
    this.addModalVisible = !this.addModalVisible;
  }

  preventClose(e: Event) {
    e.stopPropagation();
  }

  addTask(description: HTMLTextAreaElement) {
    this.loading = true;
    const descriptionValue = description.value;
    this.taskService.addTask(
      descriptionValue,
      () => {
        this.addTaskSuccess();
        description.value = '';
      },
      (err: string) => this.addTaskError(err)
    );
  }

  addTaskSuccess() {
    this.getTasks();
    this.addModalVisible = false;
    this.errorMessage = '';
    this.successMessage = 'New task added!';
    setTimeout(() => {
      this.successMessage = '';
    }, 4000);
  }

  addTaskError(err: string) {
    this.loading = false;
    this.successMessage = '';
    this.errorMessage = err;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
