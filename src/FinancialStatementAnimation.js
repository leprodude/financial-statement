import anime from "animejs/lib/anime.js";

export const revealElements = () => {
  let tl = anime.timeline({
    duration: 1000,
    easing: "linear",
    delay: anime.stagger(100),
  });

  let columns = Array.from(
    document.querySelectorAll(".FinancialStatementColumns>div")
  );

  tl.add({
    targets: columns,
    opacity: [0, 1],
    translateY: ["-2px", "0"],
  });
  
  tl.play();
};