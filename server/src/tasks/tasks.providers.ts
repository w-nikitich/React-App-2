import { Tasks } from '../database/models/tasks.entity';

export const tasksProviders = [
  {
    provide: 'TASKS_REPOSITORY',
    useValue: Tasks,
  },
];
