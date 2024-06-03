import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Map from 'react-map-gl/maplibre';
import MapLibreGlDirections from '@maplibre/maplibre-gl-directions';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect, useState } from 'react';

export const DriveRoute = () => {
  const position = [35.0823, 137.1562];
  const [route, setRoute] = useState(null);
  const [currentPosition, setCurrentPosition] = useState();
  const [time, setTime] = useState();

  const location = useLocation();

  const spotLocation = location.state.spotLocation;
  const longLatiArr = spotLocation.map((obj) => {
    const parce = JSON.parse(obj);
    return [parce.longitude, parce.latitude];
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition(
        `${position.coords.longitude},${position.coords.latitude}`
      );
    });
  }, []);

  useEffect(() => {
    if (currentPosition !== undefined) {
      (async () => {
        const path = longLatiArr.reduce(
          (acc, crr, index) =>
            index === longLatiArr.length - 1
              ? `${acc}${crr[0]},${crr[1]}`
              : `${acc}${crr[0]},${crr[1]};`,
          currentPosition + ';'
        );
        longLatiArr.unshift(currentPosition.split(','));
        const res = await axios(
          `https://router.project-osrm.org/table/v1/driving/${path}`
        );

        const timeArr = res.data.durations.map((arr, index) =>
          index === res.data.durations.length - 1
            ? Math.ceil(arr[0] / 60)
            : Math.ceil(arr[index + 1] / 60)
        );

        setTime(timeArr);
        setRoute(longLatiArr);
      })();
    }
  }, [currentPosition]);

  return (
    <>
      {route && (
        <>
          <Map
            initialViewState={{
              longitude: longLatiArr[0][0],
              latitude: longLatiArr[0][1],
              zoom: 14,
            }}
            center={position}
            style={{ width: 600, height: 400 }}
            mapStyle="https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json"
            onLoad={(event) => {
              const directions = new MapLibreGlDirections(event.target);
              directions.interactive = false;
              directions.setWaypoints(route);
            }}
          />

          <div>現在地</div>
          {spotLocation.map((arr, index) => {
            const parse = JSON.parse(arr);
            return (
              <div key={parse.tourist_spot_id}>
                <p>{time[index]}</p>
                <p>{parse.name}</p>
              </div>
            );
          })}
          <div>
            <p>{time[time.length - 1]}</p>
            <p>現在地</p>
          </div>
        </>
      )}
    </>
  );
};
