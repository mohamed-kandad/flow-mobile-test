import * as Yup from "yup";

export const authInitialForm = {
  countryCode: "+33",
  phone: "",
  password: "",
};

export const authValidationSchema = Yup.object({
  countryCode: Yup.string().required("Country Code is required"),
  phone: Yup.string().required("Phone is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});
