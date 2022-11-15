import L from 'leaflet';

import customMarker from '@images/CustomMarker.svg';
import {emojiArr} from '@emojis/index';
import '@map/CustomMarker.scss';

export const CustomMarkerIcon = new L.Icon({
  iconUrl: customMarker,
  iconRetinaUrl: customMarker,
  iconSize: new L.Point(15, 15),
  className: 'custom-marker',
});

export const ClickMarkerIcon = new L.Icon({
  iconUrl: emojiArr[5],
  iconRetinaUrl: emojiArr[5],
  iconAnchor: [12.5, 12.5],
  popupAnchor: [0, -12.5],
  iconSize: new L.Point(25, 25),
});
