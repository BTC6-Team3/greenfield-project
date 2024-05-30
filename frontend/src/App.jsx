import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { InputPage } from "./pages/InputPage";
import { SignupPage } from "./pages/SignupPage";
import { SigninPage } from "./pages/SigninPage";

function App() {
  return (
    <>
      <MantineProvider>
        <Routes>
          <Route path="signup" element={<SignupPage />} />
          <Route path="input" element={<InputPage />} />
          <Route path="signin" element={<SigninPage />} />
        </Routes>
      </MantineProvider>
    </>
  );
}

export default App;
