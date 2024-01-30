import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { IAddUser } from "../../types";

interface IAddUserProps {
  onSubmit: (value: IAddUser, actions: FormikHelpers<IAddUser>) => void;
}

export const AddUserComponent: React.FC<IAddUserProps> = ({ onSubmit }) => {
  const AddUserSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    token: Yup.number()
      .typeError("Token must be a number type")
      .moreThan(0, "Amount of token should be bigger than 0!")
      .required("Token is required"),
  });
  const errorStyle = "text-xs mb-10";
  return (
    <div className="bg-transparent h-full px-10 py-10 text-gray-400">
      <h1 className="text-center text-4xl font-bold mb-10">Add User</h1>
      <Formik
        initialValues={{
          name: "",
          token: 100,
        }}
        validationSchema={AddUserSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="m-auto w-96">
            <label>
              Name <span className="text-red-500">*</span>
            </label>
            <Field
              name="name"
              placeholder="Enter the name"
              className={`w-full bg-transparent border border-gray-400 px-5 py-2 ${
                errors.name && touched.name
                  ? "outline-red-500"
                  : "outline-gray-400"
              }`}
            />
            {errors.name && touched.name ? (
              <div className={`${errorStyle} text-red-500`}>{errors.name}</div>
            ) : (
              <div className={`${errorStyle} text-transparent`}>No error</div>
            )}
            <label>
              Token(tocos) <span className="text-red-500">*</span>
            </label>
            <Field
              name="token"
              placeholder="Enter the token"
              className={`w-full bg-transparent border border-gray-400 px-5 py-2 ${
                errors.token && touched.token
                  ? "outline-red-500"
                  : "outline-gray-400"
              }`}
            />
            {errors.token && touched.token ? (
              <div className={`${errorStyle} text-red-500`}>{errors.token}</div>
            ) : (
              <div className={`${errorStyle} text-transparent`}>No error</div>
            )}
            <button
              type="submit"
              className="border border-gray-400 bg-gray-400 text-white hover:bg-transparent hover:text-gray-400 transition-colors px-5 py-2 w-full"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
