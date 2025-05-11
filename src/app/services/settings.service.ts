import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSetting } from '../admin/models/app-setting.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = `${environment.apiUrl}/settings`;
  constructor(private http: HttpClient) {}

  getSettings(): Observable<AppSetting[]> {
    return this.http.get<AppSetting[]>(this.apiUrl);
  }

  addSetting(setting: AppSetting): Observable<AppSetting> {
    return this.http.post<AppSetting>(this.apiUrl, setting);
  }

  updateSetting(id: number, setting: AppSetting): Observable<AppSetting> {
    console.log('Sending update request for setting:', setting);
    return this.http.put<AppSetting>(`${this.apiUrl}/${id}`, setting);
  }

  deleteSetting(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Sending DELETE request to:', url);
    return this.http.delete<void>(url);
  }
}
