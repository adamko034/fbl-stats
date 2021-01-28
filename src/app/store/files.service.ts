import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilesService {
  private readonly baseUrl = 'assets/db/';

  constructor(private http: HttpClient) {}

  public getJson<T>(fileName: string): Observable<T[]> {
    const salt = new Date().getTime();
    return this.http.get<T[]>(`${this.baseUrl}${fileName}.json?${salt}`);
  }

  public getJsonObject<T>(fileName: string): Observable<T> {
    const salt = new Date().getTime();
    return this.http.get<T>(`${this.baseUrl}${fileName}.json?${salt}`);
  }
}
