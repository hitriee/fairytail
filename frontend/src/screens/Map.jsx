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
import ClickMarker from '@map/ClickMarker';
import {useEffect, useState} from 'react';
import MoveToBack from '@common/MoveToBack';
import InitMessage from '@apis/notifications/foregroundMessaging';
import {getMessageMap} from '@apis/map';
import OpenHelp from '@common/OpenHelp';

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
  // 클릭 시 팝업 표시, 해당 위치 좌표값
  const [isClicked, setIsClicked] = useState(false);
  const [position, setPosition] = useState({lat: -999, lng: -999});

  const [center, setCenter] = useState({lat: 0, lng: 0});
  const [data, setData] = useState([]);

  useEffect(() => {
    // 현재 위치 받아오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async pos => {
        setCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }

    // 서버에서 데이터 받아오기
    for (let i = 0; i < 4; i++) {
      getMessageMap(i)
        .then(res => {
          setData(prev => prev.concat(res.data));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  // 받은 데이터 화면에 뿌리기
  const Markers = () => {
    const markers = data.map((position, index) => {
      return <Marker key={index} position={position} icon={CustomMarkerIcon} />;
    });
    return markers;
  };

  return (
    <>
      <InitMessage />
      <div className="screen">
        <MoveToBack path="/main" color="black" />
        <OpenHelp imagesIndex={1} color="black" />
        <div
          className="map-random"
          onClick={() => {
            setPosition({
              lat: generateRandomFloat(-90, 90),
              lng: generateRandomFloat(-180, 180),
            });
            setIsClicked(true);
          }}>
          {'랜덤 위치로\n이동하기'}
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
    </>
  );
}

export default Map;
