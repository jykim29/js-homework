# mission02. 영화 '엘리멘탈' 포스터 페이지 구현

- 작성자: 김종연

## 🎯 목표

- 이벤트 위임 방식 또는 반복문을 통한 이벤트 핸들링
- 선택한 요소에 따라 배경, 제목, 비주얼 이미지의 속성을 동적으로 변경
- 각 캐릭터에 맞는 오디오 재생
- (추가) Swiper.js 라이브러리 사용

## 📝 설계 과정

### 1️⃣ 구현할 로직 목록

1. 선택한 요소의 상태 클래스 변경
2. 이벤트가 발생하면 주어진 data 배열을 참조하여 동적으로 속성 변경
   1. `body` 요소의 `background`
   2. `visual img`요소의 `src` 와 `alt`
   3. `h1` 의 `textContent`

### 2️⃣ 전체적인 동작 과정

1. 사용자가 요소를 클릭 시 click 이벤트가 발생하고 이벤트 위임 또는 반복문 방식으로 이벤트 핸들링
2. 이벤트 타겟의 `data-index` 속성으로 현재 클릭한 타겟의 `index` 를 가져오고, `data` 배열에서 찾은 객체를 `currentData` 변수에 할당
3. `setClassName` 함수를 호출하여 현재 클릭한 요소에 `is-active` 클래스를 추가
   이어서 다른 요소를 클릭하였을 경우 모든 요소의 `is-active` 클래스를 제거 후 3번 과정 재실행
4. 2번에서 할당한 `currentData` 변수를 인수로 사용하여 차례대로 아래의 함수를 호출
   1. `setBgColor(data)` : `body`요소의 `background` 속성을 인수 `data`의 `color` 프로퍼티 값으로 변경
   2. `setImage(elem, data)` : 첫 번째 인수 `elem` 요소의 `src`와 `alt` 속성을 두 번째 인수 `data`의 `name`과 `alt` 프로퍼티 값으로 변경
   3. `setNameText(elem, data)` : 첫 번째 인수 `elem` 요소의 `textContent`를 두 번째 인수 `data`의 `name` 프로퍼티 값으로 변경
   4. `playSound(data)` : 첫 번째 인수 `data`의 `name` 프로퍼티 값을 사용하여 전역에서 선언한 audio 객체의 `src`값을 변경하고 재생

### 3️⃣ 코드 설명

#### ◈ 전역 변수

```js
// 기본 URL
const BASE_URL = "./assets";
// 오디오 객체
const audio = new Audio();
```

#### ◈ 이벤트 리스너 부착과 클릭 이벤트 핸들러 함수

##### 1. 이벤트 위임 방식

```js
getNode(".nav").addEventListener("click", handleClick);
function handleClick({ target }) {
  let li = target.closest("li");
  if (!li) return;
  // ...
}
```

##### 2. 반복문 방식

```js
getNodes(".nav li").forEach((li) => li.addEventListener("click", handleClick));
function handleClick({ currentTarget }) {
  let li = currentTarget;
  // ...
}
```

##### 3. 클릭 이벤트 핸들러 함수

```js
function handleClick({ target }) {
  // ... (1, 2번 참고)
  const index = li.dataset.index;
  const currentData = data[index - 1];
  if (setClassName(li) === null) return;
  setBgColor(currentData);
  setImage(getNode(".visual img"), currentData);
  setNameText(getNode(".nickName"), currentData);
  playSound(currentData);
}
```

#### ◈ 현재 선택한 요소의 data-index 속성 불러오기

```js
const index = li.dataset.index;
const currentData = data[index - 1];
```

#### ◈ `setClassName` 함수

```js
function setClassName(elem) {
  if (elem.classList.contains("is-active")) return null;
  getNodes(".nav li").forEach((li) => li.classList.remove("is-active"));
  elem.classList.add("is-active");
}
```

#### ◈ `setBgColor` 함수

```js
function setBgColor(data) {
  document.body.style.background = `linear-gradient(to bottom, ${data.color[0]}, ${data.color[1] || "#000"})`;
}
```

#### ◈ `setImage` 함수

```js
function setImage(elem, data) {
  elem.src = `${BASE_URL}/${data.name.toLowerCase()}.jpeg`;
  elem.alt = data.alt;
}
```

#### ◈ `setNameText` 함수

```js
function setNameText(elem, data) {
  elem.textContent = data.name;
}
```

