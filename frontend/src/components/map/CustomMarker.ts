import L from 'leaflet';
import customMarker from '@images/CustomMarker.svg';

export const CustomMarker = new L.Icon({
  iconUrl: customMarker,
  iconRetinaUrl: customMarker,
  iconAnchor: undefined,
  popupAnchor: undefined,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(20, 20),
});
