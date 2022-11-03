import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvent,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {CustomMarker, ClickMarker} from '@map/CustomMarker';
import {useState} from 'react';
import './Map.scss';

function Map() {
  // 클릭한 위치
  const [position, setPosition] = useState({lat: 0, lng: 0});

  function MapClickPosition() {
    const map = useMapEvent('click', e => {
      const {lat, lng} = e.latlng;
      setPosition({lat: lat, lng: lng});
    });
    return (
      <Marker position={position} icon={ClickMarker}>
        <Popup>
          <p>선택한 위치는:</p>
          <p>위도: {position.lat}</p>
          <p>경도: {position.lng}</p>
          <p>입니다. 이동해볼까요?</p>
          <button className="btn">네</button>
          <button className="btn">아니요</button>
        </Popup>
      </Marker>
    );
  }

  // 지구본에서 받아온 위치 정보로 처음 지도 center 지정

  // 위치 정보에 기반해서 서버로부터 데이터 호출
  const data = [
    {lat: 0, lng: 0},
    {lat: 1, lng: 1},
    {lat: 2, lng: 2},
    {lat: 3, lng: 3},
    {lat: 4, lng: 4},
    {lat: 5, lng: 5},
    {lat: 6, lng: 6},
    {lat: 7, lng: 7},
    {lat: 8, lng: 8},
    {lat: 9, lng: 9},
    {lat: 10, lng: 10},
    {lat: 11, lng: 11},
    {lat: 12, lng: 12},
    {lat: 13, lng: 13},
    {lat: 14, lng: 14},
    {lat: 15, lng: 15},
    {lat: 16, lng: 16},
    {lat: 17, lng: 17},
    {lat: 18, lng: 18},
    {lat: 19, lng: 19},
    {lat: 20, lng: 20},
    {lat: 21, lng: 21},
    {lat: 22, lng: 22},
    {lat: 23, lng: 23},
    {lat: 24, lng: 24},
    {lat: 25, lng: 25},
    {lat: 26, lng: 26},
    {lat: 27, lng: 27},
    {lat: 28, lng: 28},
    {lat: 29, lng: 29},
  ];

  // 화면에 뿌리기
  const Markers = (): JSX.Element[] => {
    const markers = data.map((position, index) => {
      return <Marker key={index} position={position} icon={CustomMarker} />;
    });
    return markers;
  };

  return (
    <MapContainer
      maxBounds={[
        [-200, -180],
        [200, 180],
      ]}
      minZoom={2}
      style={{width: '100%', height: '100%'}}
      center={{lat: 35, lng: 127}}
      zoom={2}
      scrollWheelZoom={true}>
      <MapClickPosition />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Markers()}
    </MapContainer>
  );
}

export default Map;
