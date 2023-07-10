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
import { Alias, getAliasFromPathname, getAliasName, getMusicPageName, Song } from './types/types';
import { DeathExplanation } from './pages/sonicbreakbeat/DeathExplanation';

type PageManProps = { alias: Alias, page: ReactElement }
interface PageManFields {
  bodyClass: string;
  mainClass: string;
  headerComponent: ReactElement;
  footerComponent: ReactElement;
}

const getPageManFieldsFromAlias = (alias: Alias) : PageManFields => {
  switch (alias) {
    case Alias.Kraedt:
      return {
        bodyClass: "body-kraedt",
        mainClass: "kraedt",
        headerComponent: <Header />,
        footerComponent: <Footer />
      }
    case Alias.Sbb:
      return {
        bodyClass: "body-sbb",
        mainClass: "sbb",
        headerComponent: <SbbHeader />,
        footerComponent: <SbbFooter />
      }
    case Alias.KarlKofass:
      return {
        bodyClass: "body-sbb",
        mainClass: "sbb",
        headerComponent: <SbbHeader />,
        footerComponent: <SbbFooter />
      }
    default: throw "Invalid alias";
  }
}

const PageMan = ({ alias, page } : PageManProps) => {
  const {bodyClass, mainClass, headerComponent, footerComponent} = getPageManFieldsFromAlias(alias);
  return (
    <div className={bodyClass}>
      <div className={mainClass} />
      {headerComponent}
      <main className="body-content">
        {page}
      </main>
      {footerComponent}
    </div>
  )
}

//const Admin = ({ page }: PageProps) => (
//  <>
//    {page}
//  </>
//)

const MusicError = ({alias}: {alias: Alias}) => (
  <Page title={`${getAliasName(alias)} - Error :(`}>
    <h2 className="text-center">There was a problem retreiving data. Try coming back later.</h2>
  </Page>
)

const App = () => {
  const musicService = useService(MusicService);
  const interactService = useService(InteractService);

  useEffect(() => {
    musicService.Initialize(getAliasFromPathname(window.location.pathname))
  }, [musicService]);

  const songs = useObservable(musicService.Songs);
  const albums = useObservable(musicService.Albums);
  useObservable(musicService.Spotlight); // keep hot
  const showMusicError = songs?.length === 0 && albums?.length === 0;

  const modalType = useObservable(interactService.ShowModal) ?? 'none';

  // todo: follow popup does not work for any alias other than kraedt
  const modal = {
    captcha: <CaptchaPopup />,
    follow: <FollowPopup />,
    none: undefined
  }

  let routeAlias: Alias;

  return (
    <>
      <ToastPanel />
      {modal[modalType]}
      <BrowserRouter>
        <Routes>
          <Route>
            {routeAlias = Alias.Kraedt}
            <Route path="/" element={<PageMan alias={routeAlias} page={<HomePage />} />} />
            <Route path="/club1506-interview" element={<PageMan alias={routeAlias} page={<Club1506Interview />} />} />
            <Route path="/merch" element={<PageMan alias={routeAlias} page={<Merch />} />} />
            <Route path="/contact" element={<PageMan alias={routeAlias} page={<Contact />} />} />
            <Route path="/music" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <MusicPage alias={routeAlias} safeOnly={false} />} />} />
            <Route path="/music-creator-friendly" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <MusicPage alias={routeAlias} safeOnly={true} />} />} />
            <Route path="/music/song/:songPageName" element={<PageMan alias={routeAlias} page={<SongPage alias={routeAlias} />} />} />
            <Route path="/home/song/:key" element={<PageMan alias={routeAlias} page={<FunctionalRedirect fn={(key) => `/music/song/${getMusicPageName(songs?.find((s: Song) => s?.id === Number(key)))}`} doRedirect={() => songs !== undefined} />} />} />
            <Route path="/music/song/:key.html" element={<PageMan alias={routeAlias} page={<FunctionalRedirect fn={(key) => `/music/song/${key}`} />} />} />
            <Route path="/music/album/:key.html" element={<PageMan alias={routeAlias} page={<FunctionalRedirect fn={(key) => `/music/album/${key}`} />} />} />
            <Route path="/albums" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <AlbumsPage alias={routeAlias} />} />} />
            <Route path="/music/album/:albumPageName" element={<PageMan alias={routeAlias} page={<AlbumPage alias={routeAlias} />} />} />
            <Route path="/music/albums/:albumPageName" element={<PageMan alias={routeAlias} page={<AlbumPage alias={routeAlias} />} />} />
            <Route path="/music*" element={<PageMan alias={routeAlias} page={<Page404 />} />} />
          </Route>
          <Route>
            {routeAlias = Alias.Sbb}
            <Route path="/sonicbreakbeat" element={<PageMan alias={routeAlias} page={<SbbHome />} />} />
            <Route path="/sonicbreakbeat/music" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <MusicPage alias={routeAlias} safeOnly={false} />} />} />
            <Route path="/sonicbreakbeat/music-creator-friendly" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <MusicPage alias={routeAlias} safeOnly={true} />} />} />
            <Route path="/sonicbreakbeat/music/song/:songPageName" element={<PageMan alias={routeAlias} page={<SongPage alias={routeAlias} />} />} />
            <Route path="/sonicbreakbeat/albums" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <AlbumsPage alias={routeAlias} />} />} />
            <Route path="/sonicbreakbeat/music/album/:albumPageName" element={<PageMan alias={routeAlias} page={<AlbumPage alias={routeAlias} />} />} />
            <Route path="/sonicbreakbeat/contact" element={<PageMan alias={routeAlias} page={<SbbContact />} />} />
            <Route path="/sonicbreakbeat/explanation" element={<PageMan alias={routeAlias} page={<DeathExplanation />} />} />
          </Route>
          <Route>
            {routeAlias = Alias.KarlKofass}
            <Route path="/karl-kofass" element={<PageMan alias={routeAlias} page={<SbbHome />} />} />
            <Route path="/karl-kofass/music" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <MusicPage alias={routeAlias} safeOnly={false} />} />} />
            <Route path="/karl-kofass/music-creator-friendly" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <MusicPage alias={routeAlias} safeOnly={true} />} />} />
            <Route path="/karl-kofass/music/song/:songPageName" element={<PageMan alias={routeAlias} page={<SongPage alias={routeAlias} />} />} />
            <Route path="/karl-kofass/albums" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <AlbumsPage alias={routeAlias} />} />} />
            <Route path="/karl-kofass/music/album/:albumPageName" element={<PageMan alias={routeAlias} page={<AlbumPage alias={routeAlias} />} />} />
            <Route path="/karl-kofass/contact" element={<PageMan alias={routeAlias} page={<SbbContact />} />} />
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
