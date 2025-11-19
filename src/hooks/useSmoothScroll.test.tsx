import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSmoothScroll } from "./useSmoothScroll";

describe("useSmoothScroll Hook", () => {
  const originalScrollTo = window.scrollTo;
  const originalPageYOffset = window.pageYOffset;
  const originalRequestAnimationFrame = window.requestAnimationFrame;

  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();
    
    let frameCount = 0;
    window.requestAnimationFrame = vi.fn((callback) => {
      frameCount++;
      if (frameCount < 100) {
        callback(frameCount * 16);
      }
      return frameCount;
    });
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    window.requestAnimationFrame = originalRequestAnimationFrame;
    Object.defineProperty(window, "pageYOffset", {
      writable: true,
      configurable: true,
      value: originalPageYOffset,
    });
  });

  it("should return smoothScrollTo and scrollToSection functions", () => {
    const { result } = renderHook(() => useSmoothScroll());

    expect(result.current).toHaveProperty("smoothScrollTo");
    expect(result.current).toHaveProperty("scrollToSection");
    expect(typeof result.current.smoothScrollTo).toBe("function");
    expect(typeof result.current.scrollToSection).toBe("function");
  });

  it("should call window.scrollTo when smoothScrollTo is invoked", () => {
    Object.defineProperty(window, "pageYOffset", {
      writable: true,
      configurable: true,
      value: 0,
    });

    const { result } = renderHook(() => useSmoothScroll());

    act(() => {
      result.current.smoothScrollTo(500);
    });

    expect(window.scrollTo).toHaveBeenCalled();
  });

  it("should scroll to element when scrollToSection is called with valid id", () => {
    const mockElement = document.createElement("div");
    mockElement.id = "testSection";
    Object.defineProperty(mockElement, "offsetTop", {
      writable: true,
      configurable: true,
      value: 1000,
    });
    document.body.appendChild(mockElement);

    Object.defineProperty(window, "pageYOffset", {
      writable: true,
      configurable: true,
      value: 0,
    });

    const { result } = renderHook(() => useSmoothScroll());

    act(() => {
      result.current.scrollToSection("testSection");
    });

    expect(window.scrollTo).toHaveBeenCalled();

    document.body.removeChild(mockElement);
  });

  it("should not scroll when scrollToSection is called with invalid id", () => {
    const { result } = renderHook(() => useSmoothScroll());

    act(() => {
      result.current.scrollToSection("nonExistentSection");
    });

    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("should use requestAnimationFrame for smooth scrolling", () => {
    Object.defineProperty(window, "pageYOffset", {
      writable: true,
      configurable: true,
      value: 0,
    });

    const { result } = renderHook(() => useSmoothScroll());

    act(() => {
      result.current.smoothScrollTo(500);
    });

    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });
});
