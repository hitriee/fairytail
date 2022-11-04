import L from 'leaflet';
import customMarker from '@images/CustomMarker.svg';
import {emojiArr} from '@/assets/emojis';

export const CustomMarkerIcon = new L.Icon({
  iconUrl: customMarker,
  iconRetinaUrl: customMarker,
  iconSize: new L.Point(20, 20),
});

export const ClickMarkerIcon = new L.Icon({
  iconUrl: emojiArr[5],
  iconRetinaUrl: emojiArr[5],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
  iconSize: new L.Point(30, 30),
});
