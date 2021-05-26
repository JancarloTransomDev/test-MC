export interface LoginResultType {
  status: 'error' | 'success' | 'invalid_credentials';
  message: string;
}
