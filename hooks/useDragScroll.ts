import { useEffect, useRef, useState } from "react";

export default function useDragScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startScrollX, setScrollX] = useState(0);
  const [startPageX, setStartPageX] = useState(0);

  const ref = useRef({ isDrag, startScrollX, startPageX });
  useEffect(() => {
    ref.current = { isDrag, startScrollX, startPageX };
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleDragStart = (e: MouseEvent) => {
      e.preventDefault();
      setIsDrag(true);
      setScrollX(e.pageX + (scrollRef.current?.scrollLeft || 0));
      setStartPageX(e.pageX);
    };
    const handleDragMove = (e: MouseEvent) => {
      if (ref.current.isDrag && scrollRef.current) {
        scrollRef.current.scrollLeft = ref.current.startScrollX - e.pageX;
      }
    };
    const handleDragEnd = () => {
      setIsDrag(false);
    };
    const handleClickCapture = (e: MouseEvent) => {
      if (ref.current.startPageX !== e.pageX) {
        // PC에서 가로 스와이프 할때 클릭 방지
        e.stopPropagation();
      }
    };

    el.addEventListener("mousedown", handleDragStart);
    el.addEventListener("mousemove", handleDragMove);
    el.addEventListener("mouseup", handleDragEnd);
    el.addEventListener("mouseleave", handleDragEnd);
    el.addEventListener("click", handleClickCapture, CAPTURE);
    return () => {
      el.removeEventListener("mousedown", handleDragStart);
      el.removeEventListener("mousemove", handleDragMove);
      el.removeEventListener("mouseup", handleDragEnd);
      el.removeEventListener("mouseleave", handleDragEnd);
      el.removeEventListener("click", handleClickCapture, CAPTURE);
    };
  }, []);

  return scrollRef;
}

const CAPTURE = { capture: true };
