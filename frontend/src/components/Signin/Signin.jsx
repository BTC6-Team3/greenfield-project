import { Button, Group, TextInput, Anchor, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";

export const Signin = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "無効なEメールアドレスです。",
      password: (value) =>
        value.length < 6 ? "パスワードは６文字以上で入力してください" : null,
    },
  });
  return (
    <>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack gap="lg" p="20px">
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
