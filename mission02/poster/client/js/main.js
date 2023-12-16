/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 오디오 재생 
6. 함수 분리

*/

(() => {
  // 기본 URL
  const BASE_URL = "./assets";
  // 이벤트 처리 방식
  const EVENT_MODE = "delegation"; // 'delegation' | 'loop'
  // 오디오 객체
  const audio = new Audio();

  // 이벤트 위임 방식
  if (EVENT_MODE === "delegation") getNode(".nav").addEventListener("click", handleClick);
  // 반복문 방식
  else getNodes(".nav li").forEach((li) => li.addEventListener("click", handleClick));

  function handleClick({ target }) {
    let li = EVENT_MODE === "delegation" ? target.closest("li") : this;
    if (!li) return;
    const index = li.dataset.index;
    const currentData = data[index - 1];
    if (setClassName(li) === null) return;
    setBgColor(currentData);
    setImage(getNode(".visual img"), currentData);
    setNameText(getNode(".nickName"), currentData);
    playSound(currentData);
  }

  function setClassName(elem) {
    if (elem.classList.contains("is-active")) return null;
    getNodes(".nav li").forEach((li) => li.classList.remove("is-active"));
    elem.classList.add("is-active");
  }

  function setBgColor(data) {
    document.body.style.background = `linear-gradient(to bottom, ${data.color[0]}, ${data.color[1] || "#000"})`;
  }

  function setImage(elem, data) {
    elem.src = `${BASE_URL}/${data.name.toLowerCase()}.jpeg`;
    elem.alt = data.alt;
  }

  function setNameText(elem, data) {
    elem.textContent = data.name;
  }

  function playSound(data) {
    audio.src = `${BASE_URL}/audio/${data.name.toLowerCase()}.m4a`;
    if (data.name === "WADE" || data.name === "GALE") audio.volume = 0.2; // ear protect
    else audio.volume = 1;
    audio.play();
  }
})();
