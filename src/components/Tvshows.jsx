import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
function Tvshows() {
  document.title = "SCSDB | Tv shows ";

  const [category, setCategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();

  const gettv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        settv((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refereshHandler = async () => {
    if (tv.length === 0) {
      gettv();
    } else {
      setPage(1);
      settv([]);
      gettv();
    }
  };

  useEffect(() => {
    refereshHandler();
  }, [category]);
  return tv.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" w-full px-[5%]  flex items-center justify-center ">
        <h1 className="text-2xl w-[18%] text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>{" "}
          Tv Show
        </h1>
        <Topnav />
        <div className="flex w-[25%] gap-3 ">
          <Dropdown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
            value={category}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={gettv}
        hasMore={hasMore}
        loader={<h1>Loading..</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}
export default Tvshows;
