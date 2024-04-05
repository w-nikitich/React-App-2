import { ActivityLogs } from '../database/models/activityLogs.entity';

export const activityLogsProviders = [
  {
    provide: 'ACTIVITY_LOGS_REPOSITORY',
    useValue: ActivityLogs,
  },
];
