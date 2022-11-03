import L from 'leaflet';
import customMarker from '@images/CustomMarker.svg';
import clickMarker from '@images/ClickMarker.webp';

export const CustomMarker = new L.Icon({
  iconUrl: customMarker,
  iconRetinaUrl: customMarker,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(20, 20),
});

export const ClickMarker = new L.Icon({
  iconUrl: clickMarker,
  iconRetinaUrl: clickMarker,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(20, 20),
});
