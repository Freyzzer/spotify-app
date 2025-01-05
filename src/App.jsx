import { useEffect, useState } from "react";
import { getSpotifyToken } from "./spotify";

function App() {
  const [newReleases, setNewReleases] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getSpotifyToken();

        const response = await fetch(
          'https://api.spotify.com/v1/browse/new-releases',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Spotify data");
        }

        const data = await response.json();
        setNewReleases(data.albums.items);
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Spotify New Releases</h1>
      {newReleases ? (
        <ul>
          {newReleases.map((album) => (
            <li key={album.id}>
              <strong>{album.name}</strong> by {album.artists[0].name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
