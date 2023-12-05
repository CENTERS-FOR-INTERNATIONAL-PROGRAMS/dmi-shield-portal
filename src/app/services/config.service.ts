// config.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private baseUrl = 'http://localhost:3001/api/v1';

    getBaseUrl(): string {
        return this.baseUrl;
    }
}
