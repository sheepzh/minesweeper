import { css } from '@emotion/react';

// Import all images
import smileImg from './image/smile.png';
import ohhImg from './image/ohh.png';
import deadImg from './image/dead.png';
import winImg from './image/win.png';
import mineUncoverImg from './image/mine-uncover.png';
import mineDeadImg from './image/mine-dead.png';
import flagImg from './image/flag.png';
import flagWrongImg from './image/flag-wrong.png';
import open1Img from './image/open1.png';
import open2Img from './image/open2.png';
import open3Img from './image/open3.png';
import open4Img from './image/open4.png';
import open5Img from './image/open5.png';
import open6Img from './image/open6.png';
import open7Img from './image/open7.png';
import open8Img from './image/open8.png';
import digitMinusImg from './image/digit-.png';
import digit0Img from './image/digit0.png';
import digit1Img from './image/digit1.png';
import digit2Img from './image/digit2.png';
import digit3Img from './image/digit3.png';
import digit4Img from './image/digit4.png';
import digit5Img from './image/digit5.png';
import digit6Img from './image/digit6.png';
import digit7Img from './image/digit7.png';
import digit8Img from './image/digit8.png';
import digit9Img from './image/digit9.png';

export const gameAreaStyles = css`
  height: fit-content;
  padding: 6px;
  background-color: #c0c0c0;
  border-width: 3px;
  border-radius: 2px;
  border-style: solid;
  border-color: #fff #9f9f9f #9f9f9f #fff;

  &.running .tile-cell.unknown.pressing {
    border-width: 0px;
  }
`;

export const tileBarStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-style: solid;
  border-color: #9c9c9c #fff #fff #9c9c9c;
  height: 34px;
  border-width: 2px;
  padding: 5px;
  margin-bottom: 6px;
  font-size: 10px;
`;

export const emojiOuterStyles = css`
  border-top: 1px solid #303030;
  border-left: 1px solid #303030;
  border-radius: 1px;
`;

export const emojiStyles = css`
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  border-style: solid;
  border-width: 2px;
  border-radius: 1px;
  border-color: #fff #808080 #808080 #fff;
  background: center center no-repeat;
  background-image: url(${smileImg});

  &.tile-pressing {
    background-image: url(${ohhImg});
  }

  &.bar-pressing {
    border-top: 2px solid #808080;
    border-left: 2px solid #808080;
    border-right: 1px solid #808080;
    border-bottom: 1px solid #808080;
    border-radius: 0px;
  }

  &.dead {
    background-image: url(${deadImg}) !important;
  }

  &.win {
    background-image: url(${winImg}) !important;
  }
`;

export const tileGridStyles = css`
  display: grid;
  border-style: solid;
  border-color: #9f9f9f #fff #fff #9f9f9f;
  box-sizing: border-box;
  border-width: 3px;
  border-radius: 1px;
`;

export const tileCellStyles = css`
  box-sizing: border-box;
  background: center center no-repeat;
  width: 16px;
  height: 16px;

  &.uncover {
    background-image: url(${mineUncoverImg});
    border-width: 0px;
  }

  &.boom {
    background-image: url(${mineDeadImg});
  }

  &.flag {
    background-image: url(${flagImg});
  }

  &.wrong-flag {
    background-image: url(${flagWrongImg});
    border-width: 0px;
  }

  &.unknown:not(.uncover),
  &.flag:not(.wrong-flag) {
    border-width: 2px;
  }

  &.unknown,
  &.flag {
    border-color: #fff #808080 #808080 #fff;
    border-style: solid;
  }

  &.open.open-1 {
    background-image: url(${open1Img});
  }

  &.open.open-2 {
    background-image: url(${open2Img});
  }

  &.open.open-3 {
    background-image: url(${open3Img});
  }

  &.open.open-4 {
    background-image: url(${open4Img});
  }

  &.open.open-5 {
    background-image: url(${open5Img});
  }

  &.open.open-6 {
    background-image: url(${open6Img});
  }

  &.open.open-7 {
    background-image: url(${open7Img});
  }

  &.open.open-8 {
    background-image: url(${open8Img});
  }

  &.open,
  &.uncover,
  &.wrong-flag {
    border-left: 1px solid #808080;
    border-top: 1px solid #808080;
  }

  &.pressing.unknown {
    border: none;
  }
`;

export const digitOuterStyles = css`
  width: 40px;
  height: 24px;
  border-width: 0px 1px 1px 0px;
  border-style: solid;
  border-color: #fff;
  display: flex;
  flex-direction: row;
`;

export const digitItemStyles = css`
  height: 100%;
  flex: 1;

  &.digit-- {
    background-image: url(${digitMinusImg});
  }

  &.digit-0 {
    background-image: url(${digit0Img});
  }

  &.digit-1 {
    background-image: url(${digit1Img});
  }

  &.digit-2 {
    background-image: url(${digit2Img});
  }

  &.digit-3 {
    background-image: url(${digit3Img});
  }

  &.digit-4 {
    background-image: url(${digit4Img});
  }

  &.digit-5 {
    background-image: url(${digit5Img});
  }

  &.digit-6 {
    background-image: url(${digit6Img});
  }

  &.digit-7 {
    background-image: url(${digit7Img});
  }

  &.digit-8 {
    background-image: url(${digit8Img});
  }

  &.digit-9 {
    background-image: url(${digit9Img});
  }
`;
