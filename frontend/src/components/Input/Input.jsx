import { Button, Group, TextInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./Input.module.css";

export const Input = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      area: "",
      startPoint: "",
      timeRequired: "",
    },

    validate: {
      area: (value) => (value === "" ? "エリアを選択してください。" : null),
      startPoint: (value) =>
        value === "" ? "出発地点を選択してください。" : null,
      timeRequired: (value) =>
        value === "" ? "時間を選択してください。" : null,
    },
  });

  return (
    <form
      className={classes.form}
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <h1>入力項目</h1>
      <Select
        className={classes.select}
        label="ドライブエリア"
        withAsterisk
        placeholder="エリアを選択"
        data={["10km", "20km", "30km", "40km"]}
        key={form.key("area")}
        {...form.getInputProps("area")}
      />
      <br />
      <br />

      <TextInput
        className={classes.select}
        label="出発地点"
        withAsterisk
        placeholder="住所を入力"
        key={form.key("startPoint")}
        {...form.getInputProps("startPoint")}
      />
      <br />
      <br />

      <Select
        className={classes.select}
        label="所要時間"
        withAsterisk
        placeholder="時間を選択"
        data={["1時間", "2時間", "3時間", "4時間"]}
        key={form.key("timeRequired")}
        {...form.getInputProps("timeRequired")}
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
  );
};
