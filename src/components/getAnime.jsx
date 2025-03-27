import React,{useEffect,useState} from 'react'
import '../components/anime.css';

const GetAnime = ({genres,rating,episodes,startDate,setGenre,setAir,setEpi,setRating}) => {
  const[animes, setAnimes] = useState([]);
  const[loading, setLoading] = useState(true);
  
  const[ebutt,setEbutt] = useState(false);
  const[airbutt,setAirbutt] = useState(false);
  const[ratbutt,setRatbutt] = useState(false);
  const[genbutt,setGenbutt]= useState(false);
  const[prevanime,setPrevanime] = useState([]);
  const[allpick,setAllpick] = useState([]);
  const[match,setMatch] =useState([]);
  
 
  useEffect(() => {
    const fetchAnime = async () =>{
        
            const response = await fetch('https://api.jikan.moe/v4/anime?limit=25');
            const json = await response.json();
            console.log('API Response:', json);
            setAnimes(json.data);
            setLoading(false);
      
    }
    fetchAnime();
    
  },[]);
  
  const updateStates = (anime) => {
    console.log('Before update:', { genres, rating, episodes, startDate });
    if (ebutt) setEpi([...episodes, anime.episodes]);
    if (airbutt) setAir([...startDate, anime.aired.from]);
    if (ratbutt) setRating([...rating, anime.rating]);
    if (genbutt) setGenre([...genres, anime.genres[0].name]);
    setAllpick([...episodes,...startDate,...rating,...genres, ebutt ? anime.episodes : "",airbutt ? anime.aired.from: "",
      ratbutt ? anime.rating : "", genbutt ? anime.genres[0].name : ""]);
    setMatch([...match,{
      title:anime.title,
      img: anime.images.jpg.image_url
    }])
  }
  
  

 return (
  <div>
    {loading ? <div>Loading...</div> : (
      (() =>{
       
        const matchingAnime = animes.find(anime => {
          
          return !genres.includes(anime.genres[0].name) && 
                 !rating.includes(anime.rating) && 
                 !episodes.includes(anime.episodes) && 
                 !startDate.includes(anime.aired.from);
        });
        return matchingAnime ? (
          <div className='main'>
            <div className='Seen'>
            <h2>Seen Animes</h2>
            {match.map((anime,index) =>(
              <div key={index}>
                  <img src={anime.img} alt={anime.title} />
                  <h5>{anime.title}</h5>
              </div>
            ))}
            </div>
          <div key={matchingAnime.mal_id}>
            
            <img src={matchingAnime.images.jpg.image_url} alt={matchingAnime.title} />
            <h2>{matchingAnime.title}</h2>
            <div style={{display:'flex'}}>
              <form onSubmit={(e) =>{e.preventDefault(); updateStates(matchingAnime);}}>
                <button type='button' onClick={(e) => {e.preventDefault(); setEbutt(!ebutt);}} style ={{backgroundColor: ebutt ? 'red' : ''}}>{matchingAnime.episodes}</button>
                <button type='button' onClick={(e) =>{e.preventDefault(); setAirbutt(!airbutt);}} style ={{backgroundColor: airbutt ? 'red' : ''}}>{matchingAnime.aired.from}</button>
                <button type='button' onClick={(e) =>{e.preventDefault(); setRatbutt(!ratbutt);}} style ={{backgroundColor: ratbutt ? 'red' : ''}}>{matchingAnime.rating}</button>
                <button type='button' onClick={(e) =>{e.preventDefault(); setGenbutt(!genbutt);}} style ={{backgroundColor: genbutt ? 'red' : ''}}>{matchingAnime.genres[0].name}</button>
                
                <button type='submit'>Submit</button>
              </form>
            </div>
          </div>
          <div className='Banlist'>
            <h2>Banned List</h2>
            {allpick.map((anime,index) =>(
              <div key={index}>{anime}</div>
            ))}
          </div>
          </div>
        ) : null;
      })()
    )}
  </div>
 );
}
export default GetAnime;