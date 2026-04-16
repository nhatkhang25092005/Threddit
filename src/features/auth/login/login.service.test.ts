import {describe, expect, it, vi, beforeEach} from 'vitest';
import {loginService} from './login.service';
import { authApi } from '../../../api/auth/auth.api';
import { getbaseinfo} from './getbaseinfo.service';
import { AxiosHeaders } from 'axios';

vi.mock('../../../api/auth/auth.api', () => ({
  authApi:{
    login: vi.fn()
  }
}));
vi.mock('./getbaseinfo.service', () => ({
  getbaseinfo: vi.fn()
}))

const mockedLogin = vi.mocked(authApi.login)
const mockedGetBaseInfo = vi.mocked(getbaseinfo)

const baseInfo = {
  avatarUrl: "a.jpg",
  backgroundUrl: "b.jpg",
  displayName: "Murad",
  dateOfBirth: "2000-01-01",
  username: "murad",
  educationLevel: "college",
  email: "murad@example.com",
  followerNumber: 1,
  followingNumber: 2,
  gender: "male",
  relationshipStatus: "single",
  friendNumber: 3,
}

describe('loginService', () => {
  beforeEach(()=>{
    vi.clearAllMocks();
  })

  it('returns validation_error and does not call getbaseinfo when login fails', async () => {
    const result = await loginService({email:'bad', password:'123'})
    expect(result.kind).toBe('validation_error')
    expect(mockedLogin).not.toHaveBeenCalled()
    expect(mockedGetBaseInfo).not.toHaveBeenCalled()

    if(result.kind !== 'validation_error'){
      throw new Error(`Expected validation_error, but got ${result.kind}`);
    }

    expect(result.invalids.email).toBeTruthy()
  })

  it('returns request_error when login request fails', async () => {
    mockedLogin.mockRejectedValue({
      response:{
        data:{message:'Invalid credentials'}
      }
    })

    const result = await loginService({
      email:'test@example.com',
      password:'@Minedash13579'
    })
    expect(result.kind).toBe('request_error')
    expect(mockedGetBaseInfo).not.toHaveBeenCalled()

    if(result.kind !== 'request_error'){
      throw new Error(`Expected request_error, but got ${result.kind}`);
    }

    expect(result.message).toBe('Invalid credentials')
  })

  it('returns request_error when getbaseinfo request fails', async () => {
    mockedLogin.mockResolvedValue({
      status:200,
      statusText:'OK',
      config:{headers:new AxiosHeaders(), method:'post'},
      headers:{},
      data:{message:'ok',data:null}
    })

    mockedGetBaseInfo.mockResolvedValue({
      is_success:false,
      message:'Can not load profile'
    })

    const result = await loginService({
      email:'test@example.com',
      password:'@Minedash13579'
    })
    expect(mockedLogin).toHaveBeenCalled()
    expect(mockedGetBaseInfo).toHaveBeenCalled()
    expect(result.kind).toBe('request_error')
    
    if(result.kind !== 'request_error'){
      throw new Error(`Expected request_error, but got ${result.kind}`);
    }
    
    expect(result.message).toBe('Can not load profile')
  })

  it('returns success when both login and getbaseinfo succeed', async () => {
    mockedLogin.mockResolvedValue({
      status:200,
      statusText:'OK',
      config:{headers:new AxiosHeaders(), method:'post'},
      headers:{},
      data:{message:'ok',data:null}
    })

    mockedGetBaseInfo.mockResolvedValue({
      is_success:true,
      data:baseInfo,
      message:'ok'
    })

    const result = await loginService({
      email:"murad@example.com",
      password:"@Minedash13579"
    })

    expect(mockedLogin).toHaveBeenCalled()
    expect(mockedGetBaseInfo).toHaveBeenCalled()
    expect(result.kind).toBe('success')

    if(result.kind !== 'success'){
      throw new Error(`Expected success, but got ${result.kind}`);
    }

    expect(result.data).toEqual(baseInfo)
  })
})