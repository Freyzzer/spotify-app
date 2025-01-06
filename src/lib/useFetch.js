import {useEffect,useState} from "react";
import {getSpotifyToken} from "../spotify.js";

export function useFetch(url, token) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                //Validacion del Token
                if (response.status === 401) {
                    // Si el token está vencido, intenta renovarlo
                    const newToken = await getSpotifyToken();
                    localStorage.setItem("access_token", newToken);
                    return; // Evita procesar la respuesta con el token inválido
                }

                const Data = await response.json();
                setData(Data);
            } catch (error) {
                console.log("Error fetching Spotify data:", error);
            }finally {
                setLoading(false);
            }

        };

        fetchData();
    },[url,token]);

    return {data, loading};
}