import { Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput, DatesProvider } from "@mantine/dates";
import "dayjs/locale/ja";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import classes from "./Input.module.css";

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
      area: (value) => (value === "" ? "エリアを選択してください。" : null),
    },
  });

  const submit = (id) => {
    const areaName = areas.filter((obj) => obj.area_id === Number(id.area))[0]
      .area_name;
    navigate("/select_spot", {
      state: { areaId: id.area, areaName: areaName, dateTime: dateTime },
    });
  };

  useEffect(() => {
    (async () => {
      const areaList = await axios("/api/areas").then((res) => res.data);
      setAreas(areaList);
    })();
  }, []);

  return (
    <>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((id) => submit(id))}
      >
        <h1>入力項目</h1>

        <DatesProvider settings={{ firstDayOfWeek: 0, locale: "ja" }}>
          <DatePickerInput
            placeholder="日付を選択"
            value={dateTime}
            onChange={setdateTime}
            // icon={<CalendarIcon width={24} height={24} />}
            classNames={{
              icon: "fill-gray-500",
              input: "border-1 border-gray-200",
              placeholder: "text-gray-200",
              root: "max-w-[294px] bg-white rounded min-w-[120px]",
            }}
            clearble
            // key={form.key("wether")}
            // {...form.getInputProps("wether")}
          />
        </DatesProvider>

        <Select
          className={classes.select}
          label="ドライブエリア"
          withAsterisk
          placeholder="エリアを選択"
          data={areas.map((obj) => ({
            value: String(obj.area_id),
            label: obj.area_name,
          }))}
          key={form.key("area")}
          {...form.getInputProps("area")}
        />

        <br />
        <br />

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
      </form>
    </>
  );
};
