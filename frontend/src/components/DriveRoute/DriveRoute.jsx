import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Map from "react-map-gl/maplibre";
import MapLibreGlDirections from "@maplibre/maplibre-gl-directions";
import "maplibre-gl/dist/maplibre-gl.css";
import { Loader } from "@mantine/core";
import { IconArrowNarrowDown } from "@tabler/icons-react";
import classes from "./DriveRoute.module.css";
import { Footer } from "../Footer/Footer";

export const DriveRoute = () => {
  const position = [35.0823, 137.1562];
  const [route, setRoute] = useState(null);
  const [currentPosition, setCurrentPosition] = useState();
  const [time, setTime] = useState();

  const location = useLocation();

  const spotLocation = location.state.spotLocation;
  const longLatiArr = spotLocation.map(obj => {
    const parce = JSON.parse(obj);
    return [parce.longitude, parce.latitude];
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCurrentPosition(`${position.coords.longitude},${position.coords.latitude}`);
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
          currentPosition + ";"
        );
        longLatiArr.unshift(currentPosition.split(","));
        const res = await axios(`https://router.project-osrm.org/table/v1/driving/${path}`);

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
      {route ? (
        <>
          <Map
            initialViewState={{
              longitude: longLatiArr[0][0],
              latitude: longLatiArr[0][1],
              zoom: 10,
            }}
            center={position}
            style={{ width: "100%", height: 350 }}
            mapStyle="https://tile.openstreetmap.jp/styles/osm-bright-ja/style.json"
            onLoad={event => {
              const directions = new MapLibreGlDirections(event.target);
              directions.interactive = false;
              directions.setWaypoints(route);
            }}
          />
          <div className={classes.plan_container}>
            <p className={classes.title}>おすすめのドライブプラン</p>
            <p className={classes.current_position}>現在地</p>
            {spotLocation.map((arr, index) => {
              const parse = JSON.parse(arr);
              return (
                <>
                  <p className={classes.time}>
                    <IconArrowNarrowDown className={classes.arrow} />
                    {`${time[index]}分`}
                  </p>
                  <p className={classes.name}>{parse.name}</p>
                </>
              );
            })}
            <p className={classes.time}>
              <IconArrowNarrowDown className={classes.arrow} />
              {`${time[time.length - 1]}分`}
            </p>
            <p className={classes.current_position}>現在地</p>
          </div>
          <Footer />
        </>
      ) : (
        <div className={classes.loader_container}>
          <Loader color="blue" size="xl" type="dots" />
        </div>
      )}
    </>
  );
};
