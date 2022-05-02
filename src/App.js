import './App.scss';
import React from 'react';
import {
  BrowserRouter as Router, Routes,
  Route,
} from 'react-router-dom'
import Home from './components/Home/Home';
import MovieDetail from './components/MovieDetail/MovieDetail';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <div className='container'>

          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/movie/:imdbID' element={<MovieDetail />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
