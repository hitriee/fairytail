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
  // 부모로부터 데이터 받아오기
  window.addEventListener("message", (ev) => {
    const data = ev.data;
    const scene = document.querySelector("a-scene");

    // 이미 화면에 데이터가 뿌려져 있다면 전부 지우기
    const emojies = document.querySelectorAll(".emoji");

    if (emojies.length > 0) {
      for (let i = 0; i < emojies.length; i++) {
        const emojiItem = emojies[i];
        emojiItem.remove();
      }
    }

    if (data.length < 1 || data === undefined || data === null) {
      // 풍선이 하나도 없는 경우
      const emptyText = document.createElement("a-troika-text");
      emptyText.setAttribute(
        "value",
        "여기는 아직 풍선이 없네요...\n이곳에 방문해서 이야기를 나눠보세요 :)"
      );
      emptyText.setAttribute("font", "#font");
      emptyText.setAttribute("visible", true);
      emptyText.setAttribute("position", {
        x: 0,
        y: 0,
        z: -4,
      });

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
        { rx: -90, ry: -90, rz: 0, fromxyz: "0 -0.1 0", toxyz: "0 0.1 0" },
        { rx: 35, ry: 15, rz: 30, fromxyz: "0.1 0 0", toxyz: "-0.1 0 0" },
        { rx: 45, ry: 0, rz: 60, fromxyz: "0 0 0.1", toxyz: "0 0 -0.1" },
        { rx: 0, ry: 60, rz: 15, fromxyz: "-0.1 -0.1 0", toxyz: "0 0.1 0" },
        { rx: 15, ry: 45, rz: 45, fromxyz: "0 -0.1 0", toxyz: "0 0.1 0.1" },
      ];

      dodesXYZ.forEach(({ rx, ry, rz, fromxyz, toxyz }, index) => {
        const dodecahedron = document.createElement("a-entity");
        dodecahedron.setAttribute("position", { x: 0, y: index, z: 0 });
        dodecahedron.setAttribute("rotation", { x: rx, y: ry, z: rz });
        dodecahedron.setAttribute("layout", {
          type: "dodecahedron",
          radius: 6.5 + index * 0.5,
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

      data.map(({ emojiNo, likeCnt, postId, title, type }, index) => {
        const emoji = document.createElement("a-entity");
        const size = calculateSize(likeCnt);
        const isRead = readArr.includes(postId + type) ? true : false;

        emoji.setAttribute("geometry", {
          primitive: "plane",
          width: size,
          height: size,
        });
        emoji.setAttribute("material", {
          shader: "flat",
          src: `#emoji${emojiNo}`,
          transparent: true,
          alphaTest: 0.4,
          opacity: isRead ? 0.5 : 1.0,
        });
        emoji.setAttribute("look-at", "[camera]");
        emoji.className = "emoji";

        emoji.setAttribute("handle-click", { postId: postId, type: type });

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
        titleText.setAttribute("value", title);
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
    }
  });
}

window.onload = init;
