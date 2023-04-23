import { Injectable } from "@angular/core";
import endpoint from '../../app/app.endpoints';
import { createRequestOption } from '../request-util';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ITodo } from "../models/todo.model";


@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private serverUrl = `${endpoint.getServerUrl()}`;

    constructor(private http: HttpClient) { }

    public get(api: string, params?: Partial<ITodo>): Observable<ITodo[]> {
        var restApi = this.serverUrl + api;
        let options = createRequestOption(params);
        return this.http.get<ITodo[]>(restApi, { params: options });
    }

    public add(api: string, data: any): Observable<ITodo> {
        var restApi = this.serverUrl + api;
        return this.http.post<ITodo>(restApi, data);
    }

    public update<ITodo>(api: string, id: number, data: ITodo): Observable<ITodo> {
        var restApi = this.serverUrl + api + '/' + id;
        return this.http.put<ITodo>(restApi, data);
    }

    public delete<ITodo>(api: string, id: number): Observable<ITodo> {
        var restApi = this.serverUrl + api + '/' + id;
        return this.http.delete<ITodo>(restApi);
    }
}