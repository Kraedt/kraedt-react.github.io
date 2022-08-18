import noImage from './assets/images/no-image.jpg'

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => images[item.replace('./', '')] = r(item));
  return images;
}

export const importSongImages = () => importAll(require.context('./assets/images/songs', true, /\.(png|jpe?g)$/));
export const importLinkImages = () => importAll(require.context('./assets/images/links', true, /\.(png|jpe?g)$/));

export const NoImage = noImage;