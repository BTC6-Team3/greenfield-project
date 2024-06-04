import { Image, Title } from "@mantine/core";
import { Signup } from "../../components/Signup";

export const SignupPage = () => {
  return (
    <>
      <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"></Image>
      <Title order={2} mt={20} ml={20}>
        アカウント新規作成
      </Title>
      <Signup />
    </>
  );
};
