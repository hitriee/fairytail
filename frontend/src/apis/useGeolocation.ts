function useGeolocation() {
  const result = {
    loaded: false,
    latitude: 0,
    longitude: 0,
    errorCode: 0,
    errorMessage: '',
  };

  const onSuccess = (location: {
    coords: {latitude: number; longitude: number};
  }) => {
    result.loaded = true;
    result.latitude = location.coords.latitude;
    result.longitude = location.coords.longitude;
  };

  const onError = (error: {code: number; message: string}) => {
    result.errorCode = error.code;
    result.errorMessage = error.message;
  };

  if (!('geolocation' in navigator)) {
    onError({
      code: 0,
      message: 'Geolocation이 지원되지 않습니다.',
    });
  } else {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  return result;
}

export default useGeolocation;
