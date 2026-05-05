import { beforeEach, describe, expect, it, vi } from "vitest"
import { verifyAccountService } from "./verifyAccount.service"
import { authApi } from '../../../api/auth/auth.api'
import { AxiosHeaders } from "axios"

vi.mock('../../../api/auth/auth.api', () => ({
  authApi: {
    verify_account: vi.fn(),
    resend_code: vi.fn()
  }
}))

const mockedVerifyAccount = vi.mocked(authApi.verify_account)

/**
 * invalid email
 * invalid otp
 * success
 * request error
 */
describe('verifyAccountService.submit',() => {
  beforeEach(()=>vi.clearAllMocks())

  it('should return validation error on email when submit',async () => {
    const result = await verifyAccountService.submit({
      email:'invalid_email',
      otp:'123456'
    })
    expect(result.kind).toBe('validation_error')
    if(result.kind !== 'validation_error'){
      throw new Error(`expected validation_error but got ${result.kind}`)
    }
    expect(mockedVerifyAccount).not.toHaveBeenCalled()
    expect(result.invalids.email).toBeTruthy()
    expect(result.is_success).toBe(false)
  })

  it('should return validation error on otp when submit', async () => {
    const result = await verifyAccountService.submit({
      email:'nhatkhang@gmail.com',
      otp:'abcde'
    })
    expect(result.kind).toBe('validation_error')
    if(result.kind !== 'validation_error'){
      throw new Error(`expected validation_error but got ${result.kind}`)
    }
    expect(mockedVerifyAccount).not.toHaveBeenCalled()
    expect(result.invalids.otp).toBeTruthy()
    expect(result.is_success).toBe(false)
  })

  it("should return success", async () => {
    mockedVerifyAccount.mockResolvedValueOnce({
      status:200,
      statusText:'OK',
      config:{headers:new AxiosHeaders(), method:'post'},
      headers:{},
      data:{message:'ok', data:null}
    })
    const result = await verifyAccountService.submit({
      email:'nhatkhang@gmail.com',
      otp:'123456'
    })

    expect(result.kind).toBe('success')
    if(result.kind !== 'success'){
      throw new Error(`expected success but got ${result.kind}`)
    }
    expect(result.is_success).toBe(true)
  })

  it('should return request_error when api return error', async () => {
    mockedVerifyAccount.mockRejectedValueOnce({
      response:{
        data:{
          message:"invalid code"
        }
      }
    })
    const result = await verifyAccountService.submit({
      email:'nhatkhang@gmail.com',
      otp:'123456'
    })

    expect(mockedVerifyAccount).toHaveBeenCalledOnce()
    expect(result.kind).toBe('request_error')
    expect(result.is_success).toBe(false)
    if(result.kind !== 'request_error')
      throw new Error(`Expect request_error but got ${result.kind}`)
  })
})

const mockedResendCode = vi.mocked(authApi.resend_code)

/**
 * validation: email
 * success
 * request error
 */
describe('verifyAccountService.resend', () => {
  const validEmail = 'nhatkhang@gmail.com'

  async function handleInValidationTest(){
    const invalidEmail = '123456'
    const result = await verifyAccountService.resend(invalidEmail)
    expect(result.kind).toBe('validation_error')
    if(result.kind !== 'validation_error')
      throw new Error(`Expect Validation Error but got ${result.kind}`)
    expect(result.is_success).toBe(false)
    expect(result.invalids.email).toBeTruthy()
  }
  async function handleSuccessTest(){
    mockedResendCode.mockResolvedValueOnce({
      status:200,
      statusText:'OK',
      config:{headers:new AxiosHeaders(), method:'post'},
      headers:{},
      data:{message:'ok', data:null}
    })
    const result = await verifyAccountService.resend(validEmail)
    expect(result.is_success).toBe(true)
    expect(result.kind).toBe('success')
    if(result.kind !== 'success')
      throw new Error(`Expect success kind but got ${result.kind}`)
  }
  async function handleRequestFailTest(){
    mockedResendCode.mockRejectedValueOnce({
      response:{
        data:{
          message:"resend fail"
        }
      }
    })
    const result = await verifyAccountService.resend(validEmail)
    expect(result.kind).toBe('request_error')
    expect(result.is_success).toBe(false)
    if(result.kind !== 'request_error')
      throw new Error(`Expect request_error but got ${result.kind}`)
  }
  beforeEach(()=>vi.clearAllMocks())
  it('It should return validation_error when email is invalid', handleInValidationTest)
  it('It should return success when api calling is success', handleSuccessTest)
  it('It should return request_error when api calling is failed', handleRequestFailTest)
})
