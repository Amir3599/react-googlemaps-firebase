import { DEFAULT_ZOOM } from "../../common/constants";

export const createMarkerIcon = (color: string) => {
    return `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;
};

//calc zoom after select two points
export const calculateZoomLevel = (map: google.maps.Map, points: google.maps.LatLngLiteral[]): number => {
    if (points.length < 2) {
        return DEFAULT_ZOOM; // Default zoom level if there are not enough points
    }

    const bounds = new google.maps.LatLngBounds();
    for (const point of points) {
        bounds.extend(point);
    }

    const padding = 100; // Adjust this value to control padding around the bounds
    map.fitBounds(bounds, padding);

    const zoom = map.getZoom();
    return zoom ?? DEFAULT_ZOOM;
};

function calculateDistance(point1: google.maps.LatLngLiteral, point2: google.maps.LatLngLiteral) {
    const xDiff = point2.lng - point1.lng;
    const yDiff = point2.lat - point1.lat;
    const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    return distance;
}

// calc line curve factor
function calculateFactor(dist: number): number {
    if (dist >= 70) return 0.45
    if (70 > dist && dist >= 20) return 0.30
    if (20 > dist && dist >= 10) return 0.15
    if (10 > dist && dist >= 3) return 0.0075
    if (3 > dist && dist >= 1) return 0.00050
    if (1 > dist) return 0
    return 0
}

interface calcCPOutput {
    controlPoint?: google.maps.LatLngLiteral
    midPoint?: google.maps.LatLngLiteral

}

// calc a point to draw curved line dou to it
export function calculateDynamicControlPoint(start?: google.maps.LatLngLiteral, end?: google.maps.LatLngLiteral): calcCPOutput | undefined {

    if (start && end) {
        const distance = calculateDistance(start, end)
        console.log(distance);

        const calculatedFactor = calculateFactor(distance)

        const midPoint = {
            x: (start.lng + end.lng) / 2,
            y: (start.lat + end.lat) / 2,
        };

        const offset = {
            x: (midPoint.x - (start.lat + end.lat) / 2) * calculatedFactor,
            y: (midPoint.y - (start.lng + end.lng) / 2) * calculatedFactor,
        };

        const data: calcCPOutput = {
            controlPoint: {
                lng: midPoint.x + offset.x,
                lat: midPoint.y + offset.y,
            },
            midPoint: {
                lng: midPoint.x,
                lat: midPoint.y
            }
        };

        return data;
    }
}

// points to draw curved line
export function getCurvePoints(p0?: google.maps.LatLngLiteral, p1?: google.maps.LatLngLiteral, p2?: google.maps.LatLngLiteral, t?: number): any {
    if (p0 && p1 && p2 && t) {
        const x = (1 - t) * (1 - t) * p0.lat + 2 * (1 - t) * t * p1.lat + t * t * p2.lat;
        const y = (1 - t) * (1 - t) * p0.lng + 2 * (1 - t) * t * p1.lng + t * t * p2.lng;
        return { lat: x, lng: y };
    }
}