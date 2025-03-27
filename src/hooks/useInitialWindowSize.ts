
export default function useInitialWindowSize({ margin }: { margin?: number }) {
  const m = margin || 0;

  const winW = window.innerWidth;
  const winH = window.innerHeight;

  const initWidth = winW - m;
  const initHeight = winH - m;

  return { initWidth, initHeight };
}
