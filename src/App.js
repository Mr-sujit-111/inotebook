import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';
import Notes from './components/Notes';
import NoteState from './context/NoteState';
import Home from './components/Home';
import List from './components/List';
import Operation from './components/Operations'
import AddNote from './components/AddNote';
import Login from './components/Login';
import Register from './components/Register';
import ProfileState from './context/ProfileState';

function App() {
  return (
    <>
      <ProfileState>
        <NoteState>
          <BrowserRouter>
            <div className="App">
              <Navbar navbarTitle="i-Notebook" />
              <Routes>
                <Route path="/About" element={<About />}>
                </Route>
                <Route path="/Home" element={<Home />}>
                </Route>
                <Route path="/Notes" element={<Notes />}>
                </Route>
                <Route path="/Operations" element={<Operation />}>
                </Route>
                <Route path="/AddNote" element={<AddNote />}>
                </Route>
                <Route path="/List" element={<List />}>
                </Route>
                <Route path="/Register" element={<Register />}>
                </Route>
                <Route path="/login" element={<Login />}>
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </NoteState>
      </ProfileState>
    </>
  );
}

export default App;
