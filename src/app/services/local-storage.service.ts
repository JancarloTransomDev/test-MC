import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  reservedKeys = {
    accessToken: 'access_token',
    refreshToken: 'refresh_token'
  };

  private _accessToken: string | null = null;
  private _refreshToken: string | null = null;

  constructor() {
  }

  public async loadData(): Promise<void> {
    // Bearer Token
    this._accessToken = await this.getAccessToken();
  }

  public get accessToken(): string | null {
    return this._accessToken;
  }
  public setAccessToken(token: string | null): void {
    this._accessToken = token;
    this.setString(this.reservedKeys.accessToken, this._accessToken ?? '');
  }

  public get refreshToken(): string | null {
    return this._refreshToken;
  }


  public setRefreshToken(token: string | null): void {
    this._refreshToken = token;
    this.setString(this.reservedKeys.refreshToken, this._refreshToken ?? '');
  }

  // Basic methods
  public setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public setNumber(key: string, value: number): void {
    this.setString(key, String(value));
  }

  public setBoolean(key: string, value: boolean): void {
    this.setNumber(key, (value ? 1 : 0));
  }

  public setObject<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public async getString(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }

  public async getNumber(key: string): Promise<number> {
    const value = Number(await this.getString(key));
    if (isNaN(value)) {
      throw new Error(`Value of ${key} is not a number`);
    }
    return value;
  }

  public async getBoolean(key: string): Promise<boolean> {
    const value = Number(await this.getString(key));
    if (isNaN(value)) {
      throw new Error(`Value of ${key} is not a boolean`);
    }
    return (value === 1);
  }

  public async getObject<T>(key: string): Promise<T | null> {
    const value = await this.getString(key);
    if (value) {
      return await JSON.parse(value) as T;
    } else {
      return null;
    }
  }

  private async getAccessToken(): Promise<string | null> {
    const token = await this.getString(this.reservedKeys.accessToken);
    if (token && token.length > 0) {
      return token;
    } else {
      return null;
    }
  }
}
