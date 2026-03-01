import { Dimensions, Platform, PixelRatio } from 'react-native';
//import styles from './styles';
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 6 scale
const scale = SCREEN_WIDTH / 375;
const ScaleHeight = SCREEN_HEIGHT / 667;
const ScaleWidth = SCREEN_WIDTH / 375
const ScaleWidthMenu = (SCREEN_WIDTH - 68) / 307

export function normalizeFont(size) {
  if (Platform.OS === 'ios')
    return Math.round(size * ScaleWidth);
  else
    return Math.round(size * ScaleWidth);
}

export function scaleHeight(height) {
  return Math.round(height * ScaleHeight);
}

export function scaleWidth(width) {
  return Math.round(width * ScaleWidth);
}

export function scaleWidthMenu(width) {
  return Math.round(width * ScaleWidthMenu);
}

export function normalizeFontMenu(size) {
  if (Platform.OS === 'ios')
    return Math.round(size * ScaleWidthMenu);
  else
    return Math.round(size * ScaleHeight);
}