import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noImage.png";
function Cards({ data, title }) {
  console.log(title);
  return (
    <div className="px-[3%] h-full flex flex-wrap w-full gap-10 mt-20 bg-[#1F1E23]  items-center justify-center  ">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          key={i}
          className="relative w-[30vh] h-[50vh] "
        >
          <div className="h-[40vh] w-full ">
            <img
              className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-full w-full object-cover"
              src={
                c.poster_path || c.profile_path || c.backdrop_path
                  ? `https://image.tmdb.org/t/p/original/${
                      c.poster_path || c.profile_path || c.backdrop_path
                    }`
                  : noimage
              }
              alt=""
            />
          </div>
          <h1 className="text-xl leading-none text-zinc-300 mt-3 font-semibold">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
          {c.vote_average && (
            <div className="absolute -right-[10%] bottom-[25%] rounded-full text-md font-semibold bg-yellow-500 text-white w-[6vh] h-[6vh] flex justify-center items-center">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default Cards;
