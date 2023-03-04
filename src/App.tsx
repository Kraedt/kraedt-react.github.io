import './App.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from './pages/kraedt/Header';
import { Header as SbbHeader } from './pages/sonicbreakbeat/Header';
import { Footer } from './pages/kraedt/Footer';
import { Footer as SbbFooter } from './pages/sonicbreakbeat/Footer';
import { HomePage } from './pages/kraedt/HomePage';
import { MusicPage } from './components/MusicPage';
import { ReactElement, useEffect } from 'react';
import { SongPage } from './pages/kraedt/SongPage';
import { Page404 } from './pages/kraedt/Page404';
import { HomePage as SbbHome } from './pages/sonicbreakbeat/HomePage';
import { Page404 as SbbPage404 } from './pages/sonicbreakbeat/Page404';
import { FunctionalRedirect } from './pages/kraedt/FunctionalRedirect';
//import { Dashboard } from './pages/admin/Dashboard';
import { useService } from './services/service-resolver';
import { useObservable } from './rxjs-functions';
import { Page } from './pages/Page';
import { AlbumsPage } from './components/AlbumsPage';
import { AlbumPage } from './components/AlbumPage';
import { Club1506Interview } from './pages/kraedt/Club1506Interview';
import { Merch } from './pages/kraedt/Merch';
import { Contact } from './pages/kraedt/Contact';
import { Contact as SbbContact } from './pages/sonicbreakbeat/Contact';
import InteractService from './services/interact-service';
import { CaptchaPopup } from './components/CaptchaPopup';
import { ToastPanel } from './layout/ToastPanel';
import { FollowPopup } from './pages/kraedt/FollowPopup';
import MusicService from './services/music-service';
import { Alias, getMusicPageName, Song } from './types/types';

type PageProps = { page: ReactElement }

const Kraedt = ({ page }: PageProps) => {
  return (
    <div className="body-kraedt">
      <div className="kraedt" />
      <Header />
      <main className="body-content">
        {page}
      </main>
      <Footer />
    </div>
  )
}

const SonicBreakbeat = ({ page }: PageProps) => (
  <div className="body-sbb">
    <div className="sbb" />
    <SbbHeader />
    <main className="body-content">
      {page}
    </main>
    <SbbFooter />
  </div>
)

//const Admin = ({ page }: PageProps) => (
//  <>
//    {page}
//  </>
//)

const MusicError = () => (
  <Page title="Kraedt - Error :(">
    <h2 className="text-center">There was a problem retreiving data. Try coming back later.</h2>
  </Page>
)

const App = () => {
  const musicService = useService(MusicService);
  const interactService = useService(InteractService);

  useEffect(() => {
    let alias = Alias.Kraedt;
    const n = window.location.pathname;
    if (n.startsWith('/sonicbreakbeat'))
      alias = Alias.Sbb;
    musicService.Initialize(alias)
  }, [musicService]);

  const songs = useObservable(musicService.Songs);
  const albums = useObservable(musicService.Albums);
  useObservable(musicService.Spotlight); // keep hot
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
            <Route path="/music" element={<Kraedt page={showMusicError ? <MusicError /> : <MusicPage alias={Alias.Kraedt} safeOnly={false} />} />} />
            <Route path="/music-creator-friendly" element={<Kraedt page={showMusicError ? <MusicError /> : <MusicPage alias={Alias.Kraedt} safeOnly={true} />} />} />
            <Route path="/music/song/:songPageName" element={<Kraedt page={<SongPage alias={Alias.Kraedt} />} />} />
            <Route path="/home/song/:key" element={<Kraedt page={<FunctionalRedirect fn={(key) => `/music/song/${getMusicPageName(songs?.find((s: Song) => s?.id === Number(key)))}`} doRedirect={() => songs !== undefined} />} />} />
            <Route path="/music/song/:key.html" element={<Kraedt page={<FunctionalRedirect fn={(key) => `/music/song/${key}`} />} />} />
            <Route path="/music/album/:key.html" element={<Kraedt page={<FunctionalRedirect fn={(key) => `/music/album/${key}`} />} />} />
            <Route path="/albums" element={<Kraedt page={showMusicError ? <MusicError /> : <AlbumsPage alias={Alias.Kraedt} />} />} />
            <Route path="/music/album/:albumPageName" element={<Kraedt page={<AlbumPage alias={Alias.Kraedt} />} />} />
            <Route path="/music/albums/:albumPageName" element={<Kraedt page={<AlbumPage alias={Alias.Kraedt} />} />} />
            <Route path="/music*" element={<Kraedt page={<Page404 />} />} />
          </Route>
          <Route>
            <Route path="/sonicbreakbeat" element={<SonicBreakbeat page={<SbbHome />} />} />
            <Route path="/sonicbreakbeat/music" element={<SonicBreakbeat page={showMusicError ? <MusicError /> : <MusicPage alias={Alias.Sbb} safeOnly={false} />} />} />
            <Route path="/sonicbreakbeat/music-creator-friendly" element={<SonicBreakbeat page={showMusicError ? <MusicError /> : <MusicPage alias={Alias.Sbb} safeOnly={true} />} />} />
            <Route path="/sonicbreakbeat/music/song/:songPageName" element={<SonicBreakbeat page={<SongPage alias={Alias.Sbb} />} />} />
            <Route path="/sonicbreakbeat/albums" element={<SonicBreakbeat page={showMusicError ? <MusicError /> : <AlbumsPage alias={Alias.Sbb} />} />} />
            <Route path="/sonicbreakbeat/music/album/:albumPageName" element={<SonicBreakbeat page={<AlbumPage alias={Alias.Sbb} />} />} />
            <Route path="/sonicbreakbeat/contact" element={<SonicBreakbeat page={<SbbContact />} />} />
          </Route>
          {/*<Route>
            <Route path="/admin" element={<Admin page={<Dashboard />} />} />
          </Route>*/}
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;
