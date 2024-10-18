import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noImage.png"; // Make sure this path is correct

function HorizontalCards({ data }) {
  return (
    <div className="w-[100%] h-[40vh] 2xl:h-[30vh] flex overflow-y-hidden pb-4 p-5 mb-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[15%] h-full mr-4 bg-zinc-900 text-white"
          >
            <img
              className="w-full h-[45%] object-cover"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path
                    }`
                  : noimage // Fallback to noimage if both are unavailable
              }
              alt={d.title || d.original_name || "No Image Available"}
            />
            <div className="text-white p-3 h-[55%] overflow-hidden">
              <h1 className="leading-none text-md font-semibold 2xl:text-xl">
                {d.title || d.original_name || d.name || "Untitled"} {/* Handle missing titles */}
              </h1>
              <p className="mt-2 text-sm leading-none opacity-55 2xl:text-lg 2xl:leading-none">
                {d.overview
                  ? `${d.overview.slice(0, 40)}...`
                  : "No description available"}{" "}
                {/* Handle missing overview */}
                <span className="text-blue-300">More</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-block text-center mt-5">
          Nothing to Show
        </h1>
      )}
    </div>
  );
}

export default HorizontalCards;
