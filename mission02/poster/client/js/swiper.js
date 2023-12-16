(() => {
  // 기본 URL
  const BASE_URL = "./assets";
  // 오디오 객체
  const audio = new Audio();
  audio.muted = true;

  const swiper = new Swiper(".swiper", {
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: ".pagination",
      type: "bullets",
      clickable: true,
      bulletClass: "bullet",
      bulletActiveClass: "is-active",
      renderBullet(index, className) {
        return /*html*/ `<span class="${className}"><img src="${BASE_URL}/${data[index].name.toLowerCase()}.jpeg" /></span>`;
      },
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    effect: "cube",
    loop: true,
  });

  swiper.on("realIndexChange", (swiper) => {
    const index = swiper.realIndex;
    setBgColor(data[index]);
    playSound(data[index]);
  });

  function setBgColor(data) {
    document.body.style.background = `linear-gradient(to bottom, ${data.color[0]}, ${data.color[1] || "#000"})`;
  }
  function playSound(data) {
    audio.src = `${BASE_URL}/audio/${data.name.toLowerCase()}.m4a`;
    if (data.name === "WADE" || data.name === "GALE") audio.volume = 0.2; // ear protect
    else audio.volume = 1;
    if (!audio.muted) audio.play();
  }
  getNode(".volume-control-button").addEventListener("click", (e) => {
    if (audio.muted) {
      e.currentTarget.textContent = "음소거";
      e.currentTarget.style.backgroundColor = "red";
      audio.muted = false;
    } else {
      e.currentTarget.textContent = "음소거 해제";
      e.currentTarget.style.backgroundColor = "dodgerblue";
      audio.muted = true;
    }
  });
})();
