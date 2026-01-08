export const AUTH_TEXT = {
  login:{
    title:'Đăng nhập',
    email_field:'Email',
    password_field:'Mật khẩu',
    submit:'Đăng nhập',
    forgot_password:"Quên mật khẩu",
    register_ask:'Bạn chưa có tài khoản?',
    register_path:"Đăng kí",
    error:{
      pattern_email:"Email không hợp lệ",
      pattern_password:"Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt, tối thiểu 8 ký tự",
    }
  },

  register:{
    title:'Đăng kí',
    submit:'Đăng kí',
    login_ask:"Bạn đã có tài khoản?",
    login_path:'Đăng nhập',
    label:{
      username:'Username',
      email:'Email',
      display_name:'Tên hiển thị',
      password:'Mật khẩu: chữ hoa, chữ thường, số, ký tự đặc biệt, tối thiểu 8 ký tự',
      repass:'Nhập lại mật khẩu',
      gender:'Giới tính',
      male:'Nam',
      female:'Nữ',
      other:'Khác',
      date_of_birth:"Ngày sinh"
    },
    name:{
      username:"username",
      email:'email',
      display_name:'display_name',
      password:'password',
      repass:'repass',
      gender:'gender',
      date_of_birth:"date_of_birth"
    },
    error:{
      not_match:'Mật khẩu không khớp',
      pattern_email:"Email không hợp lệ",
      pattern_password:"Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt, tối thiểu 8 ký tự",
      username_space: 'Username không được có dấu cách'
    }
  },

  verify_account:{
    title:'Xác minh tài khoản',
    description:"Vui lòng nhập mã chúng tôi đã gửi đến email của bạn. Sau khi xác minh thành công, tài khoản này sẽ chính thức được đăng kí",
    submit:"Xác minh",
    resend_ask:"Bạn chưa nhận được mã?",
    resend_send:'Gửi lại mã',
    resend_countdown : (second)=>(`Đã gửi lại mã! Gửi lại sau ${second}s`),
    error:{
      pattern_email:'Email không hợp lệ'
    },
  },

  forgot:{
    title:"Quên mật khẩu",
    message:"Vui lòng cung cấp email, mã xác minh sẽ được gửi đến email này",
    email_field:'Email',
    submit:'Gửi yêu cầu',
    error:{
      pattern_email:'Email không hợp lệ'
    }
  },

  verify:{
    title: 'Đặt lại mật khẩu mới',
    description: 'Hãy đặt lại một mật khẩu mới và điền vào mã xác minh chúng tôi đã gửi đến email của bạn',
    submit:"Xác minh",
    label:{
      new_pass:'Mật khẩu mới',
      confirm:'Xác nhận mật khẩu mới'
    },
    name:{
      new_pass:"newPassword",
      confirm:"confirmPassword"
    },
    error:{
      pattern_password:"Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt, tối thiểu 8 ký tự",
      not_match:'Mật khẩu không khớp',
    }
  },
}