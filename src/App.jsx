
import React, { useState } from 'react';
import './Style.css';
import axios from 'axios';
// import { IoSearch } from "react-icons/io5";
// import { IoMdNotificationsOutline,  IoMdTrendingUp } from "react-icons/io";
// import { BsBrowserEdge } from "react-icons/bs";
// import { FaRegUser } from "react-icons/fa";
// import { MdOndemandVideo } from "react-icons/md";
// import { RiFileList2Line } from "react-icons/ri";
// import { LuSend } from "react-icons/lu";
// import { BiLogoImdb } from "react-icons/bi";


 // Replace with your actual API key

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [mainmovie, setMainmovie] = useState("null")
  const [imdbid , setImdbid] = useState("");
  const [movieinfo , setMovieinfo] = useState([]);


  const searchMovies = async () => {

    const url = "http://www.omdbapi.com/?apikey=ff35f87a&s="+query

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.Search);
      setMainmovie(data.Search[0])
      setMovieinfo(data.Search[0])
      // console.log(data.Search)

  };
  const InfosearchMovies = async(movies,index)=>{
    console.log(movies[index].Title)
    console.log(movies[index].imdbID , index)
    
    const imdburl = "http://www.omdbapi.com/?apikey=ff35f87a&i="+movies[index].imdbID;
    setImdbid(movies[index].imdbID)
    const newres = await axios.get(imdburl);
    const data =   newres.data;
    setMovieinfo(data);
    console.log(data)
  }

  return (
    <>
    <div className="bodyBox">
    <header>
      
      <h1>Movies.<span>B</span></h1>
      <div className='search-input'>
        <IoSearch  style={{flexGrow:"0"}}/>
        <input placeholder='Search everything'  style={{flexGrow:"1"}}
        value={query} onChange={(event)=>setQuery(event.target.value)}/>
        <button style={{flexGrow:"3"}} onClick={()=>searchMovies()} ><LuSend /> </button>
        <IoMdNotificationsOutline id='notification'  style={{flexGrow:"5"}}/>
      </div>
    </header>

    <div className="container">
      <div className="news_feed" >
          <h2>News Feed</h2>
        <div className="menu" style={{marginTop:"0px"}}><span><BsBrowserEdge /></span>Browse</div>
        <div className="menu"><span><IoMdTrendingUp /></span>Trending</div>
        <div className="menu"><span><FaRegUser /></span>Following</div>
        <div className="menu"><span><MdOndemandVideo /></span>Your Videos</div>
        <div className="menu"><span><RiFileList2Line /></span>Playlist</div>
      </div>
      
      <div className="main_movie" style={{textAlign:"center"}} >
        
        {
          <div className='moviebox'>
              <img src={mainmovie.Poster}  />
          </div>
        }

        <div className="infomain_movie">
          <h3 ><span style={{fontWeight:"700"}}>{movieinfo.Title}</span><blockquote/><BiLogoImdb style={{ zoom:"120%"}}/>{movieinfo.imdbRating}<blockquote/>{movieinfo.Language}</h3>
        </div>

      </div>
      
      <div className="following" >
        <h2>Following</h2>
        <div className="followersname">person -1</div>
        <div className="followersname">person -2</div>
        <div className="followersname">person -3</div>
        <div className="followersname">person -4</div>
        <div className="followersname">person -5</div>
      </div>
      <div className="scroll_movie" >
        <div className="scrollmovie">
          {
            movies.map((item, index) => (
              <div key={index} className="scrollmoviebox" >
                {item.Poster ? (<img src={item.Poster} onClick={()=>(setMainmovie(item) , InfosearchMovies(movies ,index) )}/>) : (<div></div>)}
              </div>
            ))
          }

        </div>
      </div>
    </div>
  </div>
    
    
    </>
    
  );
}

export default App;


