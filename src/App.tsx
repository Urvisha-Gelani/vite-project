import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Layout from "./layout";
import Users from "./components/users";

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Users/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
