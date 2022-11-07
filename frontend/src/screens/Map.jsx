import {useNavigate} from 'react-router-dom';
import {MapContainer, TileLayer, Marker, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {CustomMarkerIcon} from '@map/CustomMarker';
import './Map.scss';
import ClickMarker from '@/components/map/ClickMarker';
import {useState} from 'react';

function generateRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function Map() {
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);
  const [position, setPosition] = useState({lat: -999, lng: -999});

  // 지구본에서 받아온 위치 정보로 처음 지도 center 지정
  const center = {lat: 35, lng: 127};

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
  const Markers = () => {
    const markers = data.map((position, index) => {
      return <Marker key={index} position={position} icon={CustomMarkerIcon} />;
    });
    return markers;
  };

  return (
    <div className="screen">
      <div className="leaflet-bottom leaflet-left">
        <div className="leaflet-control-zoom leaflet-bar leaflet-control map-navbar">
          <a
            className="leaflet-control-zoom-in map-navbar-a"
            role="button"
            onClick={() => navigate(-1)}>
            <span className="map-navbar-span">←</span>
          </a>
        </div>
      </div>
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control-zoom leaflet-bar leaflet-control map-navbar">
          <a
            className="leaflet-control-zoom-in map-navbar-a"
            role="button"
            onClick={() => {
              setPosition({
                lat: generateRandomFloat(-90, 90),
                lng: generateRandomFloat(-180, 180),
              });
              setIsClicked(true);
            }}>
            <span className="map-navbar-span">🔀</span>
          </a>
        </div>
      </div>
      <MapContainer
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
        {Markers()}
        <ClickMarker
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          position={position}
          setPosition={setPosition}
        />
      </MapContainer>
    </div>
  );
}

export default Map;
