import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Center, Group, Select, Space } from "@mantine/core";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import { useForm } from "@mantine/form";
import "@mantine/dates/styles.css";

import classes from "./Input.module.css";
import { Footer } from "../Footer/Footer";

export const Input = () => {
  const [areas, setAreas] = useState([]);
  const [dateTime, setdateTime] = useState(null);
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      area: "",
    },

    validate: {
      area: value => (value === "" ? "エリアを選択してください。" : null),
    },
  });

  const submit = id => {
    const areaName = areas.filter(obj => obj.area_id === Number(id.area))[0].area_name;
    navigate("/select_spot", {
      state: { areaId: id.area, areaName: areaName, dateTime: dateTime },
    });
  };

  const logout = () => {
    axios.post("/logout");
    navigate("/signin");
  };

  useEffect(() => {
    (async () => {
      const areaList = await axios("/api/areas").then(res => res.data);
      setAreas(areaList);
    })();
  }, []);

  return (
    <>
      <form className={classes.form} onSubmit={form.onSubmit(id => submit(id))}>
        <h1 style={{ fontSize: "25px" }}>プランを考える</h1>

        <DatesProvider settings={{ firstDayOfWeek: 0, locale: "ja" }}>
          <DatePickerInput
            placeholder="日付を選択"
            value={dateTime}
            onChange={setdateTime}
            dropdownType="modal"
            label="日時"
          />
        </DatesProvider>

        <Space h="xl" />

        <Select
          className={classes.select}
          label="ドライブエリア"
          withAsterisk
          placeholder="エリアを選択"
          data={areas.map(obj => ({
            value: String(obj.area_id),
            label: obj.area_name,
          }))}
          key={form.key("area")}
          {...form.getInputProps("area")}
        />

        <Space h="xl" />

        <Group className={classes.group} justify="flex-end" mt="md">
          <Button
            className={classes.button}
            variant="filled"
            color="gray"
            radius="xl"
            type="submit"
          >
            プランを作成
          </Button>
        </Group>
        <Space h={"xl"} />
        <Center>
          <Button
            className={classes.button}
            variant="filled"
            color="gray"
            radius="xl"
            onClick={logout}
          >
            logout
          </Button>
        </Center>
      </form>
      <Footer />
    </>
  );
};
