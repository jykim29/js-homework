const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

function emailReg(text) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}

(function () {
  "use strict";
  const $userEmailInput = document.querySelector(".user-email-input");
  const $userPasswordInput = document.querySelector(".user-password-input");
  const $loginForm = document.querySelector(".login-form");

  // input 요소 input 이벤트 핸들러
  function inputHandler(e) {
    inputValidation(this);
  }

  // form 요소 submit 이벤트 핸들러
  function submitHandler(e) {
    e.preventDefault();
    login(
      e.target,
      () => navigate("./welcome.html"),
      () => alert("아이디 또는 비밀번호가 올바르지 않습니다.")
    );
  }

  // 1. email 정규표현식을 사용한 validation
  // 2. pw 정규표현식을 사용한 validation
  function inputValidation(node) {
    const { id, value } = node;
    const isValid = id === "userEmail" ? emailReg(value) : pwReg(value);
    if (isValid) {
      node.classList.remove("is--invalid");
    } else {
      node.classList.add("is--invalid");
    }
  }

  // 3. 상태 변수 관리
  function compare(email, password) {
    const { id, pw } = user;
    return email === id && password === pw ? true : false;
  }

  // 4. 로그인 버튼을 클릭시 조건처리
  function login(form, success, fail) {
    const { userEmail: email, userPassword: password } = form;
    const isCorrect = compare(email.value, password.value);
    return isCorrect ? success() : fail();
  }

  // 페이지 이동
  function navigate(url) {
    window.location.href = url;
  }

  $userEmailInput.addEventListener("input", inputHandler);
  $userPasswordInput.addEventListener("input", inputHandler);
  $loginForm.addEventListener("submit", submitHandler);
})();
