import { Button, Center, Checkbox, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SelectSpot = () => {
  const [spots, setSpots] = useState([]);
  const [checkedSpot, setCheckedSpot] = useState([]);
  const [areaForWether, setareaForWether] = useState(null);
  const [weather, setWeather] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const areaId = location.state.areaId;
  const areaName = location.state.areaName;
  const dateTime = location.state.dateTime;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      select: false,
    },

    validate: {
      select: (value) => (value === "" ? "エリアを選択してください。" : null),
    },
  });

  const submit = () => {
    navigate("/drive_route", { state: { spotLocation: checkedSpot } });
  };

  useEffect(() => {
    (async () => {
      const spotList = await axios(`/api/spots/${areaId}`).then(
        (res) => res.data
      );
      setSpots(spotList);
      console.log(spotList);
      setareaForWether([spotList[0].latitude, spotList[0].longitude]);
    })();
  }, []);

  useEffect(() => {
    console.log(areaForWether);
    areaForWether !== null &&
      (async () => {
        const path = `lat=${areaForWether[0]}&lon=${areaForWether[1]}`;
        const wetherArr = await axios(
          `https://api.openweathermap.org/data/2.5/forecast?${path}&appid=${import.meta.env.VITE_API_KEY}`
        ).then((res) => res.data.list);
        const diff = Math.ceil((dateTime - new Date()) / 86400000);
        if (diff === 0) {
          setWeather(wetherArr[0].weather[0].main);
        } else if (diff >= 1 && diff <= 5) {
          setWeather(wetherArr[7 + (diff - 1) * 8].weather[0].main);
        } else {
          setWeather("Clear");
        }
      })();
  }, [areaForWether]);

  return (
    <>
      {weather !== null && spots.length !== 0 ? (
        <>
          <h1>{areaName}</h1>
          <Center>
            <Flex
              mih={50}
              gap="md"
              justify="center"
              align="left"
              direction="column"
              wrap="wrap"
            >
              <form onSubmit={form.onSubmit(submit)}>
                {weather === "Clear" || weather === "Clouds" ? (
                  <Checkbox.Group value={checkedSpot} onChange={setCheckedSpot}>
                    {spots.map((obj) => (
                      <Checkbox
                        label={obj.name}
                        value={JSON.stringify(obj)}
                        key={obj.tourist_spot_id}
                      />
                    ))}
                  </Checkbox.Group>
                ) : (
                  <Checkbox.Group value={checkedSpot} onChange={setCheckedSpot}>
                    {[
                      ...spots.filter((obj) => obj.in_or_out === "屋内"),
                      ...spots.filter((obj) => obj.in_or_out === "屋外"),
                    ].map((obj) => (
                      <Checkbox
                        label={obj.name}
                        value={JSON.stringify(obj)}
                        key={obj.tourist_spot_id}
                      />
                    ))}
                  </Checkbox.Group>
                )}

                <Button variant="filled" color="gray" radius="xl" type="submit">
                  プランを見る
                </Button>
              </form>
            </Flex>
          </Center>
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};
