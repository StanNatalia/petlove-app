import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import PhotoUploading from "../PhotoUploading/PhotoUploading";
import SexForm from "../SexForm/SexForm";
import TypeSelect from "../TypeSelect/TypeSelect";

import css from "./AddForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addPet } from "../../redux/Auth/options";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ModalCongrats from "../ModalCongrats/ModalCongrats";
import { selectUserPets } from "../../redux/Auth/selectors";
import { fetchSpecies } from "../../redux/Notices/options";

const schema = yup.object({
  sex: yup.string().required("Sex is required"),
  avatar: yup.string().required("Photo is required"),
  title: yup.string().required("Title is required").min(2),
  name: yup.string().required("Name is required").min(2),
  birthday: yup.string().required("Birthday is required"),
  type: yup.string().required("Type is required"),
});

const AddForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const types = useSelector((state) => state.notices.species);

  useEffect(() => {
    dispatch(fetchSpecies());
  }, [dispatch]);

  const formattedTypes =
    types?.map((t) => ({
      value: t,
      label: t.charAt(0).toUpperCase() + t.slice(1),
    })) || [];

  const pets = useSelector(selectUserPets);
  const isFirstPet = pets.length === 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      sex: "",
      avatar: "",
      title: "",
      name: "",
      birthday: "",
      type: "",
    },
  });

  const {
    formState: { errors, touchedFields, dirtyFields },
  } = methods;

  const getFieldClass = (name) => {
    const hasError = !!errors[name];
    const isDirty = !!dirtyFields[name] || !!touchedFields[name];

    if (!isDirty) return css.field;

    if (hasError) return `${css.field} ${css.errorField}`;

    return `${css.field} ${css.successField}`;
  };

  const onSubmit = (data) => {
    const formattedData = {
      name: data.name,
      title: data.title,
      species: data.type,
      birthday: data.birthday,
      imgURL: data.avatar,
      sex: data.sex,
    };

    try {
      dispatch(addPet(formattedData));
      if (isFirstPet) {
        openModal();
      } else {
        toast.success("Pet added successfully");
      }
    } catch (error) {
      toast.error("Failed to add pet");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className={css.wrapper}>
        <h4 className={css.title}>
          Add my pet /<span className={css.span}> Personal details</span>
        </h4>

        <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
          <div className={css.fieldWrapper}>
            <SexForm />
            <input type="hidden" {...methods.register("avatar")} />
            <PhotoUploading />

            <div>
              <input
                {...methods.register("title")}
                className={getFieldClass("title")}
                placeholder="Title"
              />
              {errors.title && (
                <p className={css.error}>{errors.title.message}</p>
              )}
            </div>

            <div>
              <input
                {...methods.register("name")}
                className={getFieldClass("name")}
                placeholder="Pets name"
              />
              {errors.name && (
                <p className={css.error}>{errors.name.message}</p>
              )}
            </div>

            <div className={css.dataWrapper}>
              <CustomDatePicker />
              <TypeSelect types={formattedTypes} />
            </div>
          </div>

          <div className={css.buttonWrapper}>
            <NavLink to="/profile">
              <button type="button" className={css.buttonBack}>
                Back
              </button>
            </NavLink>

            <button type="submit" className={css.buttonSubmit}>
              Submit
            </button>
          </div>
        </form>
        {isModalOpen && <ModalCongrats onClose={closeModal} />}
      </div>
    </FormProvider>
  );
};

export default AddForm;
