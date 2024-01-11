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
        <span style={{ lineHeight: "2.4", fontSize: "16px" }}>
          Related Films
        </span>

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
