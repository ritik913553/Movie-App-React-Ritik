import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../Store/actions/personActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
function PersonDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");

  const { info } = useSelector((state) => state.person);
  console.log(info);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="px-[10%] h-[150vh] w-screen overflow-x-hidden bg-[#1F1E24] ">
      <nav className=" h-[10vh] w-full text-zinc-100 flex items-center  gap-10 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>{" "}
      </nav>

      <div className="w-full flex ">
        {/* left poster and details */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh]  object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-14 mb-5 border-none h-[2px] bg-zinc-400" />

          {/*  Social Media Links */}
          <div className="text-2xl text-white flex gap-x-5 ">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="hover:text-[#6556CD] ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill text-xl"></i>
            </a>
          </div>

          {/* personal information */}
          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Personal Info
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold">Known For</h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.known_for_department}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className=" text-zinc-400 ">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Deathday</h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place Of Birth
          </h1>
          <h1 className=" text-zinc-400 ">{info.detail.place_of_birth}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Also Known As
          </h1>
          <h1 className=" text-zinc-400 ">
            {info.detail.also_known_as.join(" , ")}
          </h1>
        </div>

        {/* right  details and info*/}
        <div className="w-[80%] ml-[5%]  ">
          <h1 className="text-6xl text-zinc-400 font-semibold my-5">
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold">Biography</h1>
          <p className="text-zinc-400 mt-2">{info.detail.biography}</p>

          <h1 className="text-lg mt-5 text-zinc-400 font-semibold">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between">
            <h1 className="text-xl mt-5 text-zinc-400 font-semibold">Acting</h1>
            <Dropdown
              title="Category"
              options={["tv", "movie"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="list-disc text-zinc-400 mt-5 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5 ">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white p-5 rounded hover:bg-[#19191d] duration-300 cursor-pointer"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>
                    {c.name || c.title || c.original_name || c.original - title}
                  </span>
                  <span className="block ml-5 mt-2">
                    {c.character && `Character Name : ${c.character}`}
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
export default PersonDetails;
