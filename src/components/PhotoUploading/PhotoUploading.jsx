import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import css from "./PhotoUploading.module.css";
import clsx from "clsx";

const PhotoUploading = ({
  name = "avatar",
  icon = "#icon-dog_foot",
  variant = "default",
}) => {
  const {
    setValue,
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const avatarFromForm = watch(name);

  const [inputUrl, setInputUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (avatarFromForm) {
      setPreviewUrl(avatarFromForm);
      setInputUrl(avatarFromForm);
    } else {
      setPreviewUrl("");
      setInputUrl("");
    }
  }, [avatarFromForm]);

  const handleInputChange = (e) => {
    setInputUrl(e.target.value);
    clearErrors(name);
  };

  const handleUploadClick = () => {
    if (!inputUrl.trim()) {
      setError(name, {
        type: "required",
        message: "Photo URL is required",
      });
      return;
    }

    setPreviewUrl(inputUrl);
    setValue(name, inputUrl, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleClear = () => {
    setInputUrl("");
    setPreviewUrl("");
    setValue(name, "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // ✅ BORDER STATE (как в Select)
  const getBorderState = () => {
    const hasError = !!errors[name];
    const hasValue = !!avatarFromForm;

    if (hasError) return "error";
    if (hasValue) return "success";
    return "default";
  };

  const borderState = getBorderState();

  return (
    <div className={clsx(css.wrapper, css[variant])}>
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
              <use href={`/sprite.svg${icon}`} />
            </svg>
          )}
        </div>

        <div className={css.avatarWrapper}>
          <input
            type="text"
            placeholder="Enter image URL"
            className={clsx(css.fieldPhoto, css[borderState])}
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

      {errors[name] && <p className={css.error}>{errors[name].message}</p>}
    </div>
  );
};

export default PhotoUploading;
