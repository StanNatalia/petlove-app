import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import PhotoUploading from "../PhotoUploading/PhotoUploading";
import TypeSelect from "../TypeSelect/TypeSelect";
import css from "./AddForm.module.css";
import * as yup from "yup";

const AddForm = () => {
  const schema = yup
    .object({
      sex: yup
        .string()
        .required("Title is required")
        .min(2, "Minimum 2 characters"),
      imgUrl: yup
        .string()
        .required("Photo is required")
        .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/),
      title: yup
        .string()
        .required("Title is required")
        .min(2, "Minimum 2 characters"),
      name: yup
        .string()
        .required("Name is required")
        .min(2, "Minimum 2 characters"),
      birthday: yup
        .string()
        .required("Birthday is required")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Format must be YYYY-MM-DD"),

      type: yup
        .string()
        .required("Type is required")
        .min(2, "Minimum 2 characters"),
    })
    .required();
  return (
    <div className={css.wrapper}>
      <h4 className={css.title}>
        Add my pet /<span className={css.span}> Personal details</span>
      </h4>

      <form>
        <div className={css.formWrapper}>
          <div className={css.sexWrapper}>
            <div
              className={css.sexIcon}
              style={{ background: "rgba(244, 63, 94, 0.1)" }}
            >
              <svg width="24" height="24">
                <use href="/public/sprite.svg#icon-female" />
              </svg>
            </div>
            <div
              className={css.sexIcon}
              style={{ background: "rgba(84, 173, 255, 0.1)" }}
            >
              <svg width="24" height="24">
                <use href="/public/sprite.svg#icon-male" />
              </svg>
            </div>
            <div className={css.sexIcon} style={{ background: " #fff4df" }}>
              <svg width="24" height="24">
                <use href="/public/sprite.svg#icon-male_female" />
              </svg>
            </div>
          </div>
        </div>
        <div className={css.fieldWrapper}>
          <PhotoUploading />
          <input
            type="text"
            name="title"
            className={css.field}
            placeholder="Title"
          />
          <input
            type="text"
            name="name"
            className={css.field}
            placeholder="Pets name"
          />
          <div className={css.dataWrapper}>
            <CustomDatePicker />
            <TypeSelect />
          </div>
        </div>

        <div className={css.buttonWrapper}>
          <button className={css.buttonBack}>Back</button>
          <button className={css.buttonSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
