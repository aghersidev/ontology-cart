import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError, throwError } from 'rxjs';
import { CacheService } from './cache.service';
import { SchemaProduct } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryService {
  private readonly API_URL = '';
  private readonly JSON_URL = 'data/products-fallback.json';
  private readonly CACHE_KEY = 'all_products';

  constructor(
    private http: HttpClient,
    private cache: CacheService
  ) {}

  getProducts(): Observable<SchemaProduct[]> {
    const cachedData = this.cache.get(this.CACHE_KEY);
    if (cachedData) {
      console.log('Loading from cache...');
      return of(cachedData);
    }

    return this.http.get<SchemaProduct[]>(this.API_URL).pipe(
      tap(data => this.cache.set(this.CACHE_KEY, data)),
      catchError(() => this.loadFromFallback())
    );
  }

  private loadFromFallback(): Observable<SchemaProduct[]> {
    console.warn('API Failed. Trying JSON...');
    return this.http.get<SchemaProduct[]>(this.JSON_URL).pipe(
      tap(data => this.cache.set(this.CACHE_KEY, data)), 
      catchError(err => {
        console.error('Failed.');
        return throwError(() => new Error('Error: No sources for data.'));
      })
    );
  }
}