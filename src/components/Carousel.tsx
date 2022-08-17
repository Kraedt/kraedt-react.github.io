import { ReactElement } from "react";
import * as cs from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Carousel.scss'

interface Props {
  children: ReactElement[];
}

export default function Carousel(props: Props) {
  return (
    <cs.Carousel autoPlay infiniteLoop stopOnHover dynamicHeight={false} showThumbs={false} showIndicators={false} showStatus={false}>
      {props.children}
    </cs.Carousel >
  )
}