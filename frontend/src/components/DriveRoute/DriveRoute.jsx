import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const DriveRoute = () => {
  const location = useLocation();

  //JSON形式↓↓
  const spotId = location.state.spotId;

  useEffect(() => {
    console.log(spotId);
  }, []);

  return (
    <>
      <div>driveroute</div>
      {spotId.map(one => (
        <div key={one}>{one}</div>
      ))}
    </>
  );
};
