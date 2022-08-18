import { goToTop } from "../../functions";
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { Page } from "../Page";

export const Music = () => {
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs);
  console.log(songs)
  return (
    <Page title="Kraedt - Music">
      <h2>Music</h2>

      <div className="w-100">
        <a href="/albums" >See all albums</a>

        {// todo: filter safe
          //<a className="pull-right fa-lg" href="/music">Show all music</a>
          //else
          //<a className="pull-right fa-lg" href="/music-creator-friendly">Show only Content-Creator-Friendly music</a>
        }
        <br />
      </div>

      <div className="corner-controls">
        <a onClick={() => goToTop()} href="javascript:void(0)">
          <i className="fas fa-arrow-up fa-2x" />
        </a>
      </div>

      <table id="music-table" className="music-page"></table>

    </Page>
  )
}