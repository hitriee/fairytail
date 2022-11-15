import axios from 'axios';
import {Marker, Popup, useMap, useMapEvent} from 'react-leaflet';
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router';

import {ClickMarkerIcon} from '@map/CustomMarker';
import '@map/ClickMarker.scss';

// 지도 클릭 시 나타나는 팝업
function ClickMarker({isClicked, setIsClicked, position, setPosition}) {
  // vr 페이지로 이동하기 위한 navigate
  const navigate = useNavigate();

  // 좌표로 얻어낸 장소
  const [place, setPlace] = useState('');

  // 팝업 표시를 위한 state
  const [refReady, setRefReady] = useState(false);
  let popupRef = useRef();

  // 지도 클릭 시 해당 위치의 좌표 저장
  const map = useMap();

  useMapEvent('click', e => {
    const {lat, lng} = e.latlng;
    setPosition({lat: lat, lng: lng});
    setIsClicked(true);
  });

  // 클릭할 때마다 좌표로 장소 알아내기(reverse geocoding)
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
