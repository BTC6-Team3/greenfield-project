import {
  Button,
  Group,
  TextInput,
  Title,
  Anchor,
  Image,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./Signin.module.css";

export const Signin = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "パスワードは６文字以上で入力してください" : null,
    },
  });
  return (
    <>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"></Image>
        <Stack gap="lg" p="15px">
          <Title order={2}>ようこそ</Title>
          <TextInput
            withAsterisk
            label="Email"
            size="md"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <TextInput
            withAsterisk
            label="Password"
            size="md"
            placeholder="パスワードを入力"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <Group justify="flex-start" mt="md">
            <Button type="submit" fullWidth size="lg" color="indigo">
              ログイン
            </Button>
            <Anchor href="/signup" underline="always">
              アカウントの新規作成
            </Anchor>
          </Group>
        </Stack>
      </form>
    </>
  );
};
