import { useState } from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { InputPage } from "./pages/InputPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MantineProvider>
        <Routes>
          <Route path="signup" element={<SignupPage />} />
          <Route path="input" element={<InputPage />} />
        </Routes>
      </MantineProvider>
    </>
  );
}

export default App;
