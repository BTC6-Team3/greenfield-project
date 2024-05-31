import { Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./Input.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export const Input = () => {
  const [areas, setAreas] = useState([]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      area: "",
    },

    validate: {
      area: value => (value === "" ? "エリアを選択してください。" : null),
    },
  });

  useEffect(() => {
    (async () => {
      const areaList = await axios("/api/areas").then(res => res.data);
      setAreas(areaList);
      console.log(areaList);
      console.log(
        areaList.map(obj => {
          return { value: obj.area_id, label: obj.area_name };
        })
      );
    })();
  }, []);

  return (
    <form className={classes.form} onSubmit={form.onSubmit(values => console.log(values))}>
      <h1>入力項目</h1>

      <Select
        className={classes.select}
        label="ドライブエリア"
        withAsterisk
        placeholder="エリアを選択"
        data={areas.map(obj => ({ value: String(obj.area_id), label: obj.area_name }))}
        key={form.key("area")}
        {...form.getInputProps("area")}
      />
      <br />
      <br />
      <Group className={classes.group} justify="flex-end" mt="md">
        <Button className={classes.button} variant="filled" color="gray" radius="xl" type="submit">
          プランを作成
        </Button>
      </Group>
    </form>
  );
};
