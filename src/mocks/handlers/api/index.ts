import { http, HttpResponse } from 'msw';

import availability from './mocks/availability.json';

const apiHandlers = [http.get('/api/availability', () => HttpResponse.json(availability))];

export default apiHandlers;
