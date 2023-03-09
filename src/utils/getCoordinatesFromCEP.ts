interface Coordinates {
    lat: number;
    lng: number;
}

export async function getCoordinatesFromCEP(cep: string): Promise<Coordinates> {
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.status === "OK") {
        const location = data.results[0].geometry.location;

        return {
            lat: location.lat,
            lng: location.lng,
        };
    } else {
        throw new Error(`Não foi possível obter as coordenadas para o CEP informado`);
    }

}