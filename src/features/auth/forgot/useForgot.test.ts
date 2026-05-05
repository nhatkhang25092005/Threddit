import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import type { ChangeEvent } from "react";
import { useNotify } from "../../../hooks/useNotify";
import { mockUseNotify, type NotifyMock } from "../../../test/mockNotify";
import { forgotService } from "./forgot.service";
import { useForgot } from "./useForgot";

vi.mock("../../../hooks/useNotify", () => ({
  useNotify: vi.fn()
}))

vi.mock("./forgot.service", () => ({
  forgotService: vi.fn()
}))

const mockedUseNotify = vi.mocked(useNotify)
const mockedForgotService = vi.mocked(forgotService)

describe("useForgot", () => {
  let notifyMock: NotifyMock

  beforeEach(() => {
    vi.clearAllMocks()
    notifyMock = mockUseNotify(mockedUseNotify)
  })

  it("sets helperText when forgotService returns invalids", async () => {
    mockedForgotService.mockResolvedValueOnce({
      success: false,
      invalids: {
        email: "Email khong hop le"
      }
    })

    const onNavigate = vi.fn()
    const { result } = renderHook(() => useForgot(onNavigate))

    act(() => {
      const event = {
        target: {
          name: "email",
          value: "abe"
        }
      } as ChangeEvent<HTMLInputElement>
      result.current.onChange(event)
    })

    await act(async () => {
      await result.current.onSubmit()
    })

    expect(result.current.helperText).toBe("Email khong hop le")
    expect(notifyMock.popup).not.toHaveBeenCalled()
    expect(onNavigate).not.toHaveBeenCalled()
  })
})
