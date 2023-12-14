/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

(() => {
  const BASE_URL = "./assets/";

  getNode(".nav").addEventListener("click", handleClick);

  function handleClick({ target }) {
    const li = target.closest("li");
    if (!li) return;
    const index = li.dataset.index;
    const currentData = data[index - 1];
    if (setClassName(li) === null) return;
    setBgColor(currentData);
    setImage(getNode(".visual img"), currentData);
    setNameText(getNode(".nickName"), currentData);
  }

  function setClassName(elem) {
    if (elem.classList.contains("is-active")) return null;
    getNodes(".nav li").forEach((li) => li.classList.remove("is-active"));
    elem.classList.add("is-active");
  }

  function setBgColor(data) {
    getNode("body").style.background = `linear-gradient(to bottom, ${data.color[0]}, ${data.color[1] || "#000"})`;
  }

  function setImage(elem, data) {
    elem.src = BASE_URL + data.name.toLowerCase() + ".jpeg";
    elem.alt = data.alt;
  }

  function setNameText(elem, data) {
    elem.textContent = data.name;
  }
})();
