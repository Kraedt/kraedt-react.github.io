import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './pages/kraedt/Header';
import { Footer } from './pages/kraedt/Footer';
import { HomePage } from './pages/kraedt/HomePage';
import { MusicPage } from './pages/kraedt/MusicPage';
import { ReactElement } from 'react';
import { SongPage } from './pages/kraedt/SongPage';
import { Page404 } from './pages/kraedt/Page404';
import { Home as SbbHome } from './pages/sonicbreakbeat/HomePage';
import { Page404 as SbbPage404 } from './pages/sonicbreakbeat/Page404';

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
          <Route path="/" element={<Kraedt page={<HomePage />} />} />
          <Route path="/music" element={<Kraedt page={<MusicPage />} />} />
          <Route path="/music/song/:songId" element={<Kraedt page={<SongPage />} />} />
        </Route>
        <Route>
          <Route path="/sonicbreakbeat" element={<SonicBreakbeat page={<SbbHome />} />} />
          {//<Route path="/sonicbreakbeat/music" element={<SbbMusic />} />
          }
          <Route path="/sonicbreakbeat/*" element={<SonicBreakbeat page={<SbbPage404 />} />} />
        </Route>
        <Route path="*" element={<Kraedt page={<Page404 />} />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
