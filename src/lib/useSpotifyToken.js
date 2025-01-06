import {useEffect,useState} from "react";
import {getSpotifyToken} from "../spotify.js";

export const useSpotifyToken = () => {
    const [token, setToken] = useState(() => localStorage.getItem("spotifyToken"));
    // console.log('fuera del if', token)
    useEffect(() => {
        const isTokenExpired = () => {
            const expirationTime = localStorage.getItem("expiration_time");
            return !expirationTime || Date.now() > parseInt(expirationTime, 10)
        };
        const refreshTokenIfNeeded = async () => {
            if (isTokenExpired()) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("expiration_time");

                try {

                    const {accessToken, expires} = await getSpotifyToken(); //obtiene el token
                    localStorage.setItem("spotifyToken", accessToken);
                    localStorage.setItem("expiresIn", expires);
                    setToken(accessToken);
                } catch (error) {
                    console.log("Error al renovar el token:", error);
                    setToken(null); // Fuerza al usuario a hacer login nuevamente
                }
            }
        };

        refreshTokenIfNeeded();
    }, []);

    const handleChange = async (e) => {

        try{
            const {getToken, getTimeExpires} = await getSpotifyToken(); //obtiene el token
            setToken(getToken);
            localStorage.setItem('spotifyToken', getToken); // se guarda el token en cache
            localStorage.setItem('expiresIn', getTimeExpires);
            e.preventDefault();
        }catch (error) {
            console.log("Error fetching Spotify data:", error);
        }
    }

    return {token, setToken, handleChange};
}