import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
// import CandidateSearch from './pages/CandidateSearch';
// import SavedCandidates from './pages/SavedCandidates';

const App: React.FC = () => {
  return (
    <>
      <Nav />
      <main>
        <Outlet/>
        {/* <Routes>
          <Route path="/candidate-search" Component={CandidateSearch} />
          <Route path="/saved-candidates" Component={SavedCandidates} />
        </Routes> */}
      </main>
    </>
  );
}

export default App;
