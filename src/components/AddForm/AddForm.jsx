import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import PhotoUploading from "../PhotoUploading/PhotoUploading";
import SexForm from "../SexForm/SexForm";
import TypeSelect from "../TypeSelect/TypeSelect";
import css from "./AddForm.module.css";

const schema = yup.object({
  sex: yup.string().required("Sex is required"),
  imgUrl: yup.string().required("Photo is required"),
  title: yup.string().required("Title is required").min(2),
  name: yup.string().required("Name is required").min(2),
  birthday: yup.string().required("Birthday is required"),
  type: yup.string().required("Type is required"),
});

const AddForm = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      sex: "",
      imgUrl: "",
      title: "",
      name: "",
      birthday: "",
      type: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className={css.wrapper}>
        <h4 className={css.title}>
          Add my pet /<span className={css.span}> Personal details</span>
        </h4>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            methods.handleSubmit(onSubmit)(e);
          }}
        >
          <div className={css.fieldWrapper}>
            <SexForm />
            <PhotoUploading />

            <input
              {...methods.register("title")}
              className={css.field}
              placeholder="Title"
            />

            <input
              {...methods.register("name")}
              className={css.field}
              placeholder="Pets name"
            />

            <div className={css.dataWrapper}>
              <CustomDatePicker />
              <TypeSelect />
            </div>
          </div>

          <div className={css.buttonWrapper}>
            <button type="button" className={css.buttonBack}>
              Back
            </button>
            <button type="submit" className={css.buttonSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddForm;
