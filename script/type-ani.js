export let original = document.querySelector("#intro_text h1").textContent;
export let counter = 0;

export function loop() {
  if (counter < original.length + 1) {
    document.querySelector("#intro_text h1").textContent = original.slice(0, counter);
    counter++;
    setTimeout(loop, 100);
  }
}
