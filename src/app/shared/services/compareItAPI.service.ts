import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Configuration} from '../models/configuration';

@Injectable({
    providedIn: 'root',
})
export class CompareItAPIService {

    private DOMAIN = 'http://localhost:8080';

    private alertController = '/alert';
    private companyController = '/company';
    private filterController = '/filter';
    private jwtAuthenticationController = '/authenticate';
    private modelController = '/model';
    private modelPropertyController = '/modelproperty';
    private userController = '/user';
    private websiteconfigController= '/websiteconfig';

    private HEADERS;

    constructor(private http: HttpClient) {
    }

     /**
      * Returns the complete URL based on the domain, the endpoint and the parameters list.
      * @param endPoint the endpoint to call
      * @param params the parameters to add to the url
      */
     private getBuiltUrl(endPoint: string, params: {key: any, value: any}[]): any {
         // add each param to paramString, and '&' between params (not after the last one)
         const paramString = '?' + params.map((kv) => kv.key + '=' + kv.value).join('&');
         // build complete URL with domain, controller and '?' + params if present
         return this.DOMAIN + endPoint + (params.length !== 0 ? paramString : '') + '';
     }

    private get(endPoint: string, params: {key: any, value: any}[]): any {
        return this.http.get(this.getBuiltUrl(endPoint, params)).toPromise();
    }

    private put(endPoint: string, params: {key: any, value: any}[], body: any): any {
        return this.http.put(this.getBuiltUrl(endPoint, params), body).toPromise();
    }

    private post(endPoint: string, params: {key: any, value: any}[], body: any): any {
        return this.http.post(this.getBuiltUrl(endPoint, params), body).toPromise();
    }

    private delete(endPoint: string, params: {key: any, value: any}[]): any {
        return this.http.delete(this.getBuiltUrl(endPoint, params));
    }


    // Authenticate
    public authenticate(username: string , password: string): any {
         return this.post(this.jwtAuthenticationController, [], {username, password});
    }

    // WebsiteConfig
    public putWebsiteconfig(configuration: Configuration): any {
        return this.put(this.websiteconfigController+"/saveWebsiteConfiguration", [], configuration);
    }

    public getWebsiteConfiguration(): any {
         return this.get(this.websiteconfigController + '1' , []);
    }


    // public addConfiguration(configuration:Configuration){
    //    return this.http.post<Configuration>(this.DOMAIN+'/',JSON.stringify(configuration));
    // }

  public getMockProduct(): any {
       return this.get('/product/search', []);
  }

}
