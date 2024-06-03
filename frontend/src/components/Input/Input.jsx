import { Button, Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import classes from "./Input.module.css";

export const Input = () => {
  const [areas, setAreas] = useState([]);
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
    navigate("/select_spot", { state: { areaId: id.area, areaName: areaName } });
  };

  useEffect(() => {
    (async () => {
      const areaList = await axios("/api/areas").then(res => res.data);
      setAreas(areaList);
    })();
  }, []);

  return (
    <form className={classes.form} onSubmit={form.onSubmit(id => submit(id))}>
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
