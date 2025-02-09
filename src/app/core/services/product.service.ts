import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { SchemaProduct } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUri = '';
  private fallbackUri = 'assets/data/products-fallback.json';

  getProducts(): Observable<SchemaProduct[]> {
    return this.http.get<SchemaProduct[]>(this.apiUri).pipe(
      catchError(() => {
        console.warn('API f, JSON local...');
        return this.http.get<SchemaProduct[]>(this.fallbackUri).pipe(
          catchError(() => throwError(() => new Error('Error: No datas')))
        );
      })
    );
  }
}