import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GetAnime from './components/getAnime'

function App() {
  const[genres,setGenre] = useState([])
  const[air,setAir] = useState([]);
  const[rating,setRating] = useState([]);
  const[epi,setEpi] = useState([]);

 
  return (
    <div>
      <GetAnime genres={genres} rating={rating} episodes={epi} startDate={air} setGenre={setGenre} setAir={setAir} setEpi={setEpi} setRating={setRating}/>
    </div>
  )
}

export default App
