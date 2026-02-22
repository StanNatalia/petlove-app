import { useFormContext } from "react-hook-form";
import css from "./PhotoUploading.module.css";

const PhotoUploading = () => {
  const { register, watch, setValue } = useFormContext();
  const imgUrl = watch("imgUrl") || ""; // источник правды

  const handleChange = (e) => {
    setValue("imgUrl", e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleClear = () => {
    setValue("imgUrl", "", { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className={css.photoWrapper}>
      <div className={css.iconFoot}>
        {imgUrl ? (
          <>
            <img src={imgUrl} alt="preview" className={css.previewImage} />
            <button
              type="button"
              className={css.removePhotoButton}
              onClick={handleClear}
            >
              ×
            </button>
          </>
        ) : (
          <svg width="44" height="44">
            <use href="/sprite.svg#icon-dog_foot" />
          </svg>
        )}
      </div>

      <div className={css.urlWrapper}>
        <input
          type="text"
          placeholder="Enter image URL"
          className={css.fieldPhoto}
          value={imgUrl}
          onChange={handleChange}
          {...register("imgUrl", { required: "Photo URL is required" })}
        />
      </div>
    </div>
  );
};

export default PhotoUploading;
