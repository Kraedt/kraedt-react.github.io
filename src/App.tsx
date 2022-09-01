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
import { Dashboard } from './pages/admin/Dashboard';
import { useService } from './services/service-resolver';
import MusicService from './services/music-service';
import { useObservable } from './rxjs-functions';
import { Page } from './pages/Page';
import { AlbumsPage } from './pages/kraedt/AlbumsPage';
import { AlbumPage } from './pages/kraedt/AlbumPage';
import { Club1506Interview } from './pages/kraedt/Club1506Interview';
import { Merch } from './pages/kraedt/Merch';
import { Contact } from './pages/kraedt/Contact';
import InteractService from './services/interact-service';
import { CaptchaPopup } from './components/CaptchaPopup';
import { ToastPanel } from './layout/ToastPanel';
import { FollowPopup } from './pages/kraedt/FollowPopup';

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

const Admin = ({ page }: PageProps) => (
  <>
    {page}
  </>
)

const MusicError = () => (
  <Page title="Kraedt - Error :(">
    <h2 className="text-center">There was a problem retreiving data. Try coming back later.</h2>
  </Page>
)

const App = () => {
  const musicService = useService(MusicService);
  const interactService = useService(InteractService);

  const songs = useObservable(musicService.Songs);
  const albums = useObservable(musicService.Albums);
  const showMusicError = songs?.length === 0 && albums?.length === 0;

  const modalType = useObservable(interactService.ShowModal) ?? 'none';

  const modal = {
    captcha: <CaptchaPopup />,
    follow: <FollowPopup />,
    none: undefined
  }

  return (
    <>
      <ToastPanel />
      {modal[modalType]}
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Kraedt page={<HomePage />} />} />
            <Route path="/club1506-interview" element={<Kraedt page={<Club1506Interview />} />} />
            <Route path="/merch" element={<Kraedt page={<Merch />} />} />
            <Route path="/contact" element={<Kraedt page={<Contact />} />} />
            <Route path="/music" element={<Kraedt page={showMusicError ? <MusicError /> : <MusicPage safeOnly={false} />} />} />
            <Route path="/music-creator-friendly" element={<Kraedt page={showMusicError ? <MusicError /> : <MusicPage safeOnly={true} />} />} />
            <Route path="/music/song/:songPageName" element={<Kraedt page={<SongPage />} />} />
            <Route path="/home/song/:oldId" element={<Kraedt page={<OldSongRedirect />} />} />
            <Route path="/albums" element={<Kraedt page={showMusicError ? <MusicError /> : <AlbumsPage />} />} />
            <Route path="/music/album/:albumPageName" element={<Kraedt page={<AlbumPage />} />} />
            <Route path="/music*" element={<Kraedt page={<Page404 />} />} />
          </Route>
          <Route>
            <Route path="/sonicbreakbeat" element={<SonicBreakbeat page={<SbbHome />} />} />
            {//<Route path="/sonicbreakbeat/music" element={<SbbMusic />} />
            }
            <Route path="/sonicbreakbeat/music/*" element={<SonicBreakbeat page={<SbbPage404 />} />} />
            <Route path="/sonicbreakbeat/*" element={<Navigate to='/sonicbreakbeat/' />} />
          </Route>
          <Route>
            <Route path="/admin" element={<Admin page={<Dashboard />} />} />
          </Route>
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;
