const getSpotifyToken = async () => {
    const clientId = 'eccbe0eed5c44ffc8a02057e5373e270';
    const clientSecret = 'd61b5d848f234c63a38583a71b5420bb';
    const credentials = btoa(
        `${clientId}:${clientSecret}`
    );

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: "POST",
            headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        });

        if (!response.ok) {
            throw new Error("Failed to get Spotify token");
        }

        const data = await response.json();
        console.log('data',data);
        console.log("Spotify token:", data.access_token); // Imprime el token en consola
        return data.access_token; // Retorna solo el token
    } catch (error) {
        console.error("Error fetching Spotify token:", error);
        throw error;
    }
};

export { getSpotifyToken };
