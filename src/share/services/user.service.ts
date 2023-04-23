import { Injectable } from "@angular/core";
import endpoint from '../../app/app.endpoints';
import { createRequestOption } from '../request-util';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../models/user.model";
@Injectable({
    providedIn: 'root'
})

export class UserService {
    private serverUrl = `${endpoint.getServerUrl()}`;

    constructor(private http: HttpClient) { }

    public get(api: string, params?: Partial<IUser>): Observable<IUser[]> {
        var restApi = this.serverUrl + api;
        let options = createRequestOption(params);
        return this.http.get<IUser[]>(restApi, { params: options });
    }

    public add(api: string, data: any): Observable<IUser> {
        var restApi = this.serverUrl + api;
        return this.http.post<IUser>(restApi, data);
    }

    public update<IUser>(api: string, data: any): Observable<IUser> {
        var restApi = this.serverUrl + api;
        return this.http.put<IUser>(restApi, data);
    }

    public delete<IUser>(api: string, id: number): Observable<IUser> {
        var restApi = this.serverUrl + api + id;
        return this.http.delete<IUser>(restApi);
    }
}