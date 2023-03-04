import { useNavigate } from "react-router-dom";
import { Alias, getMusicItemImage, getMusicPageName, getPathPrefix, Song } from "../types/types";
import Carousel from "./Carousel";
import styles from './SongCarousel.module.scss'

interface Props {
  allSongs?: Song[];
  carouselSongs?: Song[];
  alias: Alias;
}

export const SongCarousel = ({ allSongs, carouselSongs, alias }: Props) => {
  const nav = useNavigate();

  if (!allSongs || !carouselSongs)
    return null;

  return (
    <>
      <h3 className="text-center">Track Spotlight:</h3>
      <div className={styles.trackSpotlight}>
        <Carousel onClickItem={idx => nav(`${getPathPrefix(alias)}/music/song/${getMusicPageName(allSongs.find(s => s.id === carouselSongs[idx].id))}`)}>
          {carouselSongs.map(s => (
            <div key={s?.id}>
              <img src={!!s ? getMusicItemImage(s) : ''} alt={s?.title} />
            </div>
          ))
          }
        </Carousel>
      </div>
    </>
  )
}