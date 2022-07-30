import { Route, Routes } from 'react-router-dom';
import ErrorMessage from './layouts/ErrorMessage';
import Practice from './pages/Practice';
import Rank from './pages/Rank';

function App() {
  return (
    <div className="container grid place-content-center py-10 text-center">
      <Routes>
        <Route path="/">
          <Route index element={<Practice />} />
          <Route path="/rank" element={<Rank />} />
        </Route>
        <Route path="*" element={<ErrorMessage message="Page Not Found" />} />
      </Routes>
    </div>
  );
}

export default App;
