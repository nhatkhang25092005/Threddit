import {
  AxiosHeaders,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

interface CustomResponseData<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export const createMockApiResponse = <T>(
  status: number,
  innerData: T,
  message: string = "call api successfully",
  statusCode: number = 200,
): AxiosResponse<CustomResponseData<T>> => {
  const mockedHeader = new AxiosHeaders({
    "content-length": "575",
    "content-type": "application/json; charset=utf-8",
  });

  const mockedConfig: InternalAxiosRequestConfig = {
    headers: mockedHeader,
    timeout: 0,
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ["xhr", "http"],
    transformRequest: [],
    transformResponse: [],
  };

  return {
    data: { statusCode, message, data: innerData },
    status,
    statusText: status === 200 ? "OK" : "Error",
    headers: mockedHeader,
    config: mockedConfig,
    request: {} as XMLHttpRequest,
  };
};
