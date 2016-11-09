// Not used currently, may be used to implement server-side rendering / matching
import { Main, Polls, PollPage } from '../components';

export default {
  path: '/',
  component: Main,
  indexRoute: { component: Polls },
  childRoutes: [
    { path: 'poll/page/:pollId', component: PollPage }
  ]
};
