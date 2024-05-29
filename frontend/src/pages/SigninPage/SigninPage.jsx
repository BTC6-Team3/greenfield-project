import { Signin } from "../../components/Signin";
import { Title, Image } from "@mantine/core";

export const SigninPage = () => {
  return (
    <>
      <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"></Image>
      <Title order={2}>ようこそ</Title>
      <Signin />
    </>
  );
};
