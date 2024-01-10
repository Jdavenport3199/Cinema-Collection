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
  const maxMoviesToShow = 8;

  return (
    <>
      <div
        className="content-container"
        style={{ marginTop: "1rem", flexDirection: "column" }}
      >
        <span style={{ fontSize: "16px", lineHeight: "2.4" }}>
          Related Movies
        </span>

        <div
          className="content"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".4rem",
            margin: 0,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
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
