import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [], // set to empty so when running and waiting for the API call response, you will not get undefined
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  // will be called when an instance of this component is rendered on the DOM
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(
      element => movie._id !== element._id
    );
    this.setState({ movies }); // key and value are the same names
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const idx = movies.indexOf(movie);
    movies[idx] = { ...movies[idx] };
    movies[idx].liked = !movies[idx].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const { pageSize, currentPage, selectedGenre, sortColumn } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id // because the all movies does not have _id so we can access it in else statement
        ? this.state.movies.filter(m => m.genre._id === selectedGenre._id)
        : this.state.movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize); // to slice the movies array into 4 movies per page
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies; // notice that we taken the length from the movies.length and added to the destructure instead of { length: count }=this.state.movies.length
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p> There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              onItemSelect={this.handleGenreSelect}
              selectedItem={this.state.selectedGenre}
              // textProperty="name"
              // valueProperty="_id" /* set them as defaultProps in list.jsx so we do not need to write them down here*/
            />
          </div>

          <div className="col">
            <Link className="btn btn-primary mb-4" to="/movies/new">
              New Movie
            </Link>
            <p>Showing {totalCount} movies in the database.</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
          </div>
        </div>

        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
