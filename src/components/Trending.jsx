import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from ".././utils/axios";
import Cards from "./partials/Cards";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
function Trending() {
  document.title = "SCSDB | Trending ";

  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState(null);
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `trending/${category ? category : "all"}/${duration ? duration : "day" }?page=${page}`
      );
      // setTrending(data.results);
      if (data.results.length > 0) {
        setTrending((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        sethasMore(false);
      }
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refereshHandler = async () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setPage(1);
      setTrending([]);
      getTrending();
    }
  };

  useEffect(() => {
    refereshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen">
      <div className=" w-full px-[5%]  flex items-center justify-center ">
        <h1 className="text-2xl w-[18%] text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>{" "}
          Trending
        </h1>
        <Topnav />
        <div className="flex w-[25%] gap-3 ">
          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setCategory(e.target.value)}
            value={category}
          />
          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setDuration(e.target.value)}
            value={duration}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>Loading..</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}
export default Trending;

//Notes
// prevState is [1, 2, 3] and data.results is [4, 5].

// Using [...prevState, ...data.results] would result in [1, 2, 3, 4, 5], where the items of data.results are added individually to the array.

// Using [...prevState, data.results] would result in [1, 2, 3, [4, 5]], where data.results is added as a single nested array.
