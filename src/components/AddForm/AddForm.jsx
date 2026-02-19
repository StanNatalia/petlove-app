import css from "./AddForm.module.css";

const AddForm = () => {
  return (
    <div className={css.formWrapper}>
      <h4 className={css.title}>Add my pet/</h4>

      <form>
        <div>
          <img src="" alt="pet's photo" />
          <div>
            <input
              type="email"
              name="email"
              className={css.url}
              placeholder="Enter URL"
            />
            <button>Upload photo</button>
          </div>
        </div>

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
        <div>
          <input
            type="text"
            name="name"
            className={css.field}
            placeholder="Pets name"
          />
          <input
            type="text"
            name="name"
            className={css.field}
            placeholder="Pets name"
          />
        </div>
        <div>
          <button>Back</button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
