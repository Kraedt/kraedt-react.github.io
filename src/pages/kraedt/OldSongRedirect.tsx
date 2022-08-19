import { Navigate, useParams } from "react-router-dom"
import { useObservable } from "../../rxjs-functions";
import MusicService from "../../services/music-service";
import { useService } from "../../services/service-resolver";
import { getSongIdentifier } from "../../types/types";

export const OldSongRedirect = () => {
  const musicService = useService(MusicService);
  const songs = useObservable(musicService.Songs);

  const { oldId } = useParams();
  const newId = getSongIdentifier(songs?.find(s => s?.id === Number(oldId)));

  return songs === undefined
    ? <p className="w-100 text-center">Redirecting...</p>
    : <Navigate to={`/music/song/${newId}`} replace />;
}