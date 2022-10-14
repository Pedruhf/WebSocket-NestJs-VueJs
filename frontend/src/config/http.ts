import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  Method,
  HttpStatusCode,
} from "axios";

type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  data: T;
};

type HttpError = {
  statusCode: HttpStatusCode;
  message: string;
};

export class HttpClient {
  private httpClient: AxiosInstance;
  public static instance: HttpClient;

  private constructor(private readonly baseUrl?: string) {
    this.httpClient = axios.create({ baseURL: this.baseUrl });
  }

  public static getInstance(baseUrl?: string): HttpClient {
    if (!this.instance) {
      this.instance = new HttpClient(baseUrl);
    }

    return this.instance;
  }

  public async request<T = any>(
    url: string,
    method?: Method,
    data?: T,
    config?: AxiosRequestConfig<T>
  ): Promise<HttpResponse> {
    try {
      const result = await this.httpClient.request({
        url,
        method: method ?? "GET",
        data,
        ...config,
      });

      return {
        statusCode: result.status,
        data: result.data,
      };
    } catch (error) {
      const AxiosError = error as AxiosError;
      const errorData: HttpError = {
        statusCode: AxiosError.status as number,
        message: AxiosError.message,
      };
      throw errorData;
    }
  }
}
