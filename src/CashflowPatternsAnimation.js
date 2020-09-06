import anime from "animejs/lib/anime.js";

export const revealElements = () => {
  let tl = anime.timeline({
    easing: "easeOutExpo",
    duration: 1000,
    delay: anime.stagger(200),
  });

  let boxes = Array.from(document.querySelectorAll(".box")).reverse();
  let texts = Array.from(document.querySelectorAll(".box-text")).reverse();
  let buttons = Array.from(
    document.querySelectorAll("#CashflowPatterns .button")
  );

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
    "-=2400"
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

const EASINGS = Object.freeze({
  LINEAR: "linear",
  BEZIER_1: "cubicBezier(0.420, 0.000, 0.580, 1.000)",
});

export const animateJobPattern = () => {

  let job = anime.timeline({
    easing: "linear",
    duration: 500,
    loop: false,
    autoplay: false,
  });
  // main cashflow arrow animation
  job.add(
    {
      targets: "#arrow-job-path",
      strokeDashoffset: [1890, 630],
      duration: 3000,
    },
    "-=0"
  );
  // income item job
  job.add(
    {
      targets: "#income-item-job",
      keyframes: [
        { opacity: 0, translateY: 0, duration: 1 },
        { opacity: 1, duration: 400 },
        { opacity: 1, duration: 800 },
        { opacity: 1, translateY: -1, duration: 100 },
        { opacity: 0, translateY: 5, duration: 400 },
      ],
    },
    "-=2700"
  );
  // expense items
  let expenses = Array.from(
    document.querySelectorAll(
      "#expense-item-bills, #expense-item-consumption, #expense-item-vacation"
    )
  );
  job.add(
    {
      targets: expenses,
      keyframes: [
        { opacity: 0, translateY: 0, duration: 1 },
        { opacity: 1, duration: 400 },
      ],
      delay: anime.stagger(100),
    },
    "-=2100"
  );
  job.add(
    {
      targets: expenses.reverse(),
      keyframes: [
        { opacity: 1, duration: 200 },
        { opacity: 1, translateY: 0, duration: 100 },
        { opacity: 0, translateY: 5, duration: 200 },
      ],
      delay: anime.stagger(100),
    },
    "-=700"
  );
  job.play();
};

export const animateMiddleClassPattern = () => {
  let middleClass = anime.timeline({
    easing: "linear",
    duration: 1700,
    loop: false,
    autoplay: false,
  });
  // main cashflow arrow animation
  middleClass.add({
    targets: "#arrow-middle-class-path",
    // Safari doesn't like negative Dashoffset, so use 3x Dasharray as starting point
    strokeDashoffset: [3501, 1167],
    duration: 5000,
  });
  // income item job
  middleClass.add(
    {
      targets: "#income-item-job",
      keyframes: [
        { opacity: 0, translateY: 0, duration: 1 },
        { opacity: 1, duration: 400 },
        { opacity: 1, duration: 800 },
        { opacity: 1, translateY: -1, duration: 100 },
        { opacity: 0, translateY: 5, duration: 400 },
      ],
    },
    300
  );
  // liability items
  let liabilities = Array.from(
    document.querySelectorAll(
      "#liability-item-mortgage, #liability-item-big-toys, #liability-item-credit-card, #liability-item-debt"
    )
  );
  middleClass.add(
    {
      targets: liabilities,
      keyframes: [
        { opacity: 0, translateY: 0, duration: 1 },
        { opacity: 1, duration: 400 },
      ],
      delay: anime.stagger(100),
    },
    1200
  );
  middleClass.add(
    {
      targets: liabilities.reverse(),
      keyframes: [
        { opacity: 1, duration: 200 },
        { opacity: 1, translateY: 0, duration: 100 },
        { opacity: 0, translateY: 5, duration: 200 },
      ],
      delay: anime.stagger(100),
    },
    "-=1000"
  );
  // expenses items
  let expenses = Array.from(
    document.querySelectorAll("#expense-item-payments")
  );
  middleClass.add(
    {
      targets: expenses,
      keyframes: [
        { opacity: 0, translateY: 0, duration: 1 },
        { opacity: 1, duration: 400 },
      ],
      delay: anime.stagger(400),
    },
    2200
  );
  middleClass.add(
    {
      targets: expenses,
      keyframes: [
        { opacity: 1, duration: 200 },
        { opacity: 1, translateY: 0, duration: 100 },
        { opacity: 0, translateY: 5, duration: 200 },
      ],
      delay: anime.stagger(100),
    },
    "-=400"
  );

  middleClass.play();
};

export const animateAssetPattern = () => {
  let rich = anime.timeline({
    easing: EASINGS.BEZIER_1,
    duration: 1500,
    autoplay: false,
  });
  // main cashflow arrow animation
  rich.add(
    {
      targets: "#arrow-asset-2-path",
      strokeDashoffset: [456 * 3, 456],
    }
  );
  // income items
  let incomes = Array.from(
    document.querySelectorAll(
      "#income-item-business, #income-item-rental, #income-item-dividends, #income-item-royalties"
    )
  );
  rich.add(
    {
      easing: "linear",
      targets: incomes,
      keyframes: [
        { opacity: 0, translateY: 0, duration: 1 },
        { opacity: 1, duration: 400 },
      ],
      delay: anime.stagger(100),
    },
    "-=700"
  );
  rich.add(
    {
      targets: incomes,
      keyframes: [
        { opacity: 1, duration: 200 },
        { opacity: 1, translateY: 0, duration: 100 },
        { opacity: 0, translateY: 5, duration: 200 },
      ],
      delay: anime.stagger(100),
    },
    "+=500"
  );
  // main cashflow arrow animation
  rich.add(
    {
      targets: "#arrow-asset-1-path",
      strokeDashoffset: [460 * 3, 460],
    },
    "-=500"
  );
  // asset items
  let assets = Array.from(
    document.querySelectorAll(
      "#asset-item-business, #asset-item-real-estate, #asset-item-intellectual-property"
    )
  );
  rich.add(
    {
      easing: "linear",
      targets: assets,
      keyframes: [
        { opacity: 0, translateY: 0, duration: 1 },
        { opacity: 1, duration: 400 },
      ],
      delay: anime.stagger(100),
    },
    "-=900"
  );

  // remove asset items
  rich.add(
    {
      targets: assets.reverse(),
      keyframes: [
        { opacity: 1, duration: 200 },
        { opacity: 1, translateY: 0, duration: 100 },
        { opacity: 0, translateY: 5, duration: 200 },
      ],
      delay: anime.stagger(100),
    },
    "+=500"
  );
  // main cashflow arrow animation
  // rich.add(
  //   {
  //     targets: "#arrow-asset-2-path",
  //     strokeDashoffset: [456 * 3, 456],
  //   }
  //   , "-=600"
  // );

  // let a = document.getElementById("arrow-asset-2-path");
  // console.log(a.getTotalLength());

  rich.play();
};
