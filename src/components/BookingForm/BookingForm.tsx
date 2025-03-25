import Button from "../Button/Button"
import Input from "../Input/Input"
import * as Yup from "yup"
import { useFormik } from "formik"
import { RentFormValues } from "../BookingForm/types"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const costPerDay = 50 // Example cost per day

const calculateTotalCost = (startDate: Date, endDate: Date): number => {
  // Сбросим время для обеих дат, чтобы учитывать только дни
  const start = new Date(startDate.setHours(0, 0, 0, 0))
  const end = new Date(endDate.setHours(0, 0, 0, 0))

  // Проверка, что дата конца не раньше даты начала
  if (end < start) {
    console.error("End date cannot be earlier than start date.")
    return 0
  }
  // Вычисляем разницу во времени
  const timeDifference = end.getTime() - start.getTime()

  // Количество дней
  const days = timeDifference / (1000 * 3600 * 24)

  // Если разница в днях меньше 1, считаем хотя бы 1 день аренды
  const totalRentCost = days >= 1 ? days * costPerDay : costPerDay
  // Пример: даже если 1 день, все равно начисляем стоимость аренды

  return totalRentCost
}

function BookingForm() {
  const navigate = useNavigate()

  const today = new Date().toLocaleDateString("en-CA")
  const validationSchema = Yup.object({
    startDate: Yup.date()
      .required("Start date is required")
      .min(today, "Start date cannot be in the past"),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be later than start date"),
    totalRentCost: Yup.number()
      .required("Rent cost can't be empty")
      .min(0.01, "Rent cost can't be 0"),
    is18: Yup.boolean()
      .oneOf([true], "You must be 18 years old to rent a car")
      .required("You must be 18 years old to rent a car"),
  })

  const formik = useFormik({
    initialValues: {
      startDate: new Date().toLocaleDateString("en-CA"),
      endDate: (() => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1) // Добавляем 1 день
        return tomorrow.toLocaleDateString("en-CA") // Преобразуем в формат 'yyyy-MM-dd'
      })(),
      totalRentCost: "",
      is18: false,
    } as unknown as RentFormValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values: RentFormValues, { resetForm }) => {
      console.log("Submitted values:", values)

      // Очищаем форму после отправки
      resetForm()
      alert("The car is rented")
      //  navigate("/account")
    },
  })

  // Сбрасываем стоимость аренды, если изменяется дата начала или конца
  const handleDateChange = () => {
    formik.setFieldValue("totalRentCost", 0)
  }

  const handleCalculateTotalCost = () => {
    const { startDate, endDate } = formik.values

    // Ensure the dates are valid strings (startDate and endDate should be valid date strings)
    if (!startDate || !endDate) {
      console.error("Both startDate and endDate are required.")
      return // Exit if startDate or endDate is missing
    }
    // Преобразуем строки в объекты Date
    const start = new Date(startDate)
    const end = new Date(endDate)

    const totalCost = calculateTotalCost(start, end) // Pass as strings
    formik.setFieldValue("totalRentCost", totalCost) // Update Formik state
  }

  // State to manage the visibility of the window
  const [isVisible, setIsVisible] = useState(true)

  // Handle close button click
  const handleClose = () => {
    setIsVisible(false) // Set visibility to false, effectively "closing" the window
  }

  if (!isVisible) {
    return null // If not visible, return nothing (effectively hiding the component)
  }

  return (
    <div className="flex flex-col w-[590px] mx-auto gap-8 rounded-md">
      <h2 className="text-xl font-bold p-[60px] mb-6">
        To rent a car please fill and submit the following form:
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-1 w-full ">
          <Input
            name="startDate"
            type="date"
            label="Start date"
            placeholder="Select start date"
            value={formik.values.startDate}
            onChange={e => {
              formik.handleChange(e)
              handleDateChange() // Сбрасываем стоимость при изменении даты
            }}
            onBlur={formik.handleBlur}
            errorMessage={
              formik.errors.startDate
                ? String(formik.errors.startDate)
                : undefined
            }
          />
          <Input
            name="endDate"
            type="date"
            label="End date"
            placeholder="Select end date"
            value={formik.values.endDate}
            onChange={e => {
              formik.handleChange(e)
              handleDateChange() // Сбрасываем стоимость при изменении даты
            }}
            onBlur={formik.handleBlur}
            errorMessage={
              formik.errors.endDate ? String(formik.errors.endDate) : undefined
            }
          />

          <Input
            name="totalRentCost"
            type="number"
            label="Total Rent Cost"
            placeholder="Click button to display total cost"
            value={formik.values.totalRentCost}
            onChange={() => {}}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.totalRentCost}
            readOnly={true}
          />

          {/* <div className="flex flex-row gap-6 ">
            <div className="mt-1">
              <Input
                name="is18"
                type="checkbox"
                checked={formik.values.is18}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={formik.errors.is18}
              />
            </div>
            <label htmlFor="is18" className="font-semibold m-0 p-0 ">
              Are you already 18 ?
            </label>
          </div> */}

          <label className="flex items-center cursor-pointer gap-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-red-500"
              id="is18"
              checked={formik.values.is18}
              onChange={formik.handleChange}
              name="is18"
              onBlur={formik.handleBlur}
            />
            <span className="ml-2 text-gray-700 font-semibold">
            Are you already 18 ?
            </span>

          </label>
          {formik.errors.is18 && formik.touched.is18 && (
  <p className="text-red-500 text-sm ">{formik.errors.is18}</p>
)}
          

<div className="mt-4">
          <p className="text-sm text-gray-500 mb-4">
            Payment is available only at pick up station.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            You can pick up a car only at the pick up station.
          </p>
</div>
          <div className="mt-2.5 w-100%">
            <Button
              name="Calculate Total Cost"
              type="button"
              onClick={handleCalculateTotalCost}
              disabled={!(formik.values.startDate && formik.values.endDate)}
              customClasses="!w-full !rounded-lg  hover:!bg-red-700 transition-colors duration-300 !bg-gray-900 !text-white"
            />
          </div>
        </div>
        <div className="mt-2.5 w-100%">
          <Button
            name="Confirm"
            type="submit"
            //disabled={!formik.isValid || !formik.values.totalRentCost || formik.isSubmitting}
          />
        </div>
       
        {/* close button */}
        <div className="w-auto mt-2.5">
          <Button
            name="Cancel"
            customClasses="!rounded-lg  !bg-gray-400 hover:!bg-red-700 text-white"
            onClick={handleClose}
          />
        </div>
      </form>
    </div>
  )
}
export default BookingForm
