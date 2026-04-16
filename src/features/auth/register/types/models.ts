export type RegisterForm = {
  email: string,
  username:string,
  password: string
  repass: string
  display_name: string,
  date_of_birth: string,
  gender:string
}

export type RegisterInvalids = Partial<Record<
  "email"|
  "username"|
  "password"|
  "repass"|
  "display_name"|
  "date_of_birth"|
  "gender",string>>

export type RegisterValidation =
  {success: true; invalids?: never} |
  {success: false, invalids:RegisterInvalids}