import callApi, { type callApiOptions } from '@/utils/api/callApi';
import { transformRepositories, transformUserInformation } from './mutators';

const githubApiClient = <Response, Data>(options: callApiOptions<Response, Data>) => {
  const token = process.env.GITHUB_API_TOKEN;

  if (!token) {
    throw new Error('Missing GITHUB_API_TOKEN. Set it to fetch GitHub data.');
  }

  return callApi({
    mutator: options.mutator,
    url: `https://api.github.com${options.url}`,
    requestOptions: {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

export const fetchRepositories = () =>
  githubApiClient({
    mutator: transformRepositories,
    url: '/users/andre-lmarinho/repos',
  });

export const fetchUserInformation = () =>
  githubApiClient({
    mutator: transformUserInformation,
    url: '/users/andre-lmarinho',
  });
