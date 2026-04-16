import {describe, expect, it, vi, beforeEach} from 'vitest'
import { registerService } from './register.service'
import { authApi } from '../../../api/auth/auth.api';
import type { RegisterForm } from './types/models';
import { AxiosHeaders } from 'axios';
vi.mock('../../../api/auth/auth.api', () => ({
  authApi:{
    register:vi.fn()
  }
}))
const validsRegisterFormData: RegisterForm = {
  username:'murad',
  email:'murad@example.com',
  password:'@Abcd123',
  repass:'@Abcd123',
  display_name:'Murad',
  date_of_birth:'1990-01-01',
  gender:'male'
}

const mockedRegisterFunction = vi.mocked(authApi.register)

const registerDatainvalidsField = [
  {
    name:'invalid email',
    form:{
      ...validsRegisterFormData,
      email:'invalid-email',
    },
    invalidField:'email'
  },
  {
    name:'invalid password',
    form:{
      ...validsRegisterFormData,
      password:'short',
    },
    invalidField:'password'
  },
  {
    name:'invalid repass',
    form:{
      ...validsRegisterFormData,
      repass:'differentpassword',
    },
    invalidField:'repass'
  },
] satisfies Array<{
  name:string,
  form:RegisterForm,
  invalidField: 'email' | 'password' | 'repass'
}>

type PasswordCase =
  | {
      name:string
      form:{
        username:string
        display_name:string
        date_of_birth:string
        gender:string
        email:string
        password:string
        repass:string
      }
      expectedKind:'success'
      invalidField:never
    }
  | {
      name:string
      form:{
        username:string
        display_name:string
        date_of_birth:string
        gender:string
        email:string
        password:string
        repass:string
      }
      expectedKind:'validation_error'
      invalidField:'password'
    }
const createPasswordCase = (name:string, password:string, expectedKind:'success' | 'validation_error'):PasswordCase => {
  const base = {
    name,
    form:{
      ...validsRegisterFormData,
      password,
      repass:password
    }
  }
  if(expectedKind === 'success')
    return {
      ...base,
      expectedKind,
      invalidField:undefined as never
    }
  if(expectedKind === 'validation_error')
    return{
      ...base,
      expectedKind,
      invalidField:'password'
    }
}
const passwordCases = [
  createPasswordCase(
    'valid minimum 8 chars',
    '@Abcd123',
    'success'
  ),
  createPasswordCase(
    'less than 8 chars',
    '@Abc123',
    'validation_error'
  ),
  createPasswordCase(
    'missing uppercase',
    '@abc1234',
    'validation_error'
  ),
  createPasswordCase(
    'missing lowercase',
    '@ABCD1234',
    'validation_error'
  ),
  createPasswordCase(
    'missing number',
    '@ABCDefgh',
    'validation_error'
  ),
  createPasswordCase(
    'missing special char',
    'AbcdE1234',
    'validation_error'
  ),
]



describe('registerService', () => {
  beforeEach(()=>vi.clearAllMocks())
  it.each(registerDatainvalidsField)('should return error when $name', async ({form, invalidField}) => {
    const result = await registerService(form)
    expect(result.kind).toBe('validation_error')
    expect(mockedRegisterFunction).not.toHaveBeenCalled()

    if(result.kind !== 'validation_error'){
      throw new Error(`Expected validation_error, but got ${result.kind}`)
    }

    expect(result.invalids[invalidField]).toBeTruthy()
  })
  
  it.each(passwordCases)('handles password rule: $name', async ({form, expectedKind, invalidField}) => {
    if(expectedKind === 'success') {
      mockedRegisterFunction.mockResolvedValueOnce({
        status:200,
        statusText:'OK',
        config:{headers:new AxiosHeaders(), method:'post'},
        headers:{},
        data:{message:'ok', data:null}
      })
    }
    const result = await registerService(form)
    expect(result.kind).toBe(expectedKind)
    if(expectedKind === 'success'){
      expect(mockedRegisterFunction).toHaveBeenCalledOnce()
      return
    }
    if(expectedKind === 'validation_error'){
      expect(mockedRegisterFunction).not.toHaveBeenCalled()
      if(result.kind !== 'validation_error'){
        throw new Error(`Expected validation_error but got ${result.kind}`)
      }

      expect(result.invalids[invalidField]).toBeTruthy()
    }
  })
})