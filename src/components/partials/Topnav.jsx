import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noImage.png";
function Topnav() {
  const [query, setquery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative flex justify-start pl-[15%] items-center">
      <i className="text-zinc-400  text-2xl ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        className="w-[50%] text-zinc-300 mx-10 p-3 bg-transparent text-xl outline-none border-none"
        type="text"
        value={query}
        placeholder="Movies Show and more.."
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="text-2xl text-zinc-400 ri-close-line"
        ></i>
      )}
      <div className="w-[50%] max-h-[50vh] bg-zinc-200 absolute z-[100] top-[90%] overflow-auto ">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-full p-10 flex justify-start items-center border-b-2 border-zinc-100"
          >
            <img
              className="h-[10vh] w-[10vh] object-cover rounded mr-5 shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span>
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
        {/* bydefault link inline elemnt hote hai isliye hieght weight nhi lete hai isliye isko inline-block banana pdega ,flex and inline-block ek saath kam nhi krte */}
      </div>
    </div>
  );
}
export default Topnav;
