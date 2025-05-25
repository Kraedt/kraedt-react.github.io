import './App.scss'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { KraedtHeader } from './pages/kraedt/KraedtHeader';
import { Header as SbbHeader } from './pages/sonicbreakbeat/Header';
import { Footer } from './pages/kraedt/Footer';
import { Footer as SbbFooter } from './pages/sonicbreakbeat/Footer';
import { VessraHome } from './pages/vessra/VessraHome';
import { MusicPage } from './components/MusicPage';
import { ReactElement, useEffect } from 'react';
import { SongPage } from './pages/kraedt/SongPage';
import { SongPage as VessraSongPage } from './pages/vessra/SongPage';
import { HomePage as SbbHome } from './pages/sonicbreakbeat/HomePage';
import { FunctionalRedirect } from './pages/kraedt/FunctionalRedirect';
import { useService } from './services/service-resolver';
import { useObservable } from './rxjs-functions';
import { Page } from './pages/Page';
import { AlbumsPage } from './components/AlbumsPage';
import { AlbumPage } from './components/AlbumPage';
import { Merch } from './pages/kraedt/Merch';
import { KraedtContact } from './pages/kraedt/KraedtContact';
import { Contact as SbbContact } from './pages/sonicbreakbeat/Contact';
import InteractService from './services/interact-service';
import { CaptchaPopup } from './components/CaptchaPopup';
import { ToastPanel } from './layout/ToastPanel';
import { FollowPopup } from './pages/kraedt/FollowPopup';
import MusicService from './services/music-service';
import { Alias, getAliasFromPathname, getAliasName, getMusicPageName, Song } from './types/types';
import { DeathExplanation } from './pages/sonicbreakbeat/DeathExplanation';
import { VessraHeader } from './pages/vessra/VessraHeader';
import { VessraFooter } from './pages/vessra/VessraFooter';
import { KraedtHome } from './pages/kraedt/KraedtHome';
import { VessraContact } from './pages/vessra/VessraContact';
import { VessraAbout } from './pages/vessra/VessraAbout';
import { Page404 } from './components/Page404';

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
        headerComponent: <KraedtHeader />,
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
    case Alias.Vessra:
      return {
        bodyClass: "body-vessra",
        mainClass: "sbb",
        headerComponent: <VessraHeader />,
        footerComponent: <VessraFooter />
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

  function setFavicon(iconName: string) {
    const link = document.querySelector("link[rel='icon']") || document.createElement('link') as any;
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = `/${iconName}`;
    document.head.appendChild(link);
    return <></>;
  }

  useEffect(() => {
    const alias = getAliasFromPathname(window.location.pathname);

    switch (alias) {
      case Alias.Kraedt:
        setFavicon('kraedt-favicon.ico');
        break;
      case Alias.Sbb:
        setFavicon('sbb-favicon.ico');
        break;
    }

  }, [window.location]);

  return (
    <>
      <ToastPanel />
      {modal[modalType]}
      <BrowserRouter>
        <Routes>
          <Route>
            {routeAlias = Alias.Vessra}
            <Route path="/" element={<PageMan alias={routeAlias} page={<VessraHome />} />} />
            <Route path="/merch" element={<PageMan alias={routeAlias} page={<Merch />} />} />
            <Route path="/contact" element={<PageMan alias={routeAlias} page={<VessraContact />} />} />
            <Route path="/about" element={<PageMan alias={routeAlias} page={<VessraAbout />} />} />
            <Route path="/music" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <MusicPage alias={routeAlias} safeOnly={false} />} />} />
            <Route path="/music-creator-friendly" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <MusicPage alias={routeAlias} safeOnly={true} />} />} />
            <Route path="/albums" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <AlbumsPage alias={routeAlias} />} />} />
            <Route path="/music/song/:songPageName" element={<PageMan alias={routeAlias} page={<VessraSongPage alias={routeAlias} />} />} />
            <Route path="/music/album/:albumPageName" element={<PageMan alias={routeAlias} page={<AlbumPage alias={routeAlias} />} />} />
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
          <Route>
            {routeAlias = Alias.Kraedt}
            <Route path="/kraedt" element={<PageMan alias={routeAlias} page={<KraedtHome />} />} />
            <Route path="/kraedt/music" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <MusicPage alias={routeAlias} safeOnly={false} />} />} />
            <Route path="/kraedt/music-creator-friendly" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <MusicPage alias={routeAlias} safeOnly={true} />} />} />
            <Route path="/kraedt/music/song/:songPageName" element={<PageMan alias={routeAlias} page={<SongPage alias={routeAlias} />} />} />
            <Route path="/kraedt/albums" element={<PageMan alias={routeAlias} page={showMusicError ? <MusicError alias={routeAlias} /> : <AlbumsPage alias={routeAlias} />} />} />
            <Route path="/kraedt/music/album/:albumPageName" element={<PageMan alias={routeAlias} page={<AlbumPage alias={routeAlias} />} />} />
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
