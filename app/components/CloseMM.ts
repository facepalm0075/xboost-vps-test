"use client";

export const CloseMM = () => {
  const body = document.getElementById("body")!;
  body.setAttribute("style", "overflow-y: auto;");
  const item = document.getElementById("mmc")!;
  const item2 = document.getElementById("mmcc")!;
  item.classList.remove("mmc-active");
  item.classList.add("mmc-deactive");
  item2.classList.remove("mmcc-active");
  item2.classList.add("mmcc-deactive");
};
