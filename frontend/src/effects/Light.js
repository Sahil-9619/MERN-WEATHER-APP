export function light(div) {
  div.style.background = "rgba(255,255,255,0.8)";
  setTimeout(() => {
    div.style.background = "transparent";
  }, 80);
}
