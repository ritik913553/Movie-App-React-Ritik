import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./partials/Cards";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
function People(){

    document.title = "SCSDB | Person  ";

  const [category, setCategory] = useState("popular");
  const [person, setperson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  const navigate = useNavigate();

  const getperson = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`);
      if (data.results.length > 0) {
        setperson((prevState) => [...prevState, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refereshHandler = async () => {
    if (person.length === 0) {
      getperson();
    } else {
      setPage(1);
      setperson([]);
      getperson();
    }
  };

  useEffect(() => {
    refereshHandler();
  }, [category]);

    return person.length > 0 ? (
        <div className="w-screen h-screen ">
          <div className=" w-full px-[5%]  flex items-center justify-center ">
            <h1 className="text-2xl w-[18%] text-zinc-400 font-semibold">
              <i
                onClick={() => navigate(-1)}
                className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
              ></i>{" "}
              People
            </h1>
            <Topnav />
            
          </div>
    
          <InfiniteScroll
            dataLength={person.length}
            next={getperson}
            hasMore={hasMore}
            loader={<h1>Loading..</h1>}
          >
            <Cards data={person} title="person" />
          </InfiniteScroll>
        </div>
      ) : (
        <Loading />
      );
}
export default People;