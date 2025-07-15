export interface TErrorSources {
  path: string;
  message: string;
}
export interface TGenericErrorResponse {
  statuscode: number;
  message: string;
  errorSources?: TErrorSources[];
}
