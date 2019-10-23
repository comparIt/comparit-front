import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Configuration} from '../models/configuration';

@Injectable({
    providedIn: 'root',
})
export class compareItAPIService {

    private DOMAIN = 'http://localhost:8080';

    private websiteconfigController='/websiteconfig/'

    constructor(private http: HttpClient) {
    }

     /**
     * Returns the complete URL based on the domain, the endpoint and the parameters list.
     * @param endPoint the endpoint to call
     * @param params the parameters to add to the url
     */
    private getBuiltUrl(endPoint: string, params: {key: any, value: any}[]): any {
        let paramString = '?';
        // add each param to paramString, and '&' between params (not after the last one)
        paramString += params.map((kv) => kv.key + '=' + kv.value).join('&');
        // build complete URL with domain, controller and '?' + params if present
        return this.DOMAIN + endPoint + (paramString !== '?' ? paramString : '');
    }

    private put(endPoint: string, params: {key: any, value: any}[], body: any): any {
        console.log("before sending" , body);
        return this.http.put(this.getBuiltUrl(endPoint, params), body);
    }

    public putwebsiteconfig(configuration:Configuration): any{
        return this.put(this.websiteconfigController,[],configuration);
    }


    //public addConfiguration(configuration:Configuration){
    //    return this.http.post<Configuration>(this.DOMAIN+'/',JSON.stringify(configuration));
    //}

}