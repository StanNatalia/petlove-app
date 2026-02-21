import { useState, useRef, useEffect } from "react";
import css from "./PhotoUploading.module.css";

const PhotoUploading = () => {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  // Очищаем объект URL при размонтировании или смене фото
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleClickUpload = () => {
    inputRef.current.click();
  };

  const handleRemovePhoto = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
      inputRef.current.value = null;
    }
  };

  return (
    <div className={css.photoWrapper}>
      <div className={css.iconFoot}>
        {preview ? (
          <>
            <img src={preview} alt="preview" className={css.previewImage} />
            <button
              type="button"
              className={css.removePhotoButton}
              onClick={handleRemovePhoto}
            >
              ×
            </button>
          </>
        ) : (
          <svg width="44" height="44">
            <use href="/public/sprite.svg#icon-dog_foot" />
          </svg>
        )}
      </div>

      <div className={css.urlWrapper}>
        <input
          ref={inputRef}
          accept="image/*"
          onChange={handleFileChange}
          className={css.hiddenInput}
          type="file"
          name="imgUrl"
        />
        <button
          type="button"
          onClick={handleClickUpload}
          className={css.buttonPhoto}
        >
          {preview ? "Change photo" : "Upload photo"}
          <svg width="24" height="24">
            <use href="/sprite.svg#icon-upload" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PhotoUploading;
