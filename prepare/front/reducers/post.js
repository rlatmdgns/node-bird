export const initialState = {
  mainPosts:[{
    id:1,
    User:{
      id:1,
      nickname:'제로초',
    },
    content:'첫 번째 게시글 #해시태그 #익스프레스',
    Images :[
      {src:'http://image.yes24.com/goods/62597864/800x1000'},
      {src:'http://image.yes24.com/goods/62597864/800x1000'},
      {src:'https://velopert.com/wp-content/uploads/2016/02/nodejs-2560x1440-950x534.png'},
      {src:'https://velopert.com/wp-content/uploads/2016/02/nodejs-2560x1440-950x534.png'}
    ],
    Comments:[
      {
        User:{
          nickname:"nero",
        },
        content:'우와 개정판나왔다.'
      },
      {
        User:{
          nickname:"hero",
        },
        content:'기릿.'
      }
    ]
  }], 
  imagePaths:[],
  postAdded:false
}

const ADD_POST ='ADD_POST'

export const addPost ={
  type:'ADD_POST',
}

const dummyPost = {
  id: 2,
  content:'더미데이터',
  User :{
    id:1,
    nickname:'제로초',
  },
  Images:[],
  Comments:[]
}

const reducer = (state = initialState, action) =>{
  switch(action.type){
    case ADD_POST :
      return{
        ...state,
        mainPosts:[dummyPost, ...state.mainPosts],
        postAdded:true
      }
    default:
      return state;
  }
}

export default reducer