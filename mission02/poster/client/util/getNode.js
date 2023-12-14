function getNode(selector) {
  if (typeof selector !== "string") throw new TypeError("getNode 함수의 첫 번째 인수는 문자형이여야 합니다.");
  const node = document.querySelector(selector);
  if (!node) throw new Error("노드를 찾을 수 없습니다.");
  return node;
}

function getNodes(selector) {
  if (typeof selector !== "string") throw new TypeError("getNode 함수의 첫 번째 인수는 문자형이여야 합니다.");
  const node = document.querySelectorAll(selector);
  if (!node) throw new Error("노드를 찾을 수 없습니다.");
  return node;
}
