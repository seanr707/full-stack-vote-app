import { Main, Polls, PollPage } from '../components';

export default {
  path: '/',
  component: Main,
  indexRoute: { component: Polls },
  childRoutes: [
    { path: 'poll/page/:pollId', component: PollPage }
  ]
};
