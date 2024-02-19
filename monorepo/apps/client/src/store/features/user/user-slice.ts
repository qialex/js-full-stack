import { createSlice, buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'
import { Selector } from '@reduxjs/toolkit'
import { emptyAuthDto, AuthDto, AuthUserReqDto } from '@monorepo/lib-common'


export interface UserState extends AuthDto{};

const userInitialState: UserState = emptyAuthDto

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const defautltApiUrl = 'http://localhost:3001'

const userSlice = createSliceWithThunks({
  name: 'user',
  initialState: {
    user: {...userInitialState.user},
    token: {
      access: {...userInitialState.token.access},
      refresh: {...userInitialState.token.refresh},
    },
  } as UserState,
  selectors: {
    selectSlice: state => state,
    selectAuth: state => ({
      isAuth: Boolean(state.user && state.user.email && state.user.id && state.token && state.token.access && state.token.access.token && (state.token.access.expiresAt > (new Date().getTime() / 1000))),
      user: state.user,
    }), 
  },  
  reducers: (create) => ({
    // logout: create.reducer<number>((state, action) => {
    //   state = action.payload
    // }),
    // someOther: create.preparedReducer(
    //   (text: string) => {
    //     const id = id
    //     return { payload: { id, text } }
    //   },
    //   // action type is inferred from prepare callback
    //   (state, action) => {
    //     state = action.payload
    //   }
    // ),
    signUp: create.asyncThunk(
      async (authUserReqDto: AuthUserReqDto) => {
        const res = await fetch(`${process.env.API_URL_FOR_CLIENT || defautltApiUrl}/auth/sign-up`, {
          method: 'POST',
          headers: {
            'mode': 'cors',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },        
          body: JSON.stringify(authUserReqDto),
        })
        return (await res.json()) as AuthDto
      },
      {
        pending: (state) => {
          // state.loading = true
        },
        rejected: (state, action) => {
          console.log(action)
          // state.loading = false
        },
        fulfilled: (state, action) => {
          // state = action.payload
          console.log(state)
          console.log(action)
          if (action.payload && action.payload.user && action.payload.token) {
            state.user = {...action.payload.user}
            state.token = {
              access: {...action.payload.token.refresh},
              refresh: {...action.payload.token.refresh},
            }
          }
        },
      }
    ),
    signIn: create.asyncThunk(
      async (authUserReqDto: AuthUserReqDto) => {
        const res = await fetch(`${process.env.API_URL_FOR_CLIENT || defautltApiUrl}/auth/sign-in`, {
          method: 'POST',
          headers: {
            'mode': 'cors',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },        
          body: JSON.stringify(authUserReqDto),
        })
        return (await res.json()) as AuthDto
      },
      {
        pending: (state) => {
          // state.loading = true
        },
        rejected: (state, action) => {
          // state.loading = false
        },
        fulfilled: (state, action) => {
          // state = action.payload
          console.log(state)
          console.log(action)
          if (action.payload && action.payload.user && action.payload.token) {
            state.user = {...action.payload.user}
            state.token = {
              access: {...action.payload.token.refresh},
              refresh: {...action.payload.token.refresh},
            }
          }
        },
      }
    ),    
    tokenUpdate: create.asyncThunk(
      async (id: string, thunkApi) => {
        const res = await fetch(`myApi/todos?id=${id}`)
        // return (await res.json()) as Item
      },
      {
        pending: (state) => {
          // state.loading = true
        },
        rejected: (state, action) => {
          // state.loading = false
        },
        fulfilled: (state, action) => {
          // state.loading = false
          // state.todos.push(action.payload)
        },
      }
    ),
    logout: create.asyncThunk(
      // async (authUserReqDto: AuthUserReqDto) => {
      async (arg, { getState }) => {
        const stateUser: UserState = (getState() as any).user as UserState;
        const res = await fetch(`${process.env.API_URL_FOR_CLIENT || defautltApiUrl}/auth/logout`, {
          method: 'POST',
          headers: {
            'mode': 'cors',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${stateUser.token.access.token}`
          },
        })
        return (await res.json())
      },
      {
        pending: (state) => {
          // state.loading = true
        },
        rejected: (state, action) => {
          // state.loading = false
        },
        fulfilled: (state, action) => {
          console.log(state)
          console.log(action)
          state.user = {...userInitialState.user}
          state.token = {
              access: {...userInitialState.token.access},
              refresh: {...userInitialState.token.refresh},
          }
          // state = {
          //   user: {...userInitialState.user},
          //   token: {
          //     access: {...userInitialState.token.access},
          //     refresh: {...userInitialState.token.refresh},
          //   },
          // } as UserState
        },
      }
    ),         
  }),
})

export const { signUp, signIn, tokenUpdate, logout } = userSlice.actions
export const { selectSlice, selectAuth } = userSlice.selectors
export const userReducer = userSlice.reducer



