import { Dispatch, SetStateAction } from "react";

export default function MovieGrid({
  movieData,
  changeDisplay,
  movieDetails,
}: {
  movieData: Array<{
    movieID: string;
    movieTitle: string;
    movieRating: string;
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
          margin: "0rem",
          marginBottom: "4rem",
          padding: "2rem",
          flexDirection: "column",
          // borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
          // borderRight: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        <div style={{ width: "100%" }}>
          <h2>Related Films</h2>
          <hr />
        </div>

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
                    onClick={() => {
                      movieDetails(index);
                      changeDisplay("movie");
                      window.scrollTo(0, 0);
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
