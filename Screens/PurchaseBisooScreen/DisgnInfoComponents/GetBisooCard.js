import React, {useState} from 'react';
import {
  BgImage,
  CARD_TYPE,
  SolidBgColor,
  BGColorOverlayImg,
  BGImageAndOverlayImg,
} from './../DesignInfo';

export const GetBisooCard = ({post: {card_template, metaData = {}}}) => {
  switch (card_template) {
    case CARD_TYPE.solidBG:
      return <SolidBgColor {...metaData} />;
    case CARD_TYPE.bgColorOverImg:
      return <BGColorOverlayImg {...metaData} />;
    case CARD_TYPE.bgImage:
      return <BgImage {...metaData} />;
    case CARD_TYPE.bgImgOverImg:
      return <BGImageAndOverlayImg {...metaData} />;
    default:
      return null;
  }
};
