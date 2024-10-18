import React from "react";
import { Link } from "react-router-dom";
function Header({ data }) {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,0.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "top 20%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[50vh] flex flex-col justify-end items-start p-[5%] text-white"
    >
      <h1 className="w-[70%] text-5xl font-black text-white ">
        {data.name || data.title || data.original_name || data.original_title}
      </h1>
      <p className="w-[70%] mt-3 mb-3">
        {data.overview && data.overview.slice(0, 100)}...{" "}
        <Link to={`/${data.media_type}/details/${data.id}`}  className="text-blue-400">more</Link>{" "}
      </p>
      <p className="text-white">
        <i className="text-yellow-500 ri-megaphone-fill"></i>{" "}
        {data.release_date || "No Information"}
        <i className=" ml-5 text-yellow-500  ri-disc-fill"></i>{" "}
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`${data.media_type}/details/${data.id}/trailer`} className="bg-[#A891FF] mt-5 p-1 rounded text-white ">
        Watch Trailer
      </Link>
    </div>
  );
}
export default Header;
