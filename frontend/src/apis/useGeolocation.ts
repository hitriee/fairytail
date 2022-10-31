function useGeolocation() {
  const result = {
    loaded: false,
    latitude: 0,
    longitude: 0,
    errorCode: 0,
    errorMessage: "",
  };

  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    result.loaded = true;
    result.latitude = location.coords.latitude;
    result.longitude = location.coords.longitude;
  };

  const onError = (error: { code: number; message: string }) => {
    result.errorCode = error.code;
    result.errorMessage = error.message;
  };

  if (!("geolocation" in navigator)) {
    onError({
      code: 0,
      message: "Geolocation이 지원되지 않습니다.",
    });
  } else {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      } else if (result.state === "prompt") {
        alert("위치 정보 사용 권한을 승인해주세요.");
      } else {
        alert("위치 정보 사용을 거부하셨습니다.");
      }
    });
  }
  return result;
}

export default useGeolocation;
