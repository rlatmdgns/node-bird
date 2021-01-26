export const initialState = {
  isLoggedIn:false,
  me:null,
  signUpData:{},
  loginData :{}
}

export const loginRequestAction = (data) => {
  console.log(data)
  return {
    type:'LOG_IN_REQUEST',
    data
  }
}
export const loginSuccessAction = (data) => {
  console.log(data)
  return {
    type:'LOG_IN_SCCUESS',
    data
  }
}

export const loginFailureAction= (data) => {
  return {
    type:'LOG_IN_FAILURE',
    data
  }
}
export const logoutRequestAction= (data) => {
  return {
    type:'LOG_OUT_REQUEST',
    data
  }
}

export const logoutSccuessAction= (data) => {
  return {
    type:'LOG_OUT_SCCUESS',
    data
  }
}

export const logoutFailureAction = (data) => {
  return {
    type:'LOG_OUT_FAILURE',
    data
  }
}

const reducer = (state = initialState, action) =>{
  switch(action.type){
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn:true,
        me:action.data
      }
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn:false,
        me:null
      }
    default:
      return state
  }
}

export default reducer