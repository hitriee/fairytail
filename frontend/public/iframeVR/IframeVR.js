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
  // 부모로부터 이전 페이지에서 받은 위치 정보 받아오기
  window.addEventListener("message", (ev) => {
    const location = ev.data;

    console.log(location);

    // 데이터 가져오기
    axios
      .get(
        "http://www.randomnumberapi.com/api/v1.0/random?min=0&max=75&count=100"
      )
      .then((response) => {
        const data = response.data;

        const scene = document.querySelector("a-scene");

        if (data.length < 1) {
          // 풍선이 하나도 없는 경우
          const emptyText = document.createElement("a-troika-text");
          emptyText.setAttribute(
            "value",
            "여기는 아직 풍선이 없네요...\n첫 번째 풍선을 날려볼까요?"
          );
          emptyText.setAttribute("font", "#font");
          emptyText.setAttribute("visible", true);
          emptyText.setAttribute("position", {
            x: 0,
            y: 0,
            z: -4,
          });

          emptyText.setAttribute("handle-move", "");
          emptyText.className = "move";

          emptyText.setAttribute("sound", {
            on: "mouseenter",
            src: "#fuse-sound",
            volume: 7,
          });
          emptyText.setAttribute("animation__scale", {
            property: "scale",
            to: "1.2 1.2 1.2",
            dur: 200,
            startEvents: "mouseenter",
          });
          emptyText.setAttribute("animation__scale_reverse", {
            property: "scale",
            to: "1.0 1.0 1.0",
            dur: 200,
            startEvents: "mouseleave",
          });

          scene.appendChild(emptyText);
        } else {
          // 읽은 게시글 정보 가져오기
          const readJson = localStorage.getItem("read");
          let readArr = [];
          if (readJson != null) {
            readArr = JSON.parse(readJson);
          }

          // 화면에 뿌리기
          const dodes = [];

          const dodesXYZ = [
            { px: 0, py: 0, pz: 0, fromxyz: "0 -0.1 0", toxyz: "0 0.1 0" },
            { px: 35, py: 15, pz: 30, fromxyz: "0.1 0 0", toxyz: "-0.1 0 0" },
            { px: 45, py: 0, pz: 60, fromxyz: "0 0 0.1", toxyz: "0 0 -0.1" },
            { px: 0, py: 60, pz: 15, fromxyz: "-0.1 -0.1 0", toxyz: "0 0.1 0" },
            { px: 15, py: 45, pz: 45, fromxyz: "0 -0.1 0", toxyz: "0 0.1 0.1" },
          ];

          dodesXYZ.forEach(({ px, py, pz, fromxyz, toxyz }, index) => {
            const dodecahedron = document.createElement("a-entity");
            dodecahedron.setAttribute("position", { x: 0, y: index, z: 0 });
            dodecahedron.setAttribute("rotation", { x: px, y: py, z: pz });
            dodecahedron.setAttribute("layout", {
              type: "dodecahedron",
              radius: 6 + index * 0.5,
            });
            dodecahedron.setAttribute("animation", {
              property: "position",
              from: fromxyz,
              to: toxyz,
              loop: true,
              dir: "alternate",
              dur: 2500,
              easing: "linear",
            });
            dodes.push(dodecahedron);
            scene.appendChild(dodecahedron);
          });

          data.map((item, index) => {
            const emoji = document.createElement("a-entity");
            const size = calculateSize(item);
            const isRead = readArr.includes(item) ? true : false;

            emoji.setAttribute("geometry", {
              primitive: "plane",
              width: size,
              height: size,
            });
            emoji.setAttribute("material", {
              shader: "flat",
              src: `#emoji${item}`,
              transparent: true,
              alphaTest: 0.4,
              opacity: isRead ? 0.5 : 1.0,
            });
            emoji.setAttribute("look-at", "[camera]");
            emoji.className = "emoji";

            emoji.setAttribute("handle-click", { post_id: item });

            emoji.setAttribute("sound", {
              on: "mouseenter",
              src: "#fuse-sound",
              volume: 7,
            });
            emoji.setAttribute("animation__scale", {
              property: "scale",
              to: "1.2 1.2 1.2",
              dur: 200,
              startEvents: "mouseenter",
            });
            emoji.setAttribute("animation__scale_reverse", {
              property: "scale",
              to: "1.0 1.0 1.0",
              dur: 200,
              startEvents: "mouseleave",
            });

            const titleText = document.createElement("a-troika-text");
            titleText.setAttribute("id", `title${index}`);
            titleText.setAttribute("value", `제목${item}`);
            titleText.setAttribute("font", "#font");
            titleText.setAttribute("visible", false);
            titleText.setAttribute("position", {
              x: 0,
              y: size / 2 + 0.1,
              z: 0,
            });

            emoji.appendChild(titleText);

            emoji.setAttribute("event-set__enter", {
              _event: "mouseenter",
              _target: `#title${index}`,
              visible: true,
            });
            emoji.setAttribute("event-set__leave", {
              _event: "mouseleave",
              _target: `#title${index}`,
              visible: false,
            });

            dodes[Math.floor(index / 20)].appendChild(emoji);
          });

          // data.map(({ like_cnt, emoji_no, post_id, title }, index) => {
          //   const emoji = document.createElement("a-entity");
          //   const size = calculateSize(like_cnt);
          //   const isRead = readArr.includes(post_id) ? true : false;

          //   emoji.setAttribute("geometry", {
          //     primitive: "plane",
          //     width: size,
          //     height: size,
          //   });
          //   emoji.setAttribute("material", {
          //     shader: "flat",
          //     src: `#emoji${emoji_no}`,
          //     transparent: true,
          //     alphaTest: 0.4,
          //     opacity: isRead ? 0.5 : 1.0,
          //   });
          //   emoji.setAttribute("look-at", "[camera]");
          //   emoji.className = "emoji";

          //   emoji.setAttribute("handle-click", { post_id: post_id });

          //   emoji.setAttribute("sound", {
          //     on: "mouseenter",
          //     src: "#fuse-sound",
          //     volume: 7,
          //   });
          //   emoji.setAttribute("animation__scale", {
          //     property: "scale",
          //     to: "1.2 1.2 1.2",
          //     dur: 200,
          //     startEvents: "mouseenter",
          //   });
          //   emoji.setAttribute("animation__scale_reverse", {
          //     property: "scale",
          //     to: "1.0 1.0 1.0",
          //     dur: 200,
          //     startEvents: "mouseleave",
          //   });

          //   const titleText = document.createElement("a-troika-text");
          //   titleText.setAttribute("id", `title${index}`);
          //   titleText.setAttribute("value", title);
          //   titleText.setAttribute("font", "#font");
          //   titleText.setAttribute("visible", false);
          //   titleText.setAttribute("position", { x: 0, y: size / 2, z: 0 });

          //   emoji.appendChild(titleText);

          //   emoji.setAttribute("event-set__enter", {
          //     _event: "mouseenter",
          //     _target: `#title${index}`,
          //     visible: true,
          //   });
          //   emoji.setAttribute("event-set__leave", {
          //     _event: "mouseleave",
          //     _target: `#title${index}`,
          //     visible: false,
          //   });

          //   dodes[Math.floor(index / 20)].appendChild(emoji);
          // });
        }
      });
  });
}

window.onload = init;