import AddForm from "../AddForm/AddForm";
import css from "./AddPet.module.css";

const AddPet = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.petBlock}>
        <img src="/images/AddPet.png" alt="dog" className={css.img} />
        <img src="/images/Shape.png" className={css.shape} />
      </div>
      <AddForm />
    </div>
  );
};

export default AddPet;
