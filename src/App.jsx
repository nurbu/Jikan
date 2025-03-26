import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GetAnime from './components/getAnime'

function App() {
  const[air,setAir] = useState([]);
  const[rating,setRating] = useState([]);
  const[epi,setEpi] = useState([]);
  const[rank,setRank] = useState([]);
  
  return (
    <div>
      <GetAnime genres={genres} rating={rating} episodes={episodes} startDate={startDate} setAir={setAir} setRank = {setRank} setEpi={setEpi} setRating ={setRating}/>
    </div>
  )
}

export default App
