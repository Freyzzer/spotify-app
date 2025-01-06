import {useFetch} from "./lib/useFetch.js";
import {useSpotifyToken} from "./lib/useSpotifyToken.js";


function App() {
  const {token, handleChange} = useSpotifyToken();
  const {data, loading} = useFetch('https://api.spotify.com/v1/browse/new-releases', token);

  if (!token) {
    return (
        <div className="h-full w-full bg-[#08080A] flex justify-center items-center">
          <button
              onClick={handleChange}
              className="text-amber-100 bg-blue-500 px-4 py-2 rounded"
          >
            Login With Spotify
          </button>
        </div>
    );
  }

  if (loading) return <p>Loading...</p>;

  return (
      <main className="h-full w-full bg-[#08080A]">
        <div>
          {data && data.albums && data.albums.items ? (
              <ul className="text-amber-100">
                {data.albums.items.map((album) => (
                    <li key={album.id}>
                      <strong className="text-amber-100">{album.name}</strong> by{" "}
                      {album.artists[0].name}
                    </li>
                ))}
              </ul>
          ) : (
              <p className="text-amber-100">Cargando lanzamientos...</p>
          )}
        </div>
      </main>
  );
}

export default App;
