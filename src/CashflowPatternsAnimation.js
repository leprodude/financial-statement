import anime from "animejs/lib/anime.js";

export const revealElements = () => {
  let tl = anime.timeline({
    easing: "easeOutExpo",
    duration: 2000,
    delay: anime.stagger(200),
  });

  let boxes = Array.from(document.querySelectorAll(".box")).reverse();
  let texts = Array.from(document.querySelectorAll(".box-text")).reverse();
  let buttons = Array.from(document.querySelectorAll("#CashflowPatterns .button"));

  tl.add({
    targets: buttons,
    opacity: 1,
    duration: 2000,
    delay: anime.stagger(200),
    translateY: ["-5px", "0"],
  });
  tl.add(
    {
      targets: boxes,
      opacity: 1,
      translateY: ["-10px", "0"],
    },
    "-=2000"
  );
  tl.add(
    {
      targets: texts,
      opacity: 1,
      duration: 6000,
      delay: anime.stagger(200),
      translateY: ["-5px", "0"],
    },
    "-=2300"
  );
  tl.play();
};

export const animateJobPattern = () => {
  let myPath = document.getElementById("arrow-job-path");

  let job = anime.timeline({
    easing: "linear",
    duration: 500,
    loop: false,
    autoplay: false,
  });
  job.add({
    targets: myPath,
    strokeDashoffset: [1890, 630],
    duration: 1000,
  });
  job.play();
};

export const animateMiddleClassPattern = () => {
  let myPath = document.getElementById("arrow-middle-class-path");

  let middleClass = anime({
    targets: myPath,
    // Safari doesn't like negative Dashoffset, so use 3x Dasharray as starting point
    strokeDashoffset: [3501, 1167], 
    easing: "linear",
    duration: 1700,
    loop: false,
    autoplay: false,
  });
  middleClass.play();
};

export const animateAssetPattern = () => {
  let myPath1 = document.getElementById("arrow-asset-1-path");
  let myPath2 = document.getElementById("arrow-asset-2-path");

  let asset = anime.timeline({
    easing: "cubicBezier(0.420, 0.000, 0.580, 1.000)",
    duration: 1000,
    autoplay: false,
  });
  asset.add({
    targets: myPath1,
    strokeDashoffset: [1725, 575],
  });
  asset.add(
    {
      targets: myPath2,
      strokeDashoffset: [1725, 575],
    },
    "-=400"
  );
  asset.play();
};
