export interface ApiSuccessResponse<T> {
  payload: T;
  isSuccess: true;
}

export interface ApiFailureResponse {
  error: string;
  isSuccess: false;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;
