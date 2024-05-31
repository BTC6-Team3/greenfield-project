import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
import { InputPage } from './pages/InputPage';
import { SignupPage } from './pages/SignupPage';
import { SigninPage } from './pages/SigninPage';
import { DriveRoutePage } from './pages/DriveRoutePage';

function App() {
  return (
    <>
      <MantineProvider>
        <Routes>
          <Route path="signup" element={<SignupPage />} />
          <Route path="input" element={<InputPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="drive_route" element={<DriveRoutePage />} />
          <Route path="/" element={<SignupPage />} />
        </Routes>
      </MantineProvider>
    </>
  );
}

export default App;
