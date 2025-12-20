import callApi, { type callApiOptions } from '@/utils/api/callApi';
import { transformRepositories, transformUserInformation } from './mutators';

const githubApiClient = <Response, Data>(options: callApiOptions<Response, Data>) => {
  const githubToken = process.env.GITHUB_API_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  if (githubToken) {
    headers.Authorization = `Bearer ${githubToken}`;
  }

  return callApi({
    mutator: options.mutator,
    url: `https://api.github.com${options.url}`,
    requestOptions: {
      headers,
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
