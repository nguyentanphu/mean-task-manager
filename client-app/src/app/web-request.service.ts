import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class WebRequestService {
	private ROOT_URL: string = environment.ROOT_URL;

	constructor(private http: HttpClient) { }

	get(uri: string) {
		return this.http.get(`${this.ROOT_URL}/${uri}`);
	}
	post(uri: string, payload: object) {
		return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
	}
	patch(uri: string, payload: object) {
		return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
	}
	delete(uri: string) {
		return this.http.delete(`${this.ROOT_URL}/${uri}`);
	}
}
