import { request } from "./request";

export function getAuthCode(email) {
  return request({
    url: '/api/v1/user/authcode/get',
    params: {
      email,
    },
  })
}

export function sendSignUpData(userData) {
  return request({
    url: '/api/v1/user/signup',
    method: 'POST',
    data: userData,
  })
}