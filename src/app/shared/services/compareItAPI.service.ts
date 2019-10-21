import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../models/configuration';

@Injectable({
    providedIn: 'root',
})
export class compareItAPIService {

    private DOMAIN = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    public addConfiguration(configuration:Configuration){
        return this.http.post<Configuration>(this.DOMAIN,configuration);
    }

}