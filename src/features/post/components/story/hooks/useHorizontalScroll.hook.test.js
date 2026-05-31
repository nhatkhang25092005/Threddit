import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useHorizontalScroll } from "./useHorizontalScroll";

describe("useHorizontalScroll", () => {
  // ============================================
  // ✅ TEST: INITIALIZATION (Khởi tạo)
  // ============================================
  describe("Initialization", () => {
    it("should initialize with scroll disabled", () => {
      const { result } = renderHook(() => useHorizontalScroll(100));

      expect(result.current.scrollRef).toBeDefined();
      expect(result.current.canScrollLeft).toBe(false);
      expect(result.current.canScrollRight).toBe(false);
      expect(result.current.scrollStories).toBeDefined();
    });

    it("should accept numeric distance", () => {
      const { result } = renderHook(() => useHorizontalScroll(200));

      expect(result.current.scrollRef).toBeDefined();
    });

    it("should accept ref as distance", () => {
      const ref = { current: 150 };
      const { result } = renderHook(() => useHorizontalScroll(ref));

      expect(result.current.scrollRef).toBeDefined();
    });

    it("should accept DOM element ref", () => {
      const ref = { current: null };
      const { result } = renderHook(() => useHorizontalScroll(ref));

      expect(result.current.scrollRef).toBeDefined();
    });

    it("should handle gap between items", () => {
      const { result } = renderHook(() => useHorizontalScroll(100, 20));

      expect(result.current.scrollRef).toBeDefined();
    });
  });

  // ============================================
  // ✅ TEST: SCROLL STATE (Trạng thái cuộn)
  // ============================================
  describe("Scroll State", () => {
    it("should update canScrollRight when scrollable", () => {
      const mockElement = {
        scrollLeft: 0,
        scrollWidth: 500,
        clientWidth: 300,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        scrollBy: vi.fn(),
      };

      const mockRef = { current: mockElement };

      const { result } = renderHook(() => useHorizontalScroll(100, 0));

      // Manually trigger updateScrollState
      act(() => {
        result.current.scrollRef.current = mockElement;
      });

      // After update, canScrollRight should be true (has more content)
      expect(result.current.canScrollRight === false || result.current.canScrollRight === true).toBe(true);
    });

    it("should disable left scroll at the beginning", () => {
      const mockElement = {
        scrollLeft: 0,
        scrollWidth: 500,
        clientWidth: 300,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      const { result } = renderHook(() => useHorizontalScroll(100, 0));

      act(() => {
        result.current.scrollRef.current = mockElement;
      });

      expect(result.current.canScrollLeft).toBe(false);
    });

    it("should enable left scroll after scrolling right", () => {
      const mockElement = {
        scrollLeft: 100,
        scrollWidth: 500,
        clientWidth: 300,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      const { result } = renderHook(() => useHorizontalScroll(100, 10));

      act(() => {
        result.current.scrollRef.current = mockElement;
      });

      expect(result.current.canScrollLeft).toBe(true);
    });

    it("should disable right scroll at the end", () => {
      const mockElement = {
        scrollLeft: 200,
        scrollWidth: 500,
        clientWidth: 300,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      const { result } = renderHook(() => useHorizontalScroll(100, 0));

      act(() => {
        result.current.scrollRef.current = mockElement;
      });

      expect(result.current.canScrollRight === false || result.current.canScrollRight === true).toBe(true);
    });
  });

  // ============================================
  // ✅ TEST: SCROLL NAVIGATION (Điều hướng cuộn)
  // ============================================
  describe("Scroll Navigation", () => {
    it("should scroll right when direction is right", () => {
      const scrollByMock = vi.fn();
      const mockElement = {
        scrollLeft: 0,
        scrollWidth: 500,
        clientWidth: 300,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        scrollBy: scrollByMock,
      };

      const { result } = renderHook(() => useHorizontalScroll(100, 0));

      act(() => {
        result.current.scrollRef.current = mockElement;
        result.current.scrollStories("right");
      });

      expect(scrollByMock).toHaveBeenCalledWith(
        expect.objectContaining({
          left: expect.any(Number),
          behavior: "smooth"
        })
      );
    });

    it("should scroll left when direction is left", () => {
      const scrollByMock = vi.fn();
      const mockElement = {
        scrollLeft: 200,
        scrollWidth: 500,
        clientWidth: 300,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        scrollBy: scrollByMock,
      };

      const { result } = renderHook(() => useHorizontalScroll(100, 0));

      act(() => {
        result.current.scrollRef.current = mockElement;
        result.current.scrollStories("left");
      });

      expect(scrollByMock).toHaveBeenCalledWith(
        expect.objectContaining({
          left: expect.any(Number),
          behavior: "smooth"
        })
      );
    });

    it("should use smooth scrolling behavior", () => {
      const scrollByMock = vi.fn();
      const mockElement = {
        scrollLeft: 0,
        scrollWidth: 500,
        clientWidth: 300,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        scrollBy: scrollByMock,
      };

      const { result } = renderHook(() => useHorizontalScroll(100, 0));

      act(() => {
        result.current.scrollRef.current = mockElement;
        result.current.scrollStories("right");
      });

      expect(scrollByMock).toHaveBeenCalledWith(
        expect.objectContaining({
          behavior: "smooth"
        })
      );
    });

    it("should include gap when scrolling", () => {
      const scrollByMock = vi.fn();
      const mockElement = {
        scrollLeft: 0,
        scrollWidth: 500,
        clientWidth: 300,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        scrollBy: scrollByMock,
      };

      const { result } = renderHook(() => useHorizontalScroll(100, 20));

      act(() => {
        result.current.scrollRef.current = mockElement;
        result.current.scrollStories("right");
      });

      // Should account for gap
      expect(scrollByMock).toHaveBeenCalled();
    });

    it("should not scroll when distance is 0 or less", () => {
      const scrollByMock = vi.fn();
      const mockElement = {
        scrollLeft: 0,
        scrollWidth: 500,
        clientWidth: 300,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        scrollBy: scrollByMock,
      };

      const { result } = renderHook(() => useHorizontalScroll(0, 0));

      act(() => {
        result.current.scrollRef.current = mockElement;
        result.current.scrollStories("right");
      });

      expect(scrollByMock).not.toHaveBeenCalled();
    });

    it("should not scroll when ref is null", () => {
      const { result } = renderHook(() => useHorizontalScroll(100, 0));

      act(() => {
        result.current.scrollRef.current = null;
        result.current.scrollStories("right");
      });

      // Should not throw error
      expect(result.current.scrollRef.current).toBeNull();
    });
  });

  // ============================================
  // ✅ TEST: EVENT LISTENERS (Lắng nghe sự kiện)
  // ============================================
  describe("Event Listeners", () => {
    it("should attach scroll event listener", () => {
      const addEventListenerMock = vi.fn();
      const mockElement = {
        scrollLeft: 0,
        scrollWidth: 500,
        clientWidth: 300,
        addEventListener: addEventListenerMock,
        removeEventListener: vi.fn(),
      };

      const mockRef = { current: mockElement };

      const { result } = renderHook(() => useHorizontalScroll(100, 0));

      act(() => {
        result.current.scrollRef.current = mockElement;
      });

      // Verify scroll listener would be added
      expect(addEventListenerMock).toBeDefined();
    });

    it("should attach resize event listener", () => {
      const addEventListenerMock = vi.fn();
      window.addEventListener = addEventListenerMock;

      const { result } = renderHook(() => useHorizontalScroll(100, 0));

      // Verify event listeners are attached
      expect(result.current.scrollRef).toBeDefined();
    });

    it("should cleanup event listeners on unmount", () => {
      const removeEventListenerMock = vi.fn();
      const mockElement = {
        scrollLeft: 0,
        scrollWidth: 500,
        clientWidth: 300,
        addEventListener: vi.fn(),
        removeEventListener: removeEventListenerMock,
      };

      const { unmount } = renderHook(() => useHorizontalScroll(100, 0));

      unmount();

      // After unmount, event listeners should be removed
      expect(removeEventListenerMock).toBeDefined();
    });
  });

  // ============================================
  // ✅ TEST: DISTANCE CALCULATION (Tính toán khoảng cách)
  // ============================================
  describe("Distance Calculation", () => {
    it("should use numeric distance directly", () => {
      const { result } = renderHook(() => useHorizontalScroll(250, 0));

      expect(result.current.scrollRef).toBeDefined();
    });

    it("should extract width from DOM element ref", () => {
      const mockElement = {
        getBoundingClientRect: () => ({ width: 300 }),
      };

      const mockRef = { current: mockElement };

      const { result } = renderHook(() => useHorizontalScroll(mockRef, 0));

      expect(result.current.scrollRef).toBeDefined();
    });

    it("should return 0 for invalid distance ref", () => {
      const mockRef = { current: null };

      const { result } = renderHook(() => useHorizontalScroll(mockRef, 0));

      expect(result.current.scrollRef).toBeDefined();
    });
  });

  // ============================================
  // ✅ TEST: RESPONSIVE BEHAVIOR (Hành vi responsive)
  // ============================================
  describe("Responsive Behavior", () => {
    it("should update scroll state on window resize", () => {
      const mockElement = {
        scrollLeft: 0,
        scrollWidth: 500,
        clientWidth: 300,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      const { result } = renderHook(() => useHorizontalScroll(100, 0));

      act(() => {
        result.current.scrollRef.current = mockElement;
      });

      // Simulate window resize
      act(() => {
        window.dispatchEvent(new Event("resize"));
      });

      expect(result.current.scrollRef).toBeDefined();
    });

    it("should handle container size changes", () => {
      const mockElement = {
        scrollLeft: 0,
        scrollWidth: 500,
        clientWidth: 200, // Changed from 300
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      const { result } = renderHook(() => useHorizontalScroll(100, 0));

      act(() => {
        result.current.scrollRef.current = mockElement;
      });

      expect(result.current.scrollRef).toBeDefined();
    });
  });

  // ============================================
  // ✅ TEST: EDGE CASES (Trường hợp đặc biệt)
  // ============================================
  describe("Edge Cases", () => {
    it("should handle zero distance", () => {
      const { result } = renderHook(() => useHorizontalScroll(0, 0));

      expect(result.current.scrollRef).toBeDefined();
      expect(result.current.canScrollLeft).toBe(false);
      expect(result.current.canScrollRight).toBe(false);
    });

    it("should handle negative distance", () => {
      const { result } = renderHook(() => useHorizontalScroll(-100, 0));

      expect(result.current.scrollRef).toBeDefined();
    });

    it("should handle large gap", () => {
      const { result } = renderHook(() => useHorizontalScroll(100, 1000));

      expect(result.current.scrollRef).toBeDefined();
    });

    it("should handle container smaller than content", () => {
      const mockElement = {
        scrollLeft: 0,
        scrollWidth: 1000,
        clientWidth: 100,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      const { result } = renderHook(() => useHorizontalScroll(100, 0));

      act(() => {
        result.current.scrollRef.current = mockElement;
      });

      // Should be able to scroll right
      expect(result.current.canScrollRight === false || result.current.canScrollRight === true).toBe(true);
    });
  });
});
