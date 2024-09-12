import { Suspense } from "react";
import BlogCarusel from "./BlogCarusel";
import "./styles.css";
import Image from "next/image";

function page() {
  return (
    <>
      <div>
        <div className="elipse2-b"></div>
        <div className="elipse1-b"></div>
      </div>
      <div className="blog-hero">
        <div className="blog-hero-title">
          <h1>Gaming Blog & News</h1>
          <p>
            At all times, our dedicated customer support team is ready to assist
            you. Feel free to ask us anything; we`re here to help
          </p>
        </div>
        <Image
          alt="test"
          src="/blog/blog-img2.png"
          width={600}
          height={200}
          className="float-left w-2/5"
        />
        <Image
          alt="test"
          src="/blog/blog-img1.png"
          width={800}
          height={200}
          className="float-right w-2/4 mt-32"
        />
        <div className="clear-both"></div>
      </div>

      <div className="blog-containers">
        <h2 className="text-left mb-6 mt-12">Featured Posts</h2>
        <Suspense>
          <BlogCarusel />
        </Suspense>
      </div>

      <div className="blog-containers">
        <h2 className="text-left mb-6 mt-32">Featured Posts</h2>
        <div className="flex">
          <div className="w-3/4">
            <div className="flex blog-post-item">
              <div className="bpi-image-c">
                <div className="bpi-image-o"></div>
                <Image
                  alt="test"
                  src="/blog/Image-Placeholder.png"
                  width={300}
                  height={300}
                  className="bpi-image h-fit"
                />
              </div>
              <div className="px-10 max-w-2xl">
                <div className="bci-author flex items-center">
                  <Image
                    alt="test"
                    src="/blog/blog-img1.png"
                    width={50}
                    height={50}
                    className=""
                  />
                  <div className="ml-2">
                    <h4>sid qolimorad</h4>
                    <span>May 1st, 2024</span>
                  </div>
                </div>
                <div className="bpi-span my-5">
                  <span>valorant</span>
                  <span>valorant</span>
                  <span>valorant</span>
                </div>
                <div className="bci-content">
                  <h3>Seaside Serenity Villa</h3>
                  <p className="bpi-p">
                    Wake up to the soothing melody of waves. This beachfront
                    villa offers Wake up to the soothing melody of waves. This
                    beachfront villa offers Wake up to the soothing melody of
                    waves. This beachfront villa offers Wake up to the soothing
                    melody of waves. This beachfront villa offers Wake up to the
                    soothing melody of waves. This beachfront villa offers...
                  </p>
                </div>
                <hr style={{ borderColor: "#404040" }} className="mt-6 mb-4" />
                <span className="rtp-btn">Read The Post</span>
              </div>
            </div>
            <div className="flex blog-post-item">
              <div className="bpi-image-c">
              <div className="bpi-image-o"></div>
                <Image
                  alt="test"
                  src="/blog/blog-img2.png"
                  width={300}
                  height={300}
                  className="bpi-image h-fit"
                />
              </div>
              <div className="px-10 max-w-2xl">
                <div className="bci-author flex items-center">
                  <Image
                    alt="test"
                    src="/blog/blog-img1.png"
                    width={50}
                    height={50}
                    className=""
                  />
                  <div className="ml-2">
                    <h4>sid qolimorad</h4>
                    <span>May 1st, 2024</span>
                  </div>
                </div>
                <div className="bpi-span my-5">
                  <span>valorant</span>
                  <span>valorant</span>
                  <span>valorant</span>
                </div>
                <div className="bci-content">
                  <h3>Seaside Serenity Villa</h3>
                  <p className="bpi-p">
                    Wake up to the soothing melody of waves. This beachfront
                    villa offers Wake up to the soothing melody of waves. This
                    beachfront villa offers Wake up to the soothing melody of
                    waves. This beachfront villa offers Wake up to the soothing
                    melody of waves. This beachfront villa offers Wake up to the
                    soothing melody of waves. This beachfront villa offers...
                  </p>
                </div>
                <hr style={{ borderColor: "#404040" }} className="mt-6 mb-4" />
                <span className="rtp-btn">Read The Post</span>
              </div>
            </div>
            <div className="flex blog-post-item">
              <div className="bpi-image-c">
              <div className="bpi-image-o"></div>
                <Image
                  alt="test"
                  src="/blog/blog-img1.png"
                  width={300}
                  height={300}
                  className="bpi-image h-fit"
                />
              </div>
              <div className="px-10 max-w-2xl">
                <div className="bci-author flex items-center">
                  <Image
                    alt="test"
                    src="/blog/blog-img1.png"
                    width={50}
                    height={50}
                    className=""
                  />
                  <div className="ml-2">
                    <h4>sid qolimorad</h4>
                    <span>May 1st, 2024</span>
                  </div>
                </div>
                <div className="bpi-span my-5">
                  <span>valorant</span>
                  <span>valorant</span>
                  <span>valorant</span>
                </div>
                <div className="bci-content">
                  <h3>Seaside Serenity Villa</h3>
                  <p className="bpi-p">
                    Wake up to the soothing melody of waves. This beachfront
                    villa offers Wake up to the soothing melody of waves. This
                    beachfront villa offers Wake up to the soothing melody of
                    waves. This beachfront villa offers Wake up to the soothing
                    melody of waves. This beachfront villa offers Wake up to the
                    soothing melody of waves. This beachfront villa offers...
                  </p>
                </div>
                <hr style={{ borderColor: "#404040" }} className="mt-6 mb-4" />
                <span className="rtp-btn">Read The Post</span>
              </div>
            </div>
          </div>
          <div className="w-1/4">
            <div>sidebar</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
