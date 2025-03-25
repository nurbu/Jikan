import React,{useEffect,useState} from 'react'

const GetAnime = () => {
  const[animes, setAnimes] = useState([]);
  const[loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchAnime = async () =>{
        const response = await fetch('https://api.jikan.moe/v4/anime?limit=5');
        const json = await response.json();
        setAnimes(json.data)
        setLoading(false);
    }
    fetchAnime();
  },[]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        animes.map((anime) => (
          <div key={anime.mal_id}>
            {anime?.user?.username && 
            <h2>
                {anime.user.username}
                </h2>
                }
            {anime.images?.jpg?.image_url && (
              <img src={anime.images.jpg.image_url} alt={anime.title} />
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default GetAnime;