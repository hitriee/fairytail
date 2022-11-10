import {useEffect, useRef, useState} from 'react';
import {Marker, Popup, useMap, useMapEvent} from 'react-leaflet';
import {ClickMarkerIcon} from './CustomMarker';
import {useNavigate} from 'react-router';
import './ClickMarker.scss';
import axios from 'axios';

function ClickMarker({isClicked, setIsClicked, position, setPosition}) {
  const navigate = useNavigate();

  const [place, setPlace] = useState('');

  const [refReady, setRefReady] = useState(false);
  let popupRef = useRef();

  const map = useMap();

  useMapEvent('click', e => {
    const {lat, lng} = e.latlng;
    setPosition({lat: lat, lng: lng});
    setIsClicked(true);
  });

  useEffect(() => {
    if (refReady && isClicked) {
      popupRef.openOn(map);

      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json&zoom=10`,
        )
        .then(response => {
          setPlace(response.data.display_name);
          map.flyTo(position, map.getZoom());
        });
    }
  }, [refReady, map, position]);

  return (
    <Marker position={[position.lat, position.lng]} icon={ClickMarkerIcon}>
      <Popup
        ref={r => {
          popupRef = r;
          setRefReady(true);
        }}>
        <div className="clickmarker-popup">
          <div className="clickmarker-popup-title">여기는</div>
          <div className="clickmarker-popup-content">
            {place ? place : '알려지지 않은 곳'} 입니다.
          </div>
          <button
            className="btn clickmarker-popup-btn"
            onClick={() => navigate('/vr', {state: {position: position}})}>
            보러가기
          </button>
        </div>
      </Popup>
    </Marker>
  );
}

export default ClickMarker;
