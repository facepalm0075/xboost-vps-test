"use client";

function GotoBtn({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <span
      onClick={() => {
        const gmtp = document.getElementById("gametop")!;
        console.log("yebem");
        const top = Math.floor(
          gmtp.getBoundingClientRect().top + document.documentElement.scrollTop
        );
        window.scrollTo({
          top: top - 95,
          left: 0,
          behavior: "smooth",
        });
      }}
    >
      {children}
    </span>
  );
}

export default GotoBtn;
