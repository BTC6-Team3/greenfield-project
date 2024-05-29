import { Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export const Signup = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) => (value.length < 1 ? "名前を入力してください。" : null),
      password: (value) =>
        value.length < 6 ? "パスワードは6文字以上で入力してください。" : null,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};
