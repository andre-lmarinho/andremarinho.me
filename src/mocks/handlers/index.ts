import apiHandlers from './api';
import githubHandlers from './github';

const handlers = [...githubHandlers, ...apiHandlers];

export default handlers;