#### ◈ `playSound` 함수

```js
function playSound(data) {
  audio.src = `${BASE_URL}/audio/${data.name.toLowerCase()}.m4a`;
  if (data.name === "WADE" || data.name === "GALE") audio.volume = 0.2; // ear protect
  else audio.volume = 1;
  audio.play();
}
```

### 4️⃣ Swiper.js 라이브러리를 사용한 비주얼 효과 개선

#### ◈ 라이브러리 요구사항에 따른 HTML 마크업 및 CSS 스타일링

```html
<div class="swiper-container">
  <div class="swiper">
    <button class="volume-control-button">음소거 해제</button>
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div>
          <h1 class="nickName">EMBER</h1>
          <img src="./assets/ember.jpeg" alt="엠버 포스터" />
        </div>
      </div>
      <div class="swiper-slide">
        <div>
          <h1 class="nickName">WADE</h1>
          <img src="./assets/wade.jpeg" alt="웨이드 포스터" />
        </div>
      </div>
      <div class="swiper-slide">
        <div>
          <h1 class="nickName">CLOD</h1>
          <img src="./assets/clod.jpeg" alt="클로드 포스터" />
        </div>
      </div>
      <div class="swiper-slide">
        <div>
          <h1 class="nickName">GALE</h1>
          <img src="./assets/gale.jpeg" alt="게일 포스터" />
        </div>
      </div>
    </div>
  </div>
  <div class="pagination"></div>
</div>
```

```css
.swiper-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 420px;
  display: flex;
  flex-flow: column nowrap;
  row-gap: 30px;
}
.swiper {
  width: 100%;
}
.pagination {
  width: 420px;
  display: flex;
  justify-content: center;
  column-gap: 10px;
}
.bullet {
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s;
}
.bullet.is-active {
  border: 2px solid #fff;
}
.volume-control-button {
  display: inline-block;
  background-color: dodgerblue;
  padding: 10px 20px;
  font-size: 1.1rem;
  border-radius: 5px;
  box-shadow: 0px 0px 10px gray;
  color: #fff;
  transition: all 0.5s;
  text-align: right;
}
.volume-control-button:hover {
  filter: brightness(0.9);
}
```

#### ◈ `swiper` 객체 생성

```js
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
```

#### ◈ `reaIndexChange` 이벤트 핸들러 함수

```js
swiper.on("realIndexChange", (swiper) => {
  const index = swiper.realIndex;
  setBgColor(data[index]);
  playSound(data[index]);
});
```

#### ◈ 웹 브라우저 자동재생 정책으로 인한 음소거/해제 이벤트 추가 및 `playSound` 함수 로직 변경

```js
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
function playSound(data) {
  audio.src = `${BASE_URL}/audio/${data.name.toLowerCase()}.m4a`;
  if (data.name === "WADE" || data.name === "GALE") audio.volume = 0.2; // ear protect
  else audio.volume = 1;
  if (!audio.muted) audio.play(); // mute 상태가 아닌 경우에만 재생
}
```

## 📚 회고

- 이벤트 위임 방식을 사용한 이벤트 핸들링을 직접 구현해보면서 기존에 사용해왔던 반복문 방식보다 메모리를 덜 차지하고, 코드 또한 간결해진다는 것을 알게되었습니다.
- HTML의 `data-*` 속성을 사용하면 자바스크립트의 `dataset` 프로퍼티로 속성 값을 불러와서 다양한 곳에 활용할 수 있다는 것을 배우게 되었습니다.
- 수업 중 배웠던 Swiper.js 라이브러리를 사용하여 공식문서에 따라 마크업과 스타일링을 하고 자바스크립트에서 swiper 객체를 생성하여 여러가지 속성들을 직접 이것저것 설정해보면서 기본적인 사용방법을 익히게 되는 계기가 되었습니다.
- Swiper.js로 구현 도중에 슬라이드가 바뀌는 시기를 감지하는 이벤트를 `slideChange` 로 선택했었는데, `swiper` 객체의 `loop` 속성이 `true` 라면, loop가 1회 돌고 난 뒤, 이벤트가 중복 발생하는 문제가 발생했습니다.
- 공식문서를 참고하여 여러가지 이벤트들을 테스트해본 결과 `realIndexChange` 이벤트가 정상적으로 동작하는 것을 확인하였고, 이벤트 중복 발생 문제를 해결할 수 있었습니다.
