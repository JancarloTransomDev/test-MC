export interface AuthorizationBearerType {
  tokenType: string;
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}
