import React,{useEffect,useState} from 'react'

const GetAnime = ({genres,rating,episodes,startDate}) => {
  const[animes, setAnimes] = useState([]);
  const[loading, setLoading] = useState(true);
  
  const[ebutt,setEbutt] = useState(false);
  const[airbutt,setAirbutt] = useState(false);
  const[ratbutt,setRatbutt] = useState(false);
  const[ranbutt,setRanbutt]= useState(false);
  
 
  useEffect(() => {
    const fetchAnime = async () =>{
        const response = await fetch('https://api.jikan.moe/v4/anime?limit=10');
        const json = await response.json();
        setAnimes(json.data)
        setLoading(false);
    }
    fetchAnime();
    
  },[]);
  const updateStates = () =>{
    if (ebutt){setEpi(...epi,anime.episodes);}
    if (airbutt){setAir(...air,anime.aired.from);}
    if (ratbutt){setRat(...rating,anime.rating);}
    if(ranbutt){setRank(...rank,anime.rank);}
  }

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        animes.map((anime) => {
          if (!genres.includes(anime.genres) && !rating.includes(anime.rating) && !episodes.includes(anime.episodes) && !startDate.includes(anime.start_date)){
            return (
              <div key={anime.mal_id}>
                <img src={anime.images.jpg.image_url} alt={anime.title} />
                <h2>{anime.title}</h2>
                <div style={{display:'flex'}}>
                
                <form action="updateStates">
                <button type='button'>{anime.episodes}</button>
                <button type='button'>{anime.aired.from}</button>
                <button type='button'>{anime.rating}</button>
                <button type='button'>{anime.rank}</button>
                <button >Submit</button>
                </form>
                </div>
              </div>
              
            )
          }
          return null;
        }
      ))}
    </div>
  )
}

export default GetAnime;