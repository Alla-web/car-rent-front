import { UserSliceState } from "./types"
import { CustomerProps } from "components/CustomerComponent/types"
import { CustomerDataProps } from "components/CustomerComponent/CustomerComponent"
import { createAppSlice } from "store/createAppSlice"
import axios from "axios"

const userInitialState: UserSliceState = {
  userList: [],
  userData: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    isActive: true,
  },
  error: undefined,
  status: "default",
}

export const userSlice = createAppSlice({
  name: "CUSTOMERS",
  initialState: userInitialState,
  reducers: create => ({
    getAllUsers: create.asyncThunk(
      async (__, thunkApi) => {
        try {
          const result = await axios.get(`/api/customers`)
          return result.data
        } catch (error) {
          return thunkApi.rejectWithValue(error)
        }
      },
      {
        pending: (state: UserSliceState) => {
          state.userList = []
          state.status = "loading"
          state.error = undefined
        },
        fulfilled: (state: UserSliceState, action: any) => {
          state.userList = action.payload.userList
          state.status = "success"
        },
        rejected: (state: UserSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
    getUser: create.asyncThunk(
      async (id, thunkApi) => {
        try {
          const result = await axios.get(`/api/customers/${id}`)
          return result.data
        } catch (error) {
          return thunkApi.rejectWithValue(error)
        }
      },
      {
        pending: (state: UserSliceState) => {
          ;(state.userData = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "",
            isActive: true,
          }),
            (state.error = undefined)
          state.status = "default"
        },
        fulfilled: (state: UserSliceState, action: any) => {
          state.userData = {
            id: action.payload.id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            password: action.payload.password,
            role: action.payload.role,
            isActive: action.payload.isActive,
          }
          state.status = "success"
        },
        rejected: (state: UserSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
    updateUser: create.asyncThunk(
      async (
        { id, updatedData }: { id: string; updatedData: CustomerProps },
        thunkApi,
      ) => {
        try {
          const result = await axios.put(
            `/api/customers/update/${id}`,
            updatedData,
          )
          return result.data
        } catch (error) {
          return thunkApi.rejectWithValue(error)
        }
      },
      {
        pending: (state: UserSliceState) => {
          state.status = "loading"
          state.error = undefined
        },
        fulfilled: (state: UserSliceState, action: any) => {
          state.userData = action.payload.updatedData
          state.status = "success"
        },
        rejected: (state: UserSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
    deleteUser: create.asyncThunk(
      async (
        { id, updatedData }: { id: string; updatedData: CustomerProps },
        thunkApi,
      ) => {
        try {
          const result = await axios.put(
            `/api/customers/delete/${id}`,
            updatedData,
          )
          return result.data
        } catch (error) {
          return thunkApi.rejectWithValue(error)
        }
      },
      {
        pending: (state: UserSliceState) => {
          state.status = "loading"
          state.error = undefined
        },
        fulfilled: (state: UserSliceState, action: any) => {
          state.userData = action.payload.updatedData
          state.status = "success"
        },
        rejected: (state: UserSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
    restoreUser: create.asyncThunk(
      async (
        { id, updatedData }: { id: string; updatedData: CustomerProps },
        thunkApi,
      ) => {
        try {
          const result = await axios.put(
            `/api/customers/restore/${id}`,
            updatedData,
          )
          return result.data
        } catch (error) {
          return thunkApi.rejectWithValue(error)
        }
      },
      {
        pending: (state: UserSliceState) => {
          state.status = "loading"
          state.error = undefined
        },
        fulfilled: (state: UserSliceState, action: any) => {
          state.userData = action.payload.updatedData
          state.status = "success"
        },
        rejected: (state: UserSliceState, action: any) => {
          state.error = action.payload
          state.status = "error"
        },
      },
    ),
  }),

  selectors: {
    selectAllUsers: (state: UserSliceState) => state.userList,
    selectUserData: (state: UserSliceState) => state.userData,
    selectStatus: (state: UserSliceState) => state.status,
    selectError: (state: UserSliceState) => state.error,
  },
})

export const userActions = userSlice.actions
export const userSelectors = userSlice.selectors
