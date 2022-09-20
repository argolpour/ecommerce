import Home from "./Routes/home/Home";
import { Routes, Route } from 'react-router-dom'
import Navigation from "./Routes/Navigation/Navigation";
import Authentication from "./Routes/Authentication/Authentication";

const Shop = () => {
  return (
    <h2>Shop Container</h2>
  )
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
