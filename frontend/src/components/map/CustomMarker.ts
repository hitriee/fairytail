import L from 'leaflet';

import '@map/CustomMarker.scss';
import customMarker from '@images/customMarker.svg';
import clickMarker from '@images/clickMarker.svg';

export const CustomMarkerIcon = new L.Icon({
  iconUrl: customMarker,
  iconRetinaUrl: customMarker,
  iconSize: new L.Point(15, 15),
  className: 'custom-marker',
});

export const ClickMarkerIcon = new L.Icon({
  iconUrl: clickMarker,
  iconRetinaUrl: clickMarker,
  iconAnchor: [7.5, 7.5],
  popupAnchor: [0, -15],
  iconSize: new L.Point(15, 15),
});
