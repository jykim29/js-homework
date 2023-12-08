# mission01. 네이버 로그인 페이지 구현

- 작성자 : 김종연

---

## 🎯 목표

- 로그인과 비밀번호를 정확히 입력했을 때 welcome 페이지로 넘어갈 수 있도록 코드 로직을 작성합니다.

- 재사용 가능한 함수를 분리하고 함수를 중심으로 설계하는 방법에 대해 학습합니다.

---

## 📝 설계 과정

### 1️⃣ 구현할 로직 목록

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

### 2️⃣ 전체적인 동작 과정

1. 사용자 입력 시 input 이벤트 발생
2. `inputValidation` 함수에서 사용자 입력 값을 validation
3. `toggleInvalidStateClass` 함수에서 validation에 따라 클래스 추가 및 제거
4. 로그인 버튼 클릭 시 submit 이벤트 발생
5. `login` 함수에서 `compare` 함수를 호출하여 사용자 입력값과 user 객체 값 비교
6. 일치할 경우 `success` 함수 호출, 불일치할 경우 `fail` 함수 호출

### 3️⃣ 코드 설명

#### ◈ 전역 변수 선언

```js
// 페이지 주소
const WELCOME_PAGE_URL = "welcome.html";
// 로그인 실패 메세지
const LOGIN_FAIL_MSG = "아이디 또는 비밀번호가 올바르지 않습니다.";
// DOM element
const $userEmailInput = document.querySelector(".user-email-input");
const $userPasswordInput = document.querySelector(".user-password-input");
const $loginForm = document.querySelector(".login-form");

// 객체를 사용한 email과 password의 valid 상태 관리
const isValidObj = {
  userEmail: false,
  userPassword: false,
};
```

#### ◈ 이벤트 핸들러

```js
// input 이벤트 핸들러
function handleInput(e) {
  inputValidation(e.target);
}

// submit 이벤트 핸들러
function handleSubmit(e) {
  e.preventDefault();
  login(
    e.target,
    (url) => navigate(url),
    (msg) => alert(msg)
  );
}
[$userEmailInput, $userPasswordInput].forEach((node) => {
  node.addEventListener("input", handleInput);
});
$loginForm.addEventListener("submit", handleSubmit);
```

#### ◈ email, pw 정규표현식을 사용한 validation 및 상태 변수 갱신

```js
function inputValidation(node) {
  const { id, value } = node;
  isValidObj[id] = id === "userEmail" ? emailReg(value) : pwReg(value);
  return toggleInvalidStateClass(node, isValidObj[id]);
}
```

- DOM 요소를 매개변수 `node`로 받아오고 구조분해할당을 통하여 `id`와 `value` 변수로 나눕니다.
- `node`의 `id`값에 따라 알맞는 정규표현식으로 검증합니다.
- 삼항식을 사용하여 검증 결과를 전역 객체 `isValidObj`에서 `id` 와 맞는 프로퍼티의 값에 재할당합니다.
- `toggleInvalidStateClass` 함수에 `node`와 `isValidObj[id]`를 인수로 전달하여 호출하고 본 함수를 종료합니다.

#### ◈ valid 또는 invalid 상태에 따라 클래스를 추가 및 제거

```js
function toggleInvalidStateClass(node, isValid) {
  if (isValid) {
    node.classList.remove("is--invalid");
  } else {
    node.classList.add("is--invalid");
  }
}
```

- 2단계에서 전달받은 `node`와 `isValidObj[id]`로 조건문을 사용하여 클래스를 추가 및 제거합니다.

#### ◈ user 객체의 id, pw 값과 사용자가 입력한 값 비교

```js
function compare(emailValue, passwordValue) {
  const { id: userId, pw: userPw } = user;
  return emailValue === userId && passwordValue === userPw ? true : false;
}
```

- 사용자가 입력한 값 `emailValue`와 `passwordValue`를 매개변수로 받고 과제에서 제공된 `user` 객체의 `id`와 `pw` 값을 논리연산자 `&&`로 비교하여 `true` 또는 `false` 를 반환합니다.

#### ◈ 로그인 버튼 클릭 시 조건에 따라 처리

```js
function login(form, success, fail) {
  const { userEmail: inputEmail, userPassword: inputPassword } = form;
  const isCorrect = compare(inputEmail.value, inputPassword.value);
  return isCorrect ? success(WELCOME_PAGE_URL) : fail(LOGIN_FAIL_MSG);
}
```

- 매개변수로 로그인 form의 DOM 요소와 success 및 fail함수를 전달받습니다.
- 로그인 form의 각 input을 구조분해할당을 통해 분리합니다.
- 4단계에서 만들었던 compare함수를 호출하여 나온 결과를 `isCorrect` 변수에 할당합니다.
- `isCorrect` 값에 따라 `true` 일 경우 `success` 함수를 호출하여 `welcome` 페이지로 이동하며, `false` 일 경우 `fail` 함수를 호출하여 `alert` 으로 메세지를 출력합니다.

#### ◈ 페이지 이동하는 유틸 함수

```js
function navigate(url) {
  window.location.href = url;
}
```

## 📚 회고

- 이번 과제를 통해 주어진 요구사항을 재사용 가능한 함수로 분리하여 함수 중심으로 로직을 설계하는 방법을 시도해보는 계기가 되었습니다.
- 주어진 요구사항에 맞춰 코드를 작성하고 동작을 완성시키는 것은 그렇게 어렵지 않았으나, 코드를 수정하는 과정에서 *한 개의 함수는 한 가지 역할만 해야한다*는 점을 고려하면서 '어떻게하면 함수를 최소한의 역할만 하도록 분리하고, 재사용이 가능하도록 설계할까' 에 대한 고민에 많은 시간이 소요되었습니다.
- 최대한 깔끔하게 코드를 작성하려고 노력했지만, 클린코드를 향한 길은 아직은 멀게만 느껴졌습니다.
- 앞으로 여러가지 로직을 설계하면서 감을 익혀야겠다고 생각했습니다.
