export const account = {
  title:'Thông tin tài khoản',
  label:{
    username:'Username:',
    email:'Email:',
    method:'Phương thức đăng nhập:'
  },
  name:{
    username:'username',
    email:'email',
    method:'method'
  },
  button:"Xóa tài khoản",
  default_data:{
    username:'Chưa có thông tin',
    email:'Chưa có thông tin',
    method:'Chưa có thông tin'
  },

  update_password:{
    title:'Đổi mật khẩu',
    label:{
      old:"Mật khẩu cũ",
      new:'Mật khẩu mới',
      confirm:'Xác nhận mật khẩu'
    },
    name:{
      old:'old',
      new:'new',
      confirm:'confirm'
    },
    button:'Xác nhận',
    error:{
      not_match:"Mật khẩu không khớp",
      pattern_password:"Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt, tối thiểu 8 ký tự",
    }
  },

  delete_request:{
    title:'Xóa tài khoản',
    message:'Mọi lịch sử hoạt động của bạn trên Threddit đều sẽ biến mất Bạn có chắc chắn muốn xóa tài khoản?',
    button:'Vâng, tôi muốn xóa'
  },

  delete_verify:{
    title:"Xác thực xóa tài khoản",
    message:'Chúng tôi đã gửi mã xác nhận đến email. Nếu đã chắc chắn muốn xóa tài khoản, vui lòng điền mã vào đây',
    button:'Xác nhận',
  }
}