import {useEffect, useRef, useState} from 'react';
import {Marker, Popup, useMap, useMapEvent} from 'react-leaflet';
import {ClickMarkerIcon} from './CustomMarker';
import {useNavigate} from 'react-router';
import './ClickMarker.scss';

function ClickMarker() {
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);
  const [position, setPosition] = useState({lat: -999, lng: -999});
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
          <div className="clickmarker-popup-title">선택한 위치</div>
          <div className="clickmarker-popup-content ">위도: {position.lat}</div>
          <div className="clickmarker-popup-content ">경도: {position.lng}</div>
          <button className="btn" onClick={() => navigate(`/vr`)}>
            보러가기
          </button>
        </div>
      </Popup>
    </Marker>
  );
}

export default ClickMarker;
