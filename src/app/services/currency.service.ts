import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '../admin/models/currency.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = `${environment.apiUrl.endsWith('/api/admin') ? environment.apiUrl : `${environment.apiUrl}/api/admin`}/currencies`;

  constructor(private http: HttpClient) {}

  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl);
  }

  addCurrency(currency: Currency): Observable<Currency> {
    return this.http.post<Currency>(this.apiUrl, currency);
  }

  updateCurrency(id: number, currency: Currency): Observable<Currency> {
    return this.http.put<Currency>(`${this.apiUrl}/${id}`, currency);
  }

  deleteCurrency(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
