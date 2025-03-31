import Button from "components/Button/Button";
import Input from "components/Input/Input";
import { Form, useFormik } from "formik";
import * as Yup from 'yup';
import { FilterByDatesFormValues } from "./types";
export default function FilterByDatesForm() {

    const schema = Yup.object().shape({
        startDateTime: Yup.date()
            .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Start date and time cannot be in the past')
            .required('Start date and time is required'),
        endDateTime: Yup.date()
            .min(Yup.ref('startDateTime'), 'End date and time must be later than start date and time')
            .required('End date and time is required'),
    });

    const formik = useFormik({
        initialValues: {
            startDateTime: "",
            endDateTime: ""
        } as FilterByDatesFormValues,
        validationSchema: schema,
        validateOnChange: false,
        onSubmit: (values) => {

        }
    });
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className='max-w-5xl mx-auto bg-white rounded-lg shadow-lg relative -mt-30 py-5 border border-gray-100 mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 mb-12 text-center'>Find Available Cars</h2>
            <form className="flex flex-col md:flex-row gap-4 mt-5 items-stretch p-7" onSubmit={formik.handleSubmit}>
                <div className="flex-1">
                    <Input
                        name="startDateTime"
                        type="datetime-local"
                        label="Pick-up Date and Time"
                        input_id="startDateTime"
                        value={formik.values.startDateTime}
                        onChange={formik.handleChange}
                        errorMessage={formik.errors.startDateTime}
                        min={today}
                    />
                </div>
                <div className="flex-1">
                    <Input
                        name="endDateTime"
                        type="datetime-local"
                        label="Return Date and Time"
                        input_id="endDateTime"
                        value={formik.values.endDateTime}
                        onChange={formik.handleChange}
                        errorMessage={formik.errors.endDateTime}
                        min={formik.values.startDateTime || today}
                    />
                </div>
                <div className="md: w-48">
                    <Button
                        type="submit"
                        name="SEARCH"
                        customClasses="!w-full !h-[58px] !py-2.5 !px-5 !rounded-lg !font-semibold !bg-gray-900 !text-white hover:!bg-red-700 !transition-colors !duration-300"
                    />
                </div>
            </form >
        </div >
    );
}
