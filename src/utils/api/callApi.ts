export type callApiOptions<Response, Data> = {
  mutator: (data: Response) => Data;
  requestOptions?: RequestInit;
  url: string;
};

const callApi = async <Response, Data>(options: callApiOptions<Response, Data>) => {
  try {
    const response = await fetch(options.url, options.requestOptions);
    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      const errorDetails = errorBody ? ` - ${errorBody}` : '';
      throw new Error(
        `Request failed with ${response.status} ${response.statusText}${errorDetails}`
      );
    }
    const data = (await response.json()) as Response;
    const dataTransformed = options.mutator(data);

    return dataTransformed;
  } catch (exception) {
    const errorMessage = exception instanceof Error ? exception.message : String(exception);
    throw new Error(`ERROR @ callApi: ${options.url} ${errorMessage}`);
  }
};

export default callApi;
