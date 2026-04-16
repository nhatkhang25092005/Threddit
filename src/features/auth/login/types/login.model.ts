export type LoginForm = {
  email: string
  password: string
}

export type LoginInvalids = Partial<Record<"email" | "password", string>>

export type LoginValidation =
  | { success: false; invalids: LoginInvalids }
  | { success: true; invalids?: never }

export type BaseInfoData = {
  avatarUrl: string
  backgroundUrl: string
  displayName: string
  dateOfBirth: string
  username: string
  educationLevel: string
  email: string
  followerNumber: number
  followingNumber: number
  gender: string
  relationshipStatus: string
  friendNumber: number
}

export type BaseInfoResult =
  | { is_success: true; data: BaseInfoData; message?: string }
  | { is_success: false; message: string }
