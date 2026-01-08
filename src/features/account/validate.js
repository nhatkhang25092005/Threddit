import {pattern} from '../../constant/pattern'
import {account} from '../../constant/text/vi/account.text'
export const validate = {
  updatePassword : (form) => {
    let status = true
    const invalids = {}
    const err = account.update_password.error
    if(!pattern.password.test(form.old)){
      status = false,
      invalids.old = err.pattern_password
    }

    if(!pattern.password.test(form.new)){
      status = false,
      invalids.new = err.pattern_password
    }

    if(form.new.trim() !== form.confirm.trim()){
      status = false
      invalids.confirm = err.not_match
    }

    return {
      success:status,
      ...(Object.keys(invalids).length > 0 && {invalids})
    }
  }
}