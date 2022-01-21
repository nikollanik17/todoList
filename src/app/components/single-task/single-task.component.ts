import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { SingleTaskService } from 'src/app/services/single-task.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss'],
})
export class SingleTaskComponent implements OnInit {
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  task: Task;

  constructor(
    private singleTaskService: SingleTaskService,
    private router: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    let queryId = this.router.snapshot.paramMap.get('id');
    if (queryId) {
      this.getTask(queryId);
    }
  }

  public getTask(id: string) {
    this.singleTaskService.getTask(id).subscribe((data) => {
      this.task = data;
    });
  }

  updateTask(description: string) {
    this.loading = true;
    this.taskService.updateTask(
      this.task._id,
      this.task.completed,
      description,
      () => this.updateTaskSuccess(),
      () => this.updateTaskError()
    );
  }

  updateTaskSuccess() {
    this.loading = false;
    this.errorMessage = '';
    this.successMessage = 'Task successfully updated!';
    setTimeout(() => {
      this.successMessage = '';
    }, 4000);
  }

  updateTaskError() {
    this.loading = false;
    this.successMessage = '';
    this.errorMessage = 'Error updating, description is required!';
    setTimeout(() => {
      this.errorMessage = '';
    }, 4000);
  }
}
