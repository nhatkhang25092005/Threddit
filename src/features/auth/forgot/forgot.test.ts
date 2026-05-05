import { beforeEach, describe, expect, it, vi } from "vitest";
import { forgotService } from "./forgot.service"
import { authApi } from "../../../api/auth/auth.api";
import { AxiosHeaders} from 'axios'

vi.mock('../../../api/auth/auth.api', () => ({
  authApi:{
    forgot:vi.fn()
  }
}))

const mockedForgot = vi.mocked(authApi.forgot)

/**
 * invalid email
 * success
 * request error
 */
describe('forgotService', () => {
  beforeEach(()=> vi.clearAllMocks())

  const validEmail = 'nhatkhang@gmail.com'
  const invalidEmail = '123456'

  async function handleInvalidsTest(){
    const result = await forgotService(invalidEmail)

    expect(mockedForgot).not.toHaveBeenCalled()
    expect(result.success).toBe(false)

    if(!('invalids' in result)){
      throw new Error('expected validation result with invalids')
    }

    expect(result.invalids.email).toBeTruthy()
  }

  async function handleSuccessTest(){
    const responseData = { email: validEmail }

    mockedForgot.mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
      config: { headers: new AxiosHeaders(), method: 'post' },
      headers: {},
      data: { message: 'ok', data: responseData }
    })

    const result = await forgotService(validEmail)

    expect(mockedForgot).toHaveBeenCalledOnce()
    expect(mockedForgot).toHaveBeenCalledWith({ email: validEmail })
    expect(result.success).toBe(true)

    if(!result.success){
      throw new Error('expected success result')
    }

    expect(result.message).toBe('ok')
    expect(result.data).toEqual(responseData)
  }

  async function handleRequestErrorTest(){
    mockedForgot.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Email not found'
        }
      }
    })

    const result = await forgotService(validEmail)

    expect(mockedForgot).toHaveBeenCalledOnce()
    expect(mockedForgot).toHaveBeenCalledWith({ email: validEmail })
    expect(result.success).toBe(false)

    if(result.success || 'invalids' in result){
      throw new Error('expected request error result')
    }

    expect(result.message).toBe('Email not found')
  }

  it('should return validation_error when email is invalid',handleInvalidsTest)
  it('should return success when api calling is success',handleSuccessTest)
  it('should return request_error when api calling is failed',handleRequestErrorTest)

})
