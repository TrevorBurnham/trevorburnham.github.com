// Add "More" controls
const scrollLinkTemplate = document.getElementById("scroll-link-template");
const namedAnchors = document.querySelectorAll("a[name]");
document
  .querySelectorAll("header, section:not(:last-of-type)")
  .forEach((section, i) => {
    const link = document.importNode(scrollLinkTemplate.content, true)
      .children[0];
    link.href = `#${namedAnchors[i].name}`;
    section.appendChild(link);
  });

// Smooth scrolling
const smoothScrollDelta = 0.9;
document.querySelectorAll('[href*="#"]').forEach(link => {
  link.addEventListener("click", evt => {
    evt.preventDefault();

    const moveCloser = () => {
      const currentPos = document.documentElement.scrollTop;
      const targetPos = document.querySelector(
        `[name=${link.getAttribute("href").slice(1)}]`
      ).offsetTop;
      if (Math.abs(targetPos - currentPos) < 3) {
        document.documentElement.scrollTop = targetPos;
        history.replaceState(null, null, " ");
      } else {
        document.documentElement.scrollTop = Math.ceil(
          smoothScrollDelta * currentPos + (1 - smoothScrollDelta) * targetPos
        );
        requestAnimationFrame(moveCloser);
      }
    };
    moveCloser();
  });
});

// Fade on scroll
let fadeOnScrollElements = document.querySelectorAll(".fade-on-scroll");
const handleScroll = () => {
  requestAnimationFrame(() => {
    fadeOnScrollElements.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight / 2) {
        el.classList.add("fade-out");
        el.addEventListener("transitionend", () => {
          el.classList.add("hidden");
        });
      }
    });
    fadeOnScrollElements = document.querySelectorAll(
      ".fade-on-scroll:not(.fade-out)"
    );
  });
};
document.addEventListener("scroll", handleScroll, { passive: true });

// Hide focus outlines when in mouse mode
document.addEventListener("mousedown", () => {
  document.body.classList.add("mouse-mode");
});
document.addEventListener("keydown", () => {
  document.body.classList.remove("mouse-mode");
});
