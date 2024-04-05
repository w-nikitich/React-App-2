import { Desks } from '../database/models/desks.entity';

export const desksProviders = [
  {
    provide: 'DESKS_REPOSITORY',
    useValue: Desks,
  },
];
