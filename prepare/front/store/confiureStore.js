import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import creatreSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  return next(action);
};

const configureStore = () => {
  const sagaMiddleware = creatreSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;

/*
리덕스를 써야하는 이유
로그인 폼 , 회원가입 페이지 , 프로필 페이지 - 공통 데이터 로그인한 사람 정보, 로그인 여부 등

여러 컴포넌트들에서 공통적으로 쓰이는 데이터가 있는데  컴포넌트가 분리되어있으면 따로따로 흩어져있어야한다.
그러한 데이터들을 흩어지지 않게 하려면 부모컴포넌트를 두어서 부모컴포넌트에서 데이터를 받아서 자식컴포넌트 각각 보내줘야한다.
그런 과정들이 매번 수동으로 부모컴포넌트를 만들어주고 부모컴포넌트에서 데이터를 받아서 자긱컴포넌트로 보내주는 그런 과정들이 매우귀찮다.
이러한 문제를 해결하기위해 중앙에서 하나로 관리하여 컴포넌트한테 데이터를 뿌려주는 중앙데이터 저장소 역할을 하는게 리덕스이다. 

중앙관리 - contextAPI , redux, mobx, grapql / ex - 중앙난방, 중앙냉방

차이점 비동기를 지원하기 쉽냐 어렵냐

작은 규모 - contextAPI

생산성 측면 mobx

비동기를 다룰때는 실패에 대비해야한다.
비동기 3단계 데이터 요청 - 성공해서 받는거 - 실패

컴포넌트에서 데이터를 요청하면 의도치 않은 코드 중복이 일어날 수 있음

제로초님 생각 - 데이터 요청은 라이브러리나 , 모듈이 해야한다고 생각한다고한다.

리덕스 원리
{
  name:"김승훈",
  age:25,
  passwrod:"asd"
}
이런한 데이터가 있다. 필요로 할때 꺼내서 쓸 수 있다.
데이터를 바꾸러면 action이라는 걸 만들어 줘야함
type이 액션의 이름입니다.
{
  type:CHANGE_NICKNAME,
  data:'testest'
}
중앙 저장소를 하나 만들고 데이터를 바꿔야한다 action을 만들고 액션을 dispatch 하면 데이터가 바뀜

리듀서란 ?
switch(action.type){
  case'CHANGE_NICKNAME':
  return { // 불변성
    ...state,
    name:action.data,
  }
  case'CHANGE_AGE':
  return {
    ...state, - 참조관계
    age:action.data,
  }
}
상태를 하나의 객체로 표현을 하고 바꾸고 싶을 때마다 액션을 하나씩 만든다.
데이터를 바꿀때마다 액션을 만들어줘야하는 단점... 코드량이 많아진다.
*/
