import { ReactElement } from "react";
import * as cs from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
  onClickItem: (idx: number) => void;
  children: ReactElement[];
}

const Carousel = ({ onClickItem, children }: Props) => (
  <cs.Carousel autoPlay infiniteLoop stopOnHover onClickItem={onClickItem} dynamicHeight={false} showThumbs={false} showIndicators={true} showStatus={false}>
    {children}
  </cs.Carousel >
)

export default Carousel;