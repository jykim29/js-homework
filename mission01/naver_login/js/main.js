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
  // DOM element
  const $userEmailInput = document.querySelector(".user-email-input");
  const $userPasswordInput = document.querySelector(".user-password-input");
  const $loginForm = document.querySelector(".login-form");

  // 객체를 사용한 email과 password의 valid 상태 관리
  const isValidObj = {
    userEmail: false,
    userPassword: false,
  };
  // 페이지 첫 로드 시 email input 요소에 포커스
  $userEmailInput.focus();

  // input 요소 input 이벤트 핸들러
  function handleInput(e) {
    inputValidation(e.target);
  }

  // form 요소 submit 이벤트 핸들러
  function handleSubmit(e) {
    e.preventDefault();
    login(
      e.target,
      () => navigate("welcome.html"),
      () => alert("아이디 또는 비밀번호가 올바르지 않습니다.")
    );
  }

  // 1. email 정규표현식을 사용한 validation
  // 2. pw 정규표현식을 사용한 validation
  function inputValidation(node) {
    const { id, value } = node;
    isValidObj[id] = id === "userEmail" ? emailReg(value) : pwReg(value);
    return toggleInvalidStateClass(node, isValidObj[id]);
  }

  // invalid 상태 클래스 토글
  function toggleInvalidStateClass(node, isValid) {
    if (isValid) {
      node.classList.remove("is--invalid");
    } else {
      node.classList.add("is--invalid");
    }
  }

  // user 객체 값과 입력한 값 비교
  function compare(emailValue, passwordValue) {
    const { id: userId, pw: userPw } = user;
    return emailValue === userId && passwordValue === userPw ? true : false;
  }

  // 4. 로그인 버튼을 클릭시 조건처리
  function login(form, success, fail) {
    const { userEmail: inputEmail, userPassword: inputPassword } = form;
    const isCorrect = compare(inputEmail.value, inputPassword.value);
    return isCorrect ? success() : fail();
  }

  // 페이지 이동
  function navigate(url) {
    window.location.href = url;
  }

  [$userEmailInput, $userPasswordInput].forEach((node) => {
    node.addEventListener("input", handleInput);
  });
  $loginForm.addEventListener("submit", handleSubmit);

  /* 클로저 연습 겸 만들어 본 bindEvent 함수
  function bindEvent(nodes, type, handler) {
    if (Array.isArray(nodes)) {
      nodes.forEach((node) => node.addEventListener(type, handler));
    } else {
      nodes.addEventListener(type, handler);
    }
    return () => {
      if (Array.isArray(nodes)) {
        nodes.forEach((node) => node.removeEventListener(type, handler));
      } else {
        nodes.removeEventListener(type, handler);
      }
    };
  }
  const removeInputEvent = bindEvent([$userEmailInput, $userPasswordInput], "input", handleInput);
  const removeSubmitEvent = bindEvent($loginForm, "submit", handleSubmit);
  */
})();
