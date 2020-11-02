import "styles/global.css";
import "typeface-open-sans";
import "typeface-merriweather";
import 'bootstrap/dist/css/bootstrap.min.css';
import "styles/sidebar.css";
import '../styles/my-swiper.scss';
import 'swiper/swiper.scss';

import { config, library } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas, faSearch, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import React from "react";

library.add(
  fab, 
  fas, 
  faSearch,
  faThumbsUp
  )

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
