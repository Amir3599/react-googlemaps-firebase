import { GoogleMap, MarkerF, LoadScript, PolylineF } from '@react-google-maps/api'
import React, { useEffect, useRef, useState } from 'react'
import { googleMapApiKey } from '../../../common/constants/firebase/FirebaseConfig'
import { DEFAULT_CENTER, DEFAULT_ZOOM, mapLibs } from '../../../common/constants'
import { getCurvePoints } from '../../../utils';
import { calculateDynamicControlPoint, calculateZoomLevel, createMarkerIcon } from '../../../utils/CreateCurvePoint/GetCurvedPoint';
import { LoadingSpinner } from '../../../components';
import { ChoosingSection } from './components';
import { ParcellsType, PricingDataBody, PricingDataRes } from '../../../common/types';
import { getPricing } from '../../../firebase/api';

interface Point {
    lat: number;
    lng: number;
}

function MapPage() {

    const [originPlace, setOriginPlace] = useState<google.maps.places.Autocomplete>()
    const [destinationPlace, setDestinationPlace] = useState<google.maps.places.Autocomplete>()

    const [curvePoints, setCurvePoints] = useState<any[]>([]) // for craete curved line

    const [places, setPlaces] = useState<[google.maps.LatLngLiteral | undefined, google.maps.LatLngLiteral | undefined]>()

    const [parcell, setParcell] = useState<ParcellsType>()
    const mapRef = useRef<google.maps.Map | null>(null)
    const [transportOpts, setTransportOpts] = useState<PricingDataRes>()

    const onGetPrice = async () => {
        // get prices according to origin and destination
        const dataToSend: Partial<PricingDataBody> = {
            origin: places?.[0],
            destination: places?.[1],
            ...parcell,
        }
        await getPricing(dataToSend).then(setTransportOpts)
    }

    const handleMapLoaded = (map: google.maps.Map) => {
        mapRef.current = map
        mapRef.current.setZoom(DEFAULT_ZOOM)
        mapRef.current.setCenter(DEFAULT_CENTER)
    }

    const onMapClick = (e: google.maps.MapMouseEvent) => {
        // todo: handle click on map
        console.log(e.latLng);
    }

    const onPlaceChanged = (isOrigin: boolean) => {
        if (originPlace != null && isOrigin) {
            const place = originPlace.getPlace()
            if (place) {
                setPlaces((prev) => [place.geometry?.location?.toJSON(), prev && prev[1]])
                mapRef.current?.setCenter(place.geometry?.location?.toJSON() ?? DEFAULT_CENTER)
            }
            return
        }
        if (destinationPlace != null && !isOrigin) {
            const place = destinationPlace.getPlace()
            if (place) {
                setPlaces((prev) => [prev && prev[0], place.geometry?.location?.toJSON()])
            }
        }
    }

    // point for calculate curved line
    const controlPoint = calculateDynamicControlPoint(places?.[0], places?.[1])

    const createPointsArr = () => {
        const curvePoints: Point[] = []
        for (let t = 0; t <= 1; t += 0.01) {
            const start = places?.[0]
            const end = places?.[1]
            if (start && end) {
                const point = getCurvePoints(start, controlPoint?.controlPoint, end, t);
                curvePoints.push(point);
            }
        }
        return { curvePoints, midPoint: controlPoint?.midPoint }
    }

    // Calculate points along the curve
    useEffect(() => {
        if (places?.[0] && places[1] && mapRef.current) {
            const arr = createPointsArr()

            const zoomLvl = calculateZoomLevel(mapRef.current, [places[0], places[1]])
            mapRef.current?.setCenter(arr.midPoint ?? DEFAULT_CENTER)
            mapRef.current.setZoom(zoomLvl)
            setCurvePoints(arr.curvePoints)
            // setCenter(arr.midPoint)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [places])

    return (
        <div className='w-full h-full map-grid-container'>
            <LoadScript
                libraries={mapLibs}
                loadingElement={<LoadingSpinner />}
                googleMapsApiKey={googleMapApiKey}
            >
                <div className='map-grid-left pr-4 pl-1'>
                    <ChoosingSection
                        onPlaceChanged={onPlaceChanged}
                        setDestinationPlace={setDestinationPlace}
                        setOriginPlace={setOriginPlace}
                        setParcellType={setParcell}
                        parcelType={parcell}
                        onGetPrice={onGetPrice}
                        transportOpts={transportOpts}
                        places={[originPlace, destinationPlace]}
                    />
                </div>
                <div className='map-grid-right flex items-center justify-center'>
                    <GoogleMap
                        key={123456789}
                        onLoad={handleMapLoaded}
                        mapContainerClassName='w-full h-full'
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        onClick={onMapClick}
                        options={{ minZoom: 2 }} // to avoid show multiple map
                    >
                        {places?.map((item, i) => (
                            item &&
                            <MarkerF
                                key={item.lat}
                                position={item}
                                icon={createMarkerIcon(i === 0 ? 'blue' : 'orange')}
                            />
                        ))}

                        {curvePoints.length > 0 && (
                            <PolylineF
                                key={'curvedPoly'}
                                path={curvePoints.filter(Boolean)}
                                options={{
                                    strokeColor: '#1f4fc8', // Line color
                                    strokeOpacity: 1,
                                    strokeWeight: 4,
                                }}
                            />
                        )}
                    </GoogleMap>
                </div>
            </LoadScript>
        </div>
    )
}

export default MapPage