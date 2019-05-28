// Add "More" controls
const scrollLinkTemplate = document.getElementById("scroll-link-template");
const namedAnchors = document.querySelectorAll("a[name]");
document.querySelectorAll("header, section.bio").forEach((section, i) => {
  const link = document.importNode(scrollLinkTemplate.content, true)
    .children[0];
  link.href = `#${namedAnchors[i].name}`;
  section.appendChild(link);
});

// Smooth scrolling
let smoothScrollFrame;
const smoothScrollDelta = 0.9;
document.querySelectorAll('[href*="#"]').forEach(link => {
  link.addEventListener("click", evt => {
    evt.preventDefault();

    const moveCloser = () => {
      const currentPos = document.scrollingElement.scrollTop;
      const targetPos = document.querySelector(
        `[name=${link.getAttribute("href").slice(1)}]`
      ).offsetTop;
      if (Math.abs(targetPos - currentPos) < 5) {
        document.scrollingElement.scrollTop = targetPos;
        history.replaceState(null, null, " ");
      } else {
        document.scrollingElement.scrollTop = Math.ceil(
          smoothScrollDelta * currentPos + (1 - smoothScrollDelta) * targetPos
        );
        smoothScrollFrame = requestAnimationFrame(moveCloser);
      }
    };
    moveCloser();
  });
});
document.addEventListener("mousewheel", () => {
  cancelAnimationFrame(smoothScrollFrame);
});

// Fade on scroll
const fadeOnScrollElements = document.querySelectorAll(".fade-on-scroll");
const addHiddenClass = evt => {
  evt.target.classList.add("hidden");
  evt.target.removeEventListener("transitionend", addHiddenClass);
};
const handleScroll = () => {
  requestAnimationFrame(() => {
    fadeOnScrollElements.forEach(el => {
      const pastFadeThreshold = el.getBoundingClientRect().top < 64;
      if (pastFadeThreshold && !el.classList.contains("fade-out")) {
        el.classList.add("fade-out");
        el.addEventListener("transitionend", addHiddenClass);
      } else if (!pastFadeThreshold && el.classList.contains("fade-out")) {
        el.classList.remove("hidden", "fade-out");
        el.removeEventListener("transitionend", addHiddenClass);
      }
    });
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
