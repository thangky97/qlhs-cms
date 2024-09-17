import { Fragment, useContext } from "react";
import { FormattedMessage } from "react-intl";
import ExtensionsHeader from "@components/extensions-header";
import SwiperCore, {
  Autoplay,
  EffectCoverflow,
  EffectCube,
  EffectFade,
  Lazy,
  Navigation,
  Pagination,
  Virtual,
} from "swiper";

import "@styles/react/libs/swiper/swiper.scss";

import ListPartner from "./partner/list";
import ListSlider from "./slider/list";
SwiperCore.use([
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual,
]);

const index = ({}) => {
  return (
    <Fragment>
      <ExtensionsHeader title={<FormattedMessage id="Slide banner" />} />

      <ListSlider />

      <div className="mt-5"></div>
      <ExtensionsHeader title={<FormattedMessage id="Partner" />} />

      <ListPartner />
    </Fragment>
  );
};

export default index;
