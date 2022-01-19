// import dayjs from 'dayjs';

import * as dayjs from 'dayjs';

export class Task {
  completed: boolean;
  _id: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;

  constructor(
    completed: boolean,
    _id: string,
    description: string,
    owner: string,
    createdAt: string,
    updatedAt: string,
    __v: number
  ) {
    this.completed = completed;
    this._id = _id;
    this.description = description;
    this.owner = owner;
    this.createdAt = dayjs(createdAt).format('DD. MM. YYYY.');
    this.updatedAt = dayjs(updatedAt).format('DD. MM. YYYY.');
  }
}
