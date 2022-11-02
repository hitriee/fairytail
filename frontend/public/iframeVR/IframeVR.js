function sendMsgToParent(msg) {
  window.parent.postMessage(msg, "*");
}

function calculateSize(like_cnt) {
  switch (true) {
    case like_cnt >= 100:
      return 1.4;
    case like_cnt >= 75:
      return 1.32;
    case like_cnt >= 50:
      return 1.24;
    case like_cnt >= 25:
      return 1.16;
    case like_cnt >= 0:
      return 0.8;
  }
}

function init() {
  // 위치 정보 받아오기
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

  const onError = (error) => {
    result.errorCode = error.code;
    result.errorMessage = error.message;
  };

  if (!("geolocation" in navigator)) {
    onError({
      code: 0,
      message: "Geolocation이 지원되지 않는 브라우저입니다.",
    });
    sendMsgToParent("denied");
  } else {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  // 데이터 가져오기 (최대 100개)
  const data = [
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 10, emoji_no: 1, post_id: 1 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 30, emoji_no: 3, post_id: 3 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 50, emoji_no: 5, post_id: 5 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 70, emoji_no: 7, post_id: 7 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
    { like_cnt: 90, emoji_no: 9, post_id: 9 },
  ];

  // 화면에 뿌리기
  const scene = document.querySelector("a-scene");
  const dodes = [];

  const dodesPosition = [
    { x: 0, y: 0, z: 0 },
    { x: 35, y: 15, z: 30 },
    { x: 45, y: 0, z: 60 },
    { x: 0, y: 60, z: 15 },
    { x: 0, y: 45, z: 45 },
  ];

  dodesPosition.forEach(({ x, y, z }, index) => {
    const dodecahedron = document.createElement("a-entity");
    dodecahedron.setAttribute("position", { x: 0, y: 2, z: 0 });
    dodecahedron.setAttribute("rotation", { x: x, y: y, z: z });
    dodecahedron.setAttribute("layout", {
      type: "dodecahedron",
      radius: 7,
    });
    dodes.push(dodecahedron);
    scene.appendChild(dodecahedron);
  });

  data.map(({ like_cnt, emoji_no, post_id }, index) => {
    const emoji = document.createElement("a-entity");
    const size = calculateSize(like_cnt);

    emoji.setAttribute("geometry", {
      primitive: "plane",
      width: size,
      height: size,
    });
    emoji.setAttribute("material", {
      shader: "flat",
      src: `../emojis/${emoji_no}.png`,
      side: "double",
      transparent: true,
      alphaTest: 0.5,
    });
    emoji.setAttribute("look-at", "[camera]");
    emoji.setAttribute("ray-origin", "mouse");

    emoji.setAttribute("handle-click", { post_id: post_id });

    dodes[Math.floor(index / 20)].appendChild(emoji);
  });
}

window.onload = init;
