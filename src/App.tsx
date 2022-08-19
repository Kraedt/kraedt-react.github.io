import './App.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from './pages/kraedt/Header';
import { Footer } from './pages/kraedt/Footer';
import { HomePage } from './pages/kraedt/HomePage';
import { MusicPage } from './pages/kraedt/MusicPage';
import { ReactElement } from 'react';
import { SongPage } from './pages/kraedt/SongPage';
import { Page404 } from './pages/kraedt/Page404';
import { Home as SbbHome } from './pages/sonicbreakbeat/HomePage';
import { Page404 as SbbPage404 } from './pages/sonicbreakbeat/Page404';
import { OldSongRedirect } from './pages/kraedt/OldSongRedirect';

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
          <Route path="/music" element={<Kraedt page={<MusicPage safeOnly={false} />} />} />
          <Route path="/music-creator-friendly" element={<Kraedt page={<MusicPage safeOnly={true} />} />} />
          <Route path="/music/song/:songId" element={<Kraedt page={<SongPage />} />} />
          <Route path="/home/song/:oldId" element={<Kraedt page={<OldSongRedirect />} />} />
          <Route path="/music*" element={<Kraedt page={<Page404 />} />} />
        </Route>
        <Route>
          <Route path="/sonicbreakbeat" element={<SonicBreakbeat page={<SbbHome />} />} />
          {//<Route path="/sonicbreakbeat/music" element={<SbbMusic />} />
          }
          <Route path="/sonicbreakbeat/music/*" element={<SonicBreakbeat page={<SbbPage404 />} />} />
          <Route path="/sonicbreakbeat/*" element={<Navigate to='/sonicbreakbeat/' />} />
        </Route>
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
