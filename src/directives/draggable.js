export default {
  mounted(el, binding) {
    initDraggable(el, binding.value);
  },
  updated(el, binding) {
    el._draggableCleanup?.();
    initDraggable(el, binding.value);
  },
  unmounted(el) {
    el._draggableCleanup?.();
  },
};

function initDraggable(el, options) {
  if (options === false) return;

  const container =
    typeof options?.container === "string"
      ? document.querySelector(options.container)
      : el.closest("section") || document.body;

  // выставляем стартовые координаты, если переданы
  if (options?.left != null) el.style.left = options.left + "px";
  if (options?.top != null) el.style.top = options.top + "px";
  el.style.position = "absolute";

  let dragging = false;
  let startX, startY, origX, origY;

  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }

  function onPointerDown(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    const interactiveTags = ["A", "BUTTON", "INPUT", "TEXTAREA", "VIDEO"];
    if (interactiveTags.includes(e.target.tagName)) return;

    dragging = true;
    el.classList.add("dragging");

    startX = e.clientX;
    startY = e.clientY;

    origX = parseFloat(el.style.left || 0);
    origY = parseFloat(el.style.top || 0);

    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!dragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    const newLeft = origX + dx;
    const newTop = origY + dy;

    const contRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const minX = 0;
    const minY = 0;
    const maxX = contRect.width - elRect.width;
    const maxY = contRect.height - elRect.height;

    el.style.left = clamp(newLeft, minX, maxX) + "px";
    el.style.top = clamp(newTop, minY, maxY) + "px";

    e.preventDefault();
  }

  function onPointerUp() {
    dragging = false;
    el.classList.remove("dragging");
  }

  el.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove, { passive: false });
  window.addEventListener("pointerup", onPointerUp);

  el._draggableCleanup = () => {
    el.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  };
}