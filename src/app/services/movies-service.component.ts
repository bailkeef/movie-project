import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MoviesService {

    constructor(private http: HttpClient) {}

    getMovieBySearchTerm(query: any) {
        return this.http.get(`https://www.omdbapi.com/?apikey=d3f6c0ee&s=${query}`);
    }
}