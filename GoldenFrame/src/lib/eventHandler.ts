// @ts-ignore
import domToImage from "dom-to-image";
// @ts-ignore
import { saveAs } from "file-saver";

export function handleWidth(e: any) {
  document.getElementById("frame")!.style.width = e.target.value + "%";
}

export function handleHeight(e: any) {
  document.getElementById("frame")!.style.height = e.target.value + "%";
}

export function handleRotate(e: any) {
  document.getElementById(
    "frame"
  )!.style.transform = `rotate(${e.target.value}deg)`;
}

export function handleSkew(e: any) {
  document.getElementById(
    "frame"
  )!.style.transform = `skew(${e.target.value}deg)`;
}

export function downloadImage() {
  domToImage
    .toJpeg(document.getElementById("frameImg")!, {
      width: document.getElementById("frameImg")!.clientWidth * 2,
      height: document.getElementById("frameImg")!.clientHeight * 2,
      style: { transform: "scale(" + 2 + ")", transformOrigin: "top left" },
    })
    .then(function (dataURL: any) {
      let link = document.createElement("a");
      link.download = "long-live-the-king.jpeg";
      link.href = dataURL;
      link.click();
    });
}
