"use client";
import { useEffect, useState, useReducer, useRef, Suspense } from "react";
import Script from "next/script";

type props = {
	src: string | undefined;
};

function BgFix({ src }: props) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [, forceUpdate] = useReducer((x) => x + 1, 0);
	const [data, setData] = useState("");
	useEffect(() => {
		forceUpdate();

		function domReady(cb: Function): void {
			if (document.readyState === "complete" || document.readyState === "interactive") {
				cb();
			} else {
				document.addEventListener("DOMContentLoaded", (event: Event) => {
					cb();
				});
			}
		}
		domReady(() => {
			setTimeout(() => {
				var canvas = canvasRef.current!;
				var ctx = canvas.getContext("2d")!;
				var video = videoRef.current!;

				function lol2() {
					canvas.width = video.videoWidth;
					canvas.height = video.videoHeight;
				}

				lol2();

				video.addEventListener("play", function () {
					var $this = this; //cache
					(function loop() {
						if (!$this.paused && !$this.ended) {
							ctx.drawImage($this, 0, 0);
							setTimeout(loop, 1000 / 30); // drawing at 30fps
						}
					})();
				});

				video.play();
			}, 100);
		});
	}, []);
	return (
		<>
			<div className="fixer">
				<div className="vid-container">
					<div className="on-vid"></div>
					<Suspense fallback={<p>Loading video...</p>}>
						<video hidden ref={videoRef} controls playsInline loop muted>
							<source src={`/bgVid/${src}`} type="video/mp4" />
						</video>
					</Suspense>

					<canvas ref={canvasRef} width={1600} height={600} id="canvas"></canvas>
				</div>
			</div>
		</>
	);
}

export default BgFix;
