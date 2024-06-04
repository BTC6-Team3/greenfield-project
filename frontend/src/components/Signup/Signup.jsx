import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export const Signup = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: value => (value.length < 1 ? "名前を入力してください。" : null),
      password: value => (value.length < 6 ? "パスワードは6文字以上で入力してください。" : null),
    },
  });

  const handleOnSubmit = async values => {
    await axios.post("/signUp", values);
    return navigate("/input");
  };
  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
      <Stack gap="lg" p="20px">
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <TextInput
          withAsterisk
          label="Name"
          placeholder="ネーム"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          label="Password"
          placeholder="パスワード"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">作成</Button>
        </Group>
      </Stack>
    </form>
  );
};
