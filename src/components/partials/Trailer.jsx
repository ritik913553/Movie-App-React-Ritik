import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notfound from "../Notfound";
function Trailer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);

  // console.log(ytvideo);
  // console.log(pathname.includes("movie"),ytvideo);
  return (
    <div className="bg-[rgba(0,0,0,.8)] absolute z-[100] top-0 left-0 w-screen h-screen flex items-center justify-center">
      <Link
        onClick={() => navigate(-1)}
        className="absolute text-3xl text-white right-[5%] top-[5%] hover:text-[#6556CD] ri-close-large-line"
      ></Link>{" "}
      {ytvideo ? (
        <ReactPlayer
          controls
          height={500}
          width={1000}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
        />
      ) : (
        <Notfound />
      )}
    </div>
  );
}
export default Trailer;

// In your code, you're using state[category] instead of state.category because you're dynamically accessing a property in the Redux state based on the value of the variable category.

// Here's a detailed explanation:

// Dynamic Property Access:

// state[category] is used when you need to access a property dynamically. The variable category can either be "movie" or "tv", depending on the route (pathname).
// If category is "movie", then state["movie"] is evaluated, which accesses the movie property in your state.
// If category is "tv", then state["tv"] is evaluated, which accesses the tv property in your state.
// Static Property Access:

// state.category would look for a property called category (as a string) in the state, which is not what you want here.
// For example, if you had written state.category, Redux would search for a property literally named category, not for the value contained in the category variable (i.e., movie or tv).
