// import { vi } from "vitest";
// import type { NotifyApi } from "@/provider/notify/NotifyProvider";

// type UseNotifyMock = {
//   mockReturnValue: (value: NotifyApi) => unknown
// }

// export function createNotifyMock() {
//   const snackbar = vi.fn<NotifyApi["snackbar"]>()
//   const popup = vi.fn<NotifyApi["popup"]>()
//   const loading = vi.fn<NotifyApi["loading"]>()
//   const customModal = vi.fn<NotifyApi["customModal"]>()
//   const snackbarLoading = vi.fn<NotifyApi["snackbarLoading"]>()

//   const notify: NotifyApi = {
//     snackbar,
//     popup,
//     loading,
//     withLoading: async <T,>(
//       task: () => Promise<T>,
//       plugin: Parameters<NotifyApi["withLoading"]>[1] = loading,
//     ): Promise<T> => {
//       plugin(true)
//       try {
//         return await task()
//       } finally {
//          plugin(false)
//       }
//     },
//     customModal,
//     snackbarLoading,
//   }
//   const withLoading = vi.spyOn(notify, "withLoading")

//   return {
//     notify,
//     snackbar,
//     popup,
//     loading,
//     withLoading,
//     customModal,
//     snackbarLoading,
//   }
// }

// export type NotifyMock = ReturnType<typeof createNotifyMock>

// export function mockUseNotify(mockedUseNotify: UseNotifyMock) {
//   const notifyMock = createNotifyMock()
//   mockedUseNotify.mockReturnValue(notifyMock.notify)
//   return notifyMock
// }


// return the mock of the useNotify
import {vi} from 'vitest'
import type { NotifyApi } from '@/provider/notify/NotifyProvider'

function createMockNotify() {
  // creating mocked functions
  const popup = vi.fn<NotifyApi['popup']>()
  const snackbar = vi.fn<NotifyApi['snackbar']>()
  const loading = vi.fn<NotifyApi['loading']>()
  const customModal = vi.fn<NotifyApi['customModal']>()
  const snackbarLoading = vi.fn<NotifyApi['snackbarLoading']>()
  const notify: NotifyApi = {
    popup,
    snackbar,
    loading,
    withLoading:async <T>(
      task: () => Promise<T>,
      plugin: Parameters<NotifyApi['withLoading']>[1] = loading
    ): Promise<T> => {
      plugin(true)
      try{ return await task() }
      finally{ plugin(false) }
    },
    customModal,
    snackbarLoading
  }

  const withLoading = vi.spyOn(notify, 'withLoading')
  return {
    notify,
    popup,
    snackbar,
    loading,
    withLoading,
    customModal,
    snackbarLoading
  }
}

type UseNotifyMock = {
  mockReturnValue: (value: NotifyApi) => unknown
}

export type NotifyMock = ReturnType<typeof createMockNotify>

export function mockUseNotify(viMockedUseNotify:UseNotifyMock){
  const mockNotify = createMockNotify()
  viMockedUseNotify.mockReturnValue(mockNotify.notify)
  return mockNotify
}