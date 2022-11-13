AFRAME.registerComponent("handle-click", {
  schema: {
    post_id: { type: "number", default: 0 },
  },
  init: function () {
    const post_id = this.data.post_id;

    this.el.addEventListener("click", function () {
      // 읽은 글 목록 가져오기
      const readJson = localStorage.getItem("read");
      let readArr = [];
      if (readJson != null) {
        readArr = JSON.parse(readJson);
      }

      // 게시글 번호가 읽은 글 목록에 없다면 추가
      if (!readArr?.includes(post_id)) {
        readArr?.push(post_id);
        localStorage.setItem("read", JSON.stringify(readArr));
      }

      // 부모로 게시글 번호 전송
      window.parent.postMessage(post_id, "*");
    });
  },
});

AFRAME.registerComponent("handle-move", {
  init: function () {
    this.el.addEventListener("click", function () {
      window.parent.postMessage("create", "*");
    });
  },
});

AFRAME.registerComponent("limit-distance", {
  init: function () {},
  tick: function () {
    if (this.el.object3D.position.x > 4) {
      this.el.object3D.position.x = 4;
    }
    if (this.el.object3D.position.x < -4) {
      this.el.object3D.position.x = -4;
    }
    if (this.el.object3D.position.z > 4) {
      this.el.object3D.position.z = 4;
    }
    if (this.el.object3D.position.z < -4) {
      this.el.object3D.position.z = -4;
    }
  },
});
