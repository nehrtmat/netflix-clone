import React, { useState, useEffect } from 'react';
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDhlMmUxOTliZjA1OTkxMDQ4YWYzYWZjNTU3YmFhZCIsIm5iZiI6MTcxOTA4MzUwNi41MzM2NzIsInN1YiI6IjY2NzcyMTEwZDEzM2Y3YzBmMjVlNmY3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fymOw8qE-cey9jUaF5kWMaan2kgb8i0EeE2nUe9HJgk'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results[0]))
      .catch(err => console.error(err));
  }, [id, options]); // Include id and options in the dependency array for useEffect

  // Function to handle navigation
  const navigateUp = () => {
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/');
    const newPath = segments.slice(0, -2).join('/') || '/';
    navigate(newPath);
  };

  return (
    <div className='player'>
      <img onClick={navigateUp} src={back_arrow_icon} alt="Back" />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  );
}

export default Player;
