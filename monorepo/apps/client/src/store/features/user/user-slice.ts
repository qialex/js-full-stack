import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'
import { AuthUserDto, AuthDto, AuthUserReqDto, TokenDto } from '@monorepo/lib-common'
import { useFetchWrapper } from 'apps/client/src/services/fetch-wrapper.function'

export interface UserState extends AuthDto{};

export const emptyTokenDto: TokenDto = {
  token: '',    
  expiresAt: 0,
}
export const userInitialState: UserState = {
  user: {
    email: '',
    id: 0,
  } as AuthUserDto,
  token: {
    access: {...emptyTokenDto} as TokenDto,
    refresh: {...emptyTokenDto} as TokenDto,
  },
}

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});



const userSlice = createSliceWithThunks({
  name: 'user',
  // initialState: (webStorage.getUserState() || {
  //   user: {...userInitialState.user},
  //   token: {
  //     access: {...userInitialState.token.access},
  //     refresh: {...userInitialState.token.refresh},
  //   },
  // }) as UserState,
  initialState: {
    user: {...userInitialState.user},
    token: {
      access: {...userInitialState.token.access},
      refresh: {...userInitialState.token.refresh},
    },
  } as UserState,  
  selectors: {
    selectSlice: state => state,
    selectAuthenticated: state => ({
      isAuthenticated: Boolean(state.user && state.user.email && state.user.id && state.token && state.token.access && state.token.access.token && (state.token.access.expiresAt > (new Date().getTime() / 1000))),
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
        const res = await useFetchWrapper().signIn(authUserReqDto)
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
          if (action.payload && action.payload.user && action.payload.token) {
            // // saving to a localStorage
            // webStorage.saveUserState(action.payload)

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
        const res = await useFetchWrapper().signIn(authUserReqDto)
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
          if (action.payload && action.payload.user && action.payload.token) {
            // // saving to a localStorage
            // webStorage.saveUserState(action.payload)

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
      async (arg, { getState }) => {
        const stateUser: UserState = (getState() as any).user as UserState;
        const res = await useFetchWrapper().logout({}, stateUser.token.access.token)
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
          // state.loading = false
          // state.todos.push(action.payload)
        },
      }
    ),
    logout: create.asyncThunk(
      // async (authUserReqDto: AuthUserReqDto) => {
      async (arg, { getState }) => {
        const stateUser: UserState = (getState() as any).user as UserState;
        const res = await useFetchWrapper().token({}, stateUser.token.access.token)
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
          state.user = {...userInitialState.user}
          state.token = {
              access: {...userInitialState.token.access},
              refresh: {...userInitialState.token.refresh},
          }
        },
      }
    ),         
  }),
})

export const { signUp, signIn, tokenUpdate, logout } = userSlice.actions
export const { selectSlice, selectAuthenticated } = userSlice.selectors
export const userReducer = userSlice.reducer



