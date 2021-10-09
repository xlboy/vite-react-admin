import { userThunks } from './modules/user';

const rootThunks = {
  user: userThunks
} as const;

export default rootThunks;
