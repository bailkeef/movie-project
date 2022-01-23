import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClrDatagridStateInterface } from '@clr/angular';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { MoviesService } from '../services/movies-service.component';

@Component({
  selector: 'movie-grid',
  templateUrl: './movie-grid.component.html',
  styleUrls: ['./movie-grid.component.css']
})
export class MovieGridComponent {
    searchControl: FormControl = new FormControl();
    movies: any = [];
    loading = true;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.searchControl = new FormControl();

    this.movies = this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(
          searchString => this.moviesService.getMovieBySearchTerm(searchString)
        ),
        map((res:any) => res.Search)
      );

    console.log(this.movies, 'movies')

  }

  refresh(state: ClrDatagridStateInterface) {
      this.loading = true;

      this.movies = this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(
          searchString => this.moviesService.getMovieBySearchTerm(searchString)
        ),
        map((res:any) => res.Search)
      );

      this.loading = false;
  }
}
