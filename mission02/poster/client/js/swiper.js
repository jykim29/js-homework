(() => {
  // 기본 URL
  const BASE_ASSETS_PATH = "/mission02/poster/client/assets";
  // 오디오 객체
  let audio = new AudioPlayer("");

  const swiper = new Swiper(".swiper", {
    autoplay: {
      enabled: false,
      delay: 3000,
    },
    pagination: {
      el: ".pagination",
      type: "bullets",
      clickable: true,
      bulletClass: "bullet",
      bulletActiveClass: "is-active",
      renderBullet(index, className) {
        return /*html*/ `<span class="${className}"><img src="${BASE_ASSETS_PATH}/${data[index].name.toLowerCase()}.jpeg" /></span>`;
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
    const audioSource = `${BASE_ASSETS_PATH}/audio/${data.name.toLowerCase()}.m4a`;
    const newAudio = new AudioPlayer(audioSource);
    audio.stop();
    audio = newAudio;
    if (data.name === "WADE" || data.name === "GALE") audio.volume = 0.2; // ear protect
    else audio.volume = 1;
    audio.play();
  }
  function toggleAutoPlay() {
    let isAuto = false;
    return (e) => {
      if (!isAuto) {
        e.currentTarget.textContent = "■ Stop";
        swiper.autoplay.enabled = true;
        swiper.autoplay.start();
      } else {
        e.currentTarget.textContent = "▶ AutoPlay";
        swiper.autoplay.enabled = false;
        swiper.autoplay.stop();
      }
      e.currentTarget.classList.toggle("playing");
      isAuto = !isAuto;
    };
  }
  getNode(".autoplay-button").addEventListener("click", toggleAutoPlay());
})();
