//  注意： 每次调用  $.get() 或  $.post() 或 $.ajax() 的时候，
//  会先调用这个 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给 Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，同意拼接请求的根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url
  // console.log(options.url)

  // 统一为有权限的接口， 设置 headers 请求头
  if (options.url.indexOf('/my/') !== -1) { 
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  // 全局统一挂载 complete 回调函数
  options.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 强制清空 token
      localStorage.removeItem('token')
      // 强制跳转到登录页面
      location.href = 'login.html'
     }

   }
 }) 
