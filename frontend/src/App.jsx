import { useState } from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Signup } from "./components/Signup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MantineProvider>
        <Signup />
      </MantineProvider>
    </>
  );
}

export default App;
