export interface Car {
  isActive?: boolean
  status?: "loading" | "success" | "default" | "error"
  error?: any
  id: string
  brand: string
  model: string
  year: number
  type: string
  fuelType: string
  transmissionType: string
  carStatus: string
  dayRentalPrice: number
  carImage?: string
}

export interface RentCarSliceState {
  car: Car
  cars: Car[]
  status: "loading" | "success" | "default" | "error"
  error: any
  priceRange: [number, number]
  selectedStartDate: string
  selectedEndDate: string
}
