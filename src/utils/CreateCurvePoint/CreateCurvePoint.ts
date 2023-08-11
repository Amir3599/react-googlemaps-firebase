export function createCurvedPoints(places: [google.maps.LatLngLiteral | undefined, google.maps.LatLngLiteral | undefined], numPoints: number) {
    const start = places[0]
    const end = places[1]
    const curvePoints: google.maps.LatLngLiteral[] = [];
    if (start && end) {
        for (let i = 0; i <= numPoints; i++) {
            const t = i / numPoints;
            const lat = (1 - t) * start.lat + t * end.lat;
            const lng = (1 - t) * start.lng + t * end.lng;
            curvePoints.push({ lat, lng });
        }
    }
    return curvePoints;
}  