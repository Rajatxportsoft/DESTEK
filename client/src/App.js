import './App.css';
import FormComponent from './components/formComponent';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './components/privateRoutes';
import ReferralUserList from './components/ReferralUserList';
import Login from './Pages/login';
import Header from './components/Header';
import UpdateProfile from './components/UpdateProfile';
import ReferPage from './Pages/referPage';

function App() {
  return (

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<FormComponent />} />
          <Route path="/:id" element={<FormComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/referrals" element={<PrivateRoute element={<ReferralUserList />} />} />
          <Route path="/update" element={<PrivateRoute element={<UpdateProfile />} />} />
          <Route path="/refer/:id" element={<PrivateRoute element={<ReferPage />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>

  );
}

export default App;
