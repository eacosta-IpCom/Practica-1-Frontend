/* import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  // Normalizamos baseUrl para evitar dobles slashes al concatenar
  private readonly baseUrl = environment.urls.urlbase.replace(/\/+$/, '');

  constructor(private http: HttpClient) {}

  private buildUrl(url: string, value?: string | number): string {
    const path = url.replace(/^\/+/, '');
    return value !== undefined ? `${this.baseUrl}/${path}/${value}` : `${this.baseUrl}/${path}`;
  }

  private buildHttpParams(
    params?: Record<string, string | number> | HttpParams
  ): HttpParams | undefined {
    if (!params) return undefined;
    if (params instanceof HttpParams) return params;
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        httpParams = httpParams.set(k, String(v));
      }
    });
    return httpParams;
  }

  getPath<T>(url: string, value: string | number): Promise<T> {
    return lastValueFrom(this.http.get<T>(this.buildUrl(url, value)));
  }

  getQuery<T>(
    url: string,
    options?: { params?: Record<string, string | number> | HttpParams; [key: string]: any }
  ): Promise<T> {
    const httpOptions: any = { ...(options || {}) };
    if (options?.params) {
      httpOptions.params = this.buildHttpParams(options.params);
    }
    return lastValueFrom(this.http.get<T>(this.buildUrl(url), httpOptions));
  }

  postBody<T>(url: string, body: any): Promise<T> {
    return lastValueFrom(this.http.post<T>(this.buildUrl(url), body));
  }

  postParams<T>(url: string, params: Record<string, string | number> | HttpParams): Promise<T> {
    return lastValueFrom(
      this.http.post<T>(this.buildUrl(url), null, { params: this.buildHttpParams(params) })
    );
  }

  putBody<T>(url: string, body: any): Promise<T> {
    return lastValueFrom(this.http.put<T>(this.buildUrl(url), body));
  }

  putParams<T>(url: string, params: Record<string, string | number> | HttpParams): Promise<T> {
    return lastValueFrom(
      this.http.put<T>(this.buildUrl(url), null, { params: this.buildHttpParams(params) })
    );
  }

  deleteQuery<T>(url: string, options?: any): Promise<T> {
    const httpOptions: any = { ...(options || {}) };
    if (options?.params) httpOptions.params = this.buildHttpParams(options.params);
    return lastValueFrom(this.http.delete<T>(this.buildUrl(url), httpOptions));
  }

  deletePath<T>(url: string, value: string | number): Promise<T> {
    return lastValueFrom(this.http.delete<T>(this.buildUrl(url, value)));
  }
}

/* TaskService must remain only in src/app/Services/TaskService/task-service.ts */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  private path = environment.urls.urlbase;
  constructor(private clientHttp: HttpClient) {}

  getPath(url: string, options: any): Promise<any> {
    let final = `${url}/${options}`;

    return lastValueFrom(this.clientHttp.get(this.path + final));
  }

  getQuery(url: string, options: any): Promise<any> {
    return lastValueFrom(this.clientHttp.get(this.path + url, options));
  }

  postBody(url: string, required: any): Promise<any> {
    return lastValueFrom(this.clientHttp.post(this.path + url, required));
  }

  postParams(url: string, required: any): Promise<any> {
    return lastValueFrom(this.clientHttp.post(this.path + url, { params: required }));
  }

  putBody(url: string, required: any): Promise<any> {
    return lastValueFrom(this.clientHttp.put(this.path + url, required));
  }

  putParams(url: string, required: any): Promise<any> {
    return lastValueFrom(this.clientHttp.put(this.path + url, { params: required }));
  }

  deleteQuery(url: string, options: any): Promise<any> {
    return lastValueFrom(this.clientHttp.delete(this.path + url, options));
  }

  deletePath(url: string, options: any): Promise<any> {
    let final = `${url}/${options}`;
    return lastValueFrom(this.clientHttp.delete(this.path + url));
  }
}
