import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../Store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
function MovieDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //   const movie = useSelector((state) => state.movie);
  const { info } = useSelector((state) => state.movie);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,0.5),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[200vh] px-[10%]"
    >
      {/* part 1 navigation */}
      <nav className="h-[10vh]  w-full text-zinc-100 flex items-center  gap-10 text-xl ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>{" "}
        <a target="_blank" href={info.detail.homepage}>
          {/* target="_blank" dene se hum is pr click krne ke bad ek new tab me open hoga (mera page jaha ye 'a' tag hume redirect krerga) agr ye nhi dete hai to click krne ke bad nya page usi tab me open hoga*/}
          <i className="hover:text-[#6556CD] ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="hover:text-[#6556CD] ri-earth-fill"></i>
        </a>
        <a
          className="hover:text-[#6556CD]"
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          Imdb
        </a>
      </nav>

      {/* part 2 poster and details*/}
      <div className="w-full flex ">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh]  object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.profile_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black text-white ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className="text-2xl font-bold ml-5 text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-3 mb-5 flex text-white items-center gap-x-6  ">
            <span className=" rounded-full text-md font-semibold bg-yellow-500 text-white w-[6vh] h-[6vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className="font-semibold text-2xl w-[60px] leading-6 ">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1> {info.detail.genres.map((g) => g.name).join(" , ")} </h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-2xl mt-5 mb-3">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-2xl mt-5 mb-3">Movie Translated</h1>
          <p className="mb-10">{info.translations.join(" , ")}</p>

          <Link
            className="mt-5 px-4 py-3 bg-[#6556cd] rounded-lg"
            to={`${pathname}/trailer`}
          >
            <i className="ri-play-reverse-large-line mr-3"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      {/* part 3 Available on  plstforms*/}

      <div className="w-[80%] flex flex-col gap-y-5 mt-14">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1 className="text-xl text-zinc-300">Available on Platform</h1>
            {info.watchproviders.flatrate.map((w,i) => (
              <img
              key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-fit rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1 className="text-xl text-zinc-300">Available on Rent</h1>
            {info.watchproviders.rent.map((w,i) => (
              <img
              key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-fit rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1 className="text-xl text-zinc-300">Available to Buy</h1>
            {info.watchproviders.rent.map((w,i) => (
              <img
              key={i}
                title={w.provider_name} // image pr hover krne pr title dikhta hai
                // The value of the title attribute is displayed as a tooltip when the user hovers over the image.
                className="w-[5vh] h-[5vh] object-fit rounded-md "
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>
      {/* part 4 Recommendation and similar stuff */}


      <hr className="mt-14 mb-5 border-none h-[2px] bg-zinc-400" />

      <h1 className="text-3xl font-bold text-white">
        Recommenations & Similar stuff
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}
export default MovieDetails;


// In React Router DOM, an Outlet is a special component that serves as a placeholder for rendering child routes within a parent route. It allows nested routes to display their content inside a parent route, providing a way to organize layouts and nested views in your React app.