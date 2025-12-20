export type callApiOptions<Response, Data> = {
  mutator: (data: Response) => Data;
  requestOptions?: RequestInit;
  url: string;
};

const callApi = async <Response, Data>(options: callApiOptions<Response, Data>) => {
  try {
    const response = await fetch(options.url, options.requestOptions);
    const data = (await response.json()) as Response;
    const dataTransformed = options.mutator(data);

    return dataTransformed;
  } catch (exception) {
    const errorMessage = exception instanceof Error ? exception.message : String(exception);
    throw new Error(`ERROR @ callApi: ${options.url} ${errorMessage}`);
  }
};

export default callApi;
