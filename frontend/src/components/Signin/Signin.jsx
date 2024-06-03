import { Button, Group, TextInput, Anchor, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const navigate = useNavigate();
  const [passLabel, setPassLabel] = useState("");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "無効なEメールアドレスです。"),
      password: value => (value.length < 6 ? "パスワードは６文字以上で入力してください" : null),
    },
  });
  const handleOnSubmit = async values => {
    console.log(values);
    try {
      await axios.post("/signIn", values);
      setPassLabel("");
      return navigate("/input");
    } catch (error) {
      if (error.response.status === 401) {
        setPassLabel("メールアドレスもしくはパスワードが不一致");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleOnSubmit)}>
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
          <Text c="white" bg="red">
            {passLabel}
          </Text>

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
