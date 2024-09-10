import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import Friends from './pages/Friends';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import TasksPage from './pages/TasksPage';
import UsersPage from './pages/UsersPage';
import CreateTask from './pages/CreateTask'; // Yeni create task sayfasını ekleyin
import Footer from './components/Footer'; // Footer bileşenini içe aktarın
import AdminLayout from './components/AdminLayout'; // AdminLayout bileşenini içe aktarın
import './App.css';
import Game from './Game';
import GamesPage from './pages/GamesPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/game" element={<Game />} />
          <Route
            path="/admin"
            element={isLoggedIn ? <Admin /> : <AdminLogin onLogin={setIsLoggedIn} />}
          />
          <Route path="/admin/tasks" element={<AdminLayout><TasksPage /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><UsersPage /></AdminLayout>} />
          <Route path="/admin/home" element={<AdminLayout><Admin /></AdminLayout>} />
          <Route path="/admin/games" element={<AdminLayout><GamesPage /></AdminLayout>} />
          <Route path="/admin/create-task" element={<AdminLayout><CreateTask /></AdminLayout>} />
        </Routes>
        <FooterWrapper />
      </div>
    </Router>
  );
};

const FooterWrapper = () => (
  <Footer />
);

export default App;
