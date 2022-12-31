let timer;
export default function setDebounce(callback, delay, ...args) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    callback(...args);
    timer = null;
  }, delay);
}
