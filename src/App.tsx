import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './pages/kraedt/Header';
import { Footer } from './pages/kraedt/Footer';
import { Home } from './pages/kraedt/Home';
import { Home as SbbHome } from './pages/sonicbreakbeat/Home';
import { Music } from './pages/kraedt/Music';
import { Page } from './pages/Page';

const Kraedt = () => (
  <>
    <Header />
    <main className="body-content">
      <Home />
    </main>
    <Footer />
  </>
)

const SonicBreakbeat = () => (
  <>
    <Header />
    <main className="body-content">
      <SbbHome />
    </main>
    <Footer />
  </>
)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Kraedt />} />
          <Route path="/music" element={<Music />} />
        </Route>
        <Route>
          <Route path="/sonicbreakbeat" element={<SonicBreakbeat />} />
          {//<Route path="/sonicbreakbeat/music" element={<SbbMusic />} />
          }
        </Route>
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
