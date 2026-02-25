import { useState } from "react";
import { useFormContext } from "react-hook-form";
import css from "./PhotoUploading.module.css";

const PhotoUploading = () => {
  const {
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const [inputUrl, setInputUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
    clearErrors("avatar");
  };

  const handleUploadClick = () => {
    if (!inputUrl.trim()) {
      setError("avatar", {
        type: "required",
        message: "Photo URL is required",
      });
      return;
    }

    setPreviewUrl(inputUrl);
    setValue("avatar", inputUrl, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleClear = () => {
    setInputUrl("");
    setPreviewUrl("");
    setValue("avatar", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className={css.wrapper}>
      <div className={css.photoWrapper}>
        <div className={css.iconFoot}>
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="preview"
                className={css.previewImage}
                onError={() => setPreviewUrl("")}
              />
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

        <div className={css.avatarWrapper}>
          <input
            type="text"
            placeholder="Enter image URL"
            className={css.fieldPhoto}
            value={inputUrl}
            onChange={handleInputChange}
          />

          <button type="button" className={css.btn} onClick={handleUploadClick}>
            Upload photo
            <svg width="18" height="18">
              <use href="/sprite.svg#icon-upload" />
            </svg>
          </button>
        </div>
      </div>
      {errors.avatar && <p className={css.error}>{errors.avatar.message}</p>}
    </div>
  );
};

export default PhotoUploading;
