import { createAppSlice } from "store/createAppSlice"
import { Car, RentCarSliceState } from "./types"
import axios from "axios"
import { string } from "yup"

const initialCarState: RentCarSliceState = {
  car: {
    id: "",
    brand: "",
    model: "",
    year: 0,
    type: "",
    fuelType: "",
    transmissionType: "",
    carStatus: "",
    dayRentalPrice: 0,
    // carImage: "",
  },
  cars: [],
  status: "default",
  error: undefined,
  priceRange: [20, 200],
  selectedStartDate: "",
  selectedEndDate: "",
}

const CARS_FILTER_URL = "/api/cars/filter"
const CARS_URL = "/api/cars/all"

export const carsSlice = createAppSlice({
  name: "cars",
  initialState: initialCarState,
  reducers: create => ({
    fetchCars: create.asyncThunk(
      async (
        filters: {
          startDateTime: string
          endDateTime: string
          minPrice: number
          maxPrice: number
          brands: string[]
          bodyTypes: string[]
          fuelTypes: string[]
          transmissionTypes: string[]
        },
        thunkApi,
      ) => {
        try {
          const params = new URLSearchParams()
          params.append("startDateTime", filters.startDateTime)
          params.append("endDateTime", filters.endDateTime)
          params.append("minPrice", filters.minPrice.toString())
          params.append("maxPrice", filters.maxPrice.toString())
          filters.brands.forEach(brand => params.append("brand", brand))
          filters.bodyTypes.forEach(bodyType => params.append("type", bodyType))
          filters.fuelTypes.forEach(fuelType => params.append("fuel", fuelType))
          filters.transmissionTypes.forEach(transmissionType =>
            params.append("transmissionType", transmissionType),
          )

          const response = await axios.get<Car[]>(
            `${CARS_FILTER_URL}?${params.toString()}`,
          )
          return response.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data || error.message)
        }
      },
      {
        pending: (state: RentCarSliceState) => {
          state.error = undefined
          state.status = "loading"
        },
        fulfilled: (state: RentCarSliceState, action: any) => {
          state.status = "success"
          state.cars = action.payload
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
    getAllCars: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const response = await axios.get<Car[]>(`${CARS_URL}`)
          return response.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data || error.message)
        }
      },
      {
        pending: (state: RentCarSliceState) => {
          state.error = undefined
          state.status = "loading"
        },
        fulfilled: (state: RentCarSliceState, action: any) => {
          state.status = "success"
          state.cars = action.payload
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),

    editCar: create.asyncThunk(
      async (
        {
          carId,
          updatedCar,
          token,
        }: {
          carId: string
          updatedCar: {
            // brand: string
            // model: string
            // year: number
            // type: string
            // fuelType: string
            // transmissionType: string
            // isActive: boolean
            carStatus: string
            dayRentalPrice: number
            // carImage: string
          }
          token: string | null
        },
        thunkApi,
      ) => {
        try {
          const response = await axios.put(
            `/api/cars/update/${carId}`,
            updatedCar,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": `application/json`,
              },
            },
          )
          return response.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data?.message || error.message || "Something went wrong")
        }
      },
      {
        pending: (state: RentCarSliceState) => {
          state.error = undefined
          state.status = "loading"
        },
        fulfilled: (state: RentCarSliceState, action: any) => {
          state.car = action.payload

          state.cars = state.cars.map(car =>
            car.id === action.payload.id ? action.payload : car,
          )

          state.status = "success"
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
    addCar: create.asyncThunk<
      Car,
      { carData: Omit<Car, "id">; token: string | null }
    >(
      async ({ carData, token }, thunkApi) => {
        try {
          const response = await axios.post<Car>(`api/cars`, carData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": `application/json`,
            },
          })
          return response.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data?.message || error.message || "Something went wrong")
        }
      },
      {
        pending: (state: RentCarSliceState) => {
          state.error = undefined
          state.status = "loading"
        },
        fulfilled: (state: RentCarSliceState, action: any) => {
          state.status = "success"
          state.cars.push(action.payload)
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
    restoreCar: create.asyncThunk(
      async (
        { carId, token }: { carId: string; token: string | null },
        thunkApi,
      ) => {
        try {
          const response = await axios.put<Car>(
            `api/cars/restore/${carId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": `application/json`,
              },
            },
          )
          return response.data
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data?.message || error.message || "Something went wrong")
        }
      },
      {
        pending: (state: RentCarSliceState) => {
          state.error = undefined
          state.status = "loading"
        },
        fulfilled: (state: RentCarSliceState, action: any) => {
          state.car = action.payload

          state.cars = state.cars.map(car =>
            car.id === action.payload.id ? action.payload : car,
          )

          state.status = "success"
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
    deleteCar: create.asyncThunk(
      async (
        { carId, token }: { carId: string; token: string | null },
        thunkApi,
      ) => {
        try {
          await axios.delete(`api/cars/delete/${carId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": `application/json`,
            },
          })
          return carId
        } catch (error: any) {
          return thunkApi.rejectWithValue(error.response?.data?.message || error.message || "Something went wrong")
        }
      },
      {
        pending: (state: RentCarSliceState) => {
          state.error = undefined
          state.status = "loading"
        },
        fulfilled: (state: RentCarSliceState, action: any) => {
          state.car = action.payload

          state.cars = state.cars.map(car =>
            car.id === action.payload.id ? action.payload : car,
          )

          state.status = "success"
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Something went wrong..."
          state.status = "error"
        },
      },
    ),
    uploadCarImage: create.asyncThunk(
      async (
        { carId, formData, token }: { carId: string; formData: FormData; token: string | null },
        thunkApi
      ) => {
        try {
          const response = await axios.post(
            `/api/cars/upload-image?id=${carId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",  
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          return response.data;  
        } catch (error: any) {
          return thunkApi.rejectWithValue(
            error.response?.data?.message || error.message || "Something went wrong"
          );
        }
      },
      {
        pending: (state: RentCarSliceState) => {
          state.error = undefined;
          state.status = "loading";
        },
        fulfilled: (state: RentCarSliceState, action: any) => {
          state.status = "success";
          const imageUrl = action.payload;
          const carId = action.meta.arg.carId;
    
                   state.cars = state.cars.map(car =>
            car.id === carId ? { ...car, carImage: imageUrl } : car
          );
        },
        rejected: (state: RentCarSliceState, action: any) => {
          state.error = action.payload || "Error uploading image";
          state.status = "error";
        },
      }
    ),
    
    
    setPriceRange: create.reducer(
      (state: RentCarSliceState, action: { payload: [number, number] }) => {
        state.priceRange = action.payload
      },
    ),
    setSelectedDates: create.reducer(
      (
        state: RentCarSliceState,
        action: { payload: { startDate: string; endDate: string } },
      ) => {
        state.selectedStartDate = action.payload.startDate
        state.selectedEndDate = action.payload.endDate
      },
    ),

    // getCarById: create.asyncThunk(
    //   async (carId: string, thunkApi) => {
    //     try {
    //       const response = await axios.get<Car>(`api/cars/${carId}`)
    //       return response.data
    //     } catch (error: any) {
    //       return thunkApi.rejectWithValue(error.response?.data || error.message)
    //     }
    //   },
    //   {
    //     pending: (state: RentCarSliceState) => {
    //       state.car = {
    //         id: "",
    //         brand: "",
    //         model: "",
    //         year: 0,
    //         type: "",
    //         fuelType: "",
    //         transmissionType: "",
    //         carStatus: "",
    //         dayRentalPrice: 0,
    //         carImage: "",
    //         // isActive: true
    //       }
    //       state.error = undefined
    //       state.status = "loading"
    //     },
    //     fulfilled: (state: RentCarSliceState, action: any) => {
    //       state.status = "success"
    //       state.car = action.payload
    //     },
    //     rejected: (state: RentCarSliceState, action: any) => {
    //       state.error = action.payload || "Something went wrong..."
    //       state.status = "error"
    //     },
    //   },
    // )
    // ,
  }),

  selectors: {
    carsData: (state: RentCarSliceState) => state,
    selectPriceRange: (state: RentCarSliceState) => state.priceRange,
    selectDates: (state: RentCarSliceState) => ({
      startDate: state.selectedStartDate,
      endDate: state.selectedEndDate,
    }),
    selectAllCars: (state: RentCarSliceState) => state.cars,
    // selectCarById: (state: RentCarSliceState, carId: string) => {
    //   return state.cars.find(car => car.id === carId)
    // },
  },
})

export const rentCarActions = carsSlice.actions
export const rentCarSelectors = carsSlice.selectors
