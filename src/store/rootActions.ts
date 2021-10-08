import { systemActions } from './modules/system';
import { userActions } from './modules/user';

const rootActions = {
  system: systemActions,
  user: userActions
} as const;

export default rootActions;
