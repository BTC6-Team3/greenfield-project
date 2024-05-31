import { Button, Center, Checkbox, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SelectSpot = () => {
  const [spots, setSpots] = useState([]);
  const [checkedSpot, setCheckedSpot] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const areaId = location.state.areaId;
  const areaName = location.state.areaName;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      select: false,
    },

    validate: {
      select: value => (value === "" ? "エリアを選択してください。" : null),
    },
  });

  const submit = () => {
    navigate("/drive_route", { state: { spotId: checkedSpot } });
  };

  useEffect(() => {
    (async () => {
      const spotList = await axios(`/api/spots/${areaId}`).then(res => res.data);
      setSpots(spotList);
      // console.log(spotList);
    })();
  }, []);
  return (
    <>
      <h1>{areaName}</h1>
      <Center>
        <Flex mih={50} gap="md" justify="center" align="left" direction="column" wrap="wrap">
          <form onSubmit={form.onSubmit(submit)}>
            <Checkbox.Group value={checkedSpot} onChange={setCheckedSpot}>
              {spots.map(obj => (
                <Checkbox label={obj.name} value={JSON.stringify(obj)} key={obj.tourist_spot_id} />
              ))}
            </Checkbox.Group>
            <Button variant="filled" color="gray" radius="xl" type="submit">
              プランを見る
            </Button>
          </form>
        </Flex>
      </Center>
    </>
  );
};
