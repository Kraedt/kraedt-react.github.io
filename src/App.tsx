import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './pages/kraedt/Header';
import { Footer } from './pages/kraedt/Footer';
import { Home } from './pages/kraedt/Home';
import { Home as SbbHome } from './pages/sonicbreakbeat/Home';
import { Music } from './pages/kraedt/Music';
import { ReactElement } from 'react';

type PageProps = { page: ReactElement }

const Kraedt = ({ page }: PageProps) => (
  <>
    <Header />
    <main className="body-content">
      {page}
    </main>
    <Footer />
  </>
)

const SonicBreakbeat = ({ page }: PageProps) => (
  <>
    <Header />
    <main className="body-content">
      {page}
    </main>
    <Footer />
  </>
)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Kraedt page={<Home />} />} />
          <Route path="/music" element={<Kraedt page={<Music />} />} />
        </Route>
        <Route>
          <Route path="/sonicbreakbeat" element={<SonicBreakbeat page={<SbbHome />} />} />
          {//<Route path="/sonicbreakbeat/music" element={<SbbMusic />} />
          }
        </Route>
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
