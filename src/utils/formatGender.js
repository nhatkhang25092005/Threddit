export function formatGender(text){
  let result
  if(text === 'male') result = 'Nam'
  else if(text === 'female') result = 'Nữ'
    else result = 'Khác'

  return result
}