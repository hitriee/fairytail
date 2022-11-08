import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {CustomMarkerIcon} from '@map/CustomMarker';
import './Map.scss';
import ClickMarker from '@/components/map/ClickMarker';
import {useEffect, useState} from 'react';
import axios from 'axios';
import shuffle from '@images/shuffle.svg';
import MoveToBack from '@/components/common/MoveToBack';
import {useRecoilState} from 'recoil';
import {loadingState} from '../apis/Recoil';

function generateRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function SetCenter({center}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [center]);

  return null;
}

function Map() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);
  // 클릭 시 팝업 표시, 해당 위치 좌표값
  const [isClicked, setIsClicked] = useState(false);
  const [position, setPosition] = useState({lat: -999, lng: -999});

  const [data, setData] = useState([]);

  const [center, setCenter] = useState({lat: 0, lng: 0});

  useEffect(() => {
    // 현재 위치 받아오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }

    // 서버에서 데이터 받아오기
    if (data !== []) {
      axios
        .get(
          'http://www.randomnumberapi.com/api/v1.0/random?min=-90&max=90&count=100',
        )
        .then(response => {
          const res = response.data;
          const temp = [];

          for (let i = 0; i < 100; i += 2) {
            temp.push({lat: res[i], lng: res[i + 1]});
          }

          setData(temp);
        });
    }
  }, []);

  // 화면에 뿌리기
  const Markers = () => {
    const markers = data.map((position, index) => {
      return <Marker key={index} position={position} icon={CustomMarkerIcon} />;
    });
    return markers;
  };

  return (
    <div className="screen">
      <MoveToBack path="/main" color="black" />
      <div
        className="map-random"
        onClick={() => {
          setPosition({
            lat: generateRandomFloat(-90, 90),
            lng: generateRandomFloat(-180, 180),
          });
          setIsClicked(true);
        }}>
        <img src={shuffle} alt="랜덤 위치 선정 버튼" />
      </div>
      <MapContainer
        zoomControl={false}
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
        minZoom={2}
        style={{width: '100%', height: '100%'}}
        center={center}
        zoom={7}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data ? Markers() : null}
        <ClickMarker
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          position={position}
          setPosition={setPosition}
        />
        <ZoomControl position="bottomright" />
        <SetCenter center={center} />
      </MapContainer>
    </div>
  );
}

export default Map;
