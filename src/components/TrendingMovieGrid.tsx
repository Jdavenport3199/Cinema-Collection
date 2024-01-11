import { Dispatch, SetStateAction } from "react";

export default function TrendingMovieGrid({
  movieData,
  changeDisplay,
  movieDetails,
}: {
  movieData: Array<{
    moviePoster: string;
  } | null>;
  changeDisplay: Dispatch<SetStateAction<"movie" | "movieGrid" | null>>;
  movieDetails: Dispatch<SetStateAction<number | null>>;
}) {
  const maxMoviesToShow = 8;

  return (
    <>
      <div
        className="content-container"
        style={{ flexDirection: "column", width: "100%", marginTop: "2rem" }}
      >
        <div className="related-moviegrid">
          {movieData.slice(0, maxMoviesToShow).map((movie, index) => (
            <>
              {movie !== null && (
                <div
                  style={{
                    perspective: "100px",
                  }}
                >
                  <div
                    className="poster-extra"
                    key={index}
                    style={{ cursor: "auto" }}
                    onClick={() => {
                      movieDetails(index);
                      // changeDisplay("movie");
                    }}
                  >
                    <img
                      src={movie.moviePoster}
                      alt="Movie Poster"
                      style={{
                        maxWidth: "156px",
                        height: "237px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}
