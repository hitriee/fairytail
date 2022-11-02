function init() {
  // 위치 정보 가져오기
  const result = {
    loaded: false,
    latitude: 0,
    longitude: 0,
    errorCode: 0,
    errorMessage: "",
  };

  const onSuccess = ({ coords }) => {
    result.loaded = true;
    result.latitude = coords.latitude;
    result.longitude = coords.longitude;
  };

  const onError = ({ error }) => {
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

  // 데이터 가져오기

  // 화면에 뿌리기
}

window.onload = init;
