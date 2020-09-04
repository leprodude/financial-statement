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
    strokeDashoffset: -630,
    duration: 1000,
    complete: function (anim) {
      myPath.style.strokeDashoffset = 630;
    },
  });
  job.play();
};

export const animateMiddleClassPattern = () => {
  let myPath = document.getElementById("arrow-middle-class-path");

  let middleClass = anime({
    targets: myPath,
    keyframes: [{ strokeDashoffset: 0 }, { strokeDashoffset: -1167 }],
    easing: "linear",
    duration: 1700,
    loop: false,
    autoplay: false,
    complete: function (anim) {
      myPath.style.strokeDashoffset = 1167;
    },
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
    keyframes: [{ strokeDashoffset: 0 }, { strokeDashoffset: -575 }],
    complete: function (anim) {
      myPath1.style.strokeDashoffset = 575;
    },
  });
  asset.add(
    {
      targets: myPath2,
      keyframes: [{ strokeDashoffset: 0 }, { strokeDashoffset: -575 }],
      complete: function (anim) {
        myPath2.style.strokeDashoffset = 575;
      },
    },
    "-=600"
  );
  asset.play();
};
