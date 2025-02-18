import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, catchError, throwError, map } from 'rxjs';
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
  ) { }

  getProducts(): Observable<(SchemaProduct & { id: string })[]> {
    const cachedData = this.cache.get<(SchemaProduct & { id: string })[]>(this.CACHE_KEY);
    if (cachedData) {
      console.log('Loading from cache...');
      return of(cachedData);
    }

    return this.http.get<(SchemaProduct)[]>(this.API_URL).pipe(
      map(list =>
        list.map(p => ({
          id: this.deriveId(p),
          ...p
        }))
      ), tap(data => this.cache.set(this.CACHE_KEY, data)),
      catchError(() => this.loadFromFallback())
    );
  }
  private deriveId(p: SchemaProduct): string {
    return [
      p['@type'],
      p.sku,
      (p as any).gtin13,
      p.name
    ].filter(Boolean).join('|');
  }

  private loadFromFallback(): Observable<(SchemaProduct & { id: string })[]> {
    console.warn('API Failed. Trying JSON...');
    return this.http.get<(SchemaProduct & { id: string })[]>(this.JSON_URL).pipe(
      tap(data => this.cache.set(this.CACHE_KEY, data)),
      catchError(err => {
        console.error('Failed.');
        return throwError(() => new Error('Error: No sources for data.'));
      })
    );
  }
}