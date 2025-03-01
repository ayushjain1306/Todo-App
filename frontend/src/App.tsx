import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./components/account/Account";
import HomePage from "./components/home/HomePage";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;
