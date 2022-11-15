import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useState} from 'react';

import '@screens/Map.scss';
import {CustomMarkerIcon} from '@map/CustomMarker';
import ClickMarker from '@map/ClickMarker';
import MoveToBack from '@common/MoveToBack';
import OpenHelp from '@common/OpenHelp';
import Airplane from '@images/airplane.webp';

import {getMessageMap} from '@apis/map';

// 최소, 최대 범위 이내 랜덤 실수 생성
function generateRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// 지도 중심 지정
function SetCenter({center}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, []);

  return null;
}

function Map() {
  // 지도 클릭 시 팝업 표시, 해당 위치 좌표값
  const [isClicked, setIsClicked] = useState(false);
  const [position, setPosition] = useState({lat: -999, lng: -999});

  // 지도 중심
  const [center, setCenter] = useState({lat: 0, lng: 0});
  const [isReady, setIsReady] = useState(false);

  // 데이터 및 데이터 받아오기가 끝났는지 확인하기 위한 state
  const [isFinished, setIsFinished] = useState(-1);
  const [data, setData] = useState([]);

  // 현재 위치 받아와서 지도 중심 설정
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async pos => {
        setCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsReady(true);
      });
    }
  }, []);

  // 서버에서 데이터 받아오기
  useEffect(() => {
    if (isReady) {
      for (let i = 0; i < 4; i++) {
        getMessageMap(i)
          .then(res => {
            setData(prev => prev.concat(res.data));
            setIsFinished(prev => prev + 1);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }, [isReady]);

  // 받은 데이터 화면에 마커로 표시하기
  const Markers = () => {
    const markers = data.map((position, index) => {
      return <Marker key={index} position={position} icon={CustomMarkerIcon} />;
    });
    return markers;
  };

  return (
    <div className="screen">
      <MoveToBack path="/main" color="#779BFF " />
      <OpenHelp imagesIndex={1} color="#779BFF" />
      <div
        className="map-random"
        onClick={() => {
          setPosition({
            lat: generateRandomFloat(-90, 90),
            lng: generateRandomFloat(-180, 180),
          });
          setIsClicked(true);
        }}>
        <img src={Airplane} alt="랜덤 위치 이동 버튼" />
      </div>

      <MapContainer
        attributionControl={false}
        zoomControl={false}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        minZoom={2}
        maxZoom={14}
        style={{width: '100%', height: '100%'}}
        center={center}
        zoom={14}
        scrollWheelZoom={true}>
        <TileLayer
          noWrap={true}
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {isFinished === 3 ? Markers() : null}
        <ClickMarker
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          position={position}
          setPosition={setPosition}
        />
        <ZoomControl position="bottomright" />
        {isReady ? <SetCenter center={center} /> : null}
      </MapContainer>
    </div>
  );
}

export default Map;
