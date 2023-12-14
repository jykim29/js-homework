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
  // 페이지 주소
  const WELCOME_PAGE_URL = "welcome.html";
  // 로그인 실패 메세지
  const LOGIN_FAIL_MSG = "아이디 또는 비밀번호가 올바르지 않습니다.";
  // DOM Element
  const $userEmailInput = document.querySelector(".user-email-input");
  const $userPasswordInput = document.querySelector(".user-password-input");
  const $loginForm = document.querySelector(".login-form");

  // 객체로 email과 password의 valid 상태 관리
  const isValidObj = {
    userEmail: false,
    userPassword: false,
  };
  // 페이지 첫 로드 시 email input 요소에 포커스
  $userEmailInput.focus();

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
    return isCorrect ? success(WELCOME_PAGE_URL) : fail(LOGIN_FAIL_MSG);
  }

  // 페이지 이동
  function navigate(url) {
    window.location.href = url;
  }

  [$userEmailInput, $userPasswordInput].forEach((node) => {
    node.addEventListener("input", handleInput);
  });
  $loginForm.addEventListener("submit", handleSubmit);
})();

/*
  이메일 입력값과 패스워드 입력값 그리고 user의 id와 pw값을 비교할 때,
  입력한 값의 validation 상태도 조건에 추가시켜야한다.
  즉 (emailValue === user.id && pwValue === user.pw) 조건만 추가할 것이 아니라,
  emailPass, pwPass라는 validation 상태 변수도 같이 true인지 체크를 해줘야 한다.

  예시) 
  if(emailPass && pwPass) {
    if(emailValue === user.id && pwValue === user.pw) {
      // 로그인 실행
    } else {
      // 로그인 오류 출력
    }
  } else {
    // 입력값 validation 실패!
  }
*/
