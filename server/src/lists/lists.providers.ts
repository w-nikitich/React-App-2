import { Lists } from '../database/models/lists.entity';

export const listsProviders = [
  {
    provide: 'LISTS_REPOSITORY',
    useValue: Lists,
  },
];
