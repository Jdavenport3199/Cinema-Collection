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
  const maxMoviesToShow = 7;

  return (
    <>
      <div
        className="content-container"
        style={{
          width: "95%",
          margin: "0rem",
          marginBottom: "14rem",
        }}
      >
        <div className="related-moviegrid" style={{ justifyContent: "center" }}>
          {movieData.slice(0, maxMoviesToShow).map((movie, index) => (
            <>
              {movie !== null && (
                <div
                  style={{
                    perspective: "100px",
                    transform:
                      index === Math.floor(maxMoviesToShow / 2)
                        ? "scale(1.2)"
                        : "none",
                    zIndex:
                      index === Math.floor(maxMoviesToShow / 2) ? "2" : "none",
                    marginLeft:
                      index === Math.floor(maxMoviesToShow / 2)
                        ? "1rem"
                        : "none",
                    marginRight:
                      index === Math.floor(maxMoviesToShow / 2)
                        ? "1rem"
                        : "none",
                    marginTop:
                      index === Math.floor(maxMoviesToShow / 2)
                        ? "2rem"
                        : "none",
                    marginBottom:
                      index === Math.floor(maxMoviesToShow / 2)
                        ? "2rem"
                        : "none",
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
                        maxWidth: "200px",
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
