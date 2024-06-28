import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import State from './context/state';
import Alert from './components/Alert';
import Footer from './components/Footer';
import { useState } from 'react';
import LoginSignup from './components/loginsignup/LoginSignup';
import Navbar from './components/Navbar';
import Studs from './components/Studs/Studs';
import Result from './components/Result/Result';


function App() {
  const [alert, setAlert] = useState<{ msg: string; type: string } | undefined>(undefined);
  const showAlert = (message: string, type: string) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(undefined);
    }, 1500);
  };

  return (
    <>
      <State>
        <Router>
          <div style={{ minHeight: "100vh" }}>
            <Navbar showAlert={showAlert}/>
            <Alert alert={alert} />
            <Routes>
              <Route path="/" element={<LoginSignup showAlert={showAlert} />} />
              <Route path="/studs" element={<Studs showAlert={showAlert} />} />
              <Route path="/result" element={<Result />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </State>
    </>
  );
}

export default App;
