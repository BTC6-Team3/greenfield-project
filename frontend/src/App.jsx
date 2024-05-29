import { useState } from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/SignupPage";
import { SigninPage } from "./pages/SigninPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MantineProvider>
        <Routes>
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<SigninPage />} />
        </Routes>
      </MantineProvider>
    </>
  );
}

export default App;
