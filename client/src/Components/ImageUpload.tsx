import React, { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
tf.setBackend("cpu");

const ImageUpload: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setFile(file);
    UpadateImageSrc(file);
    Inference();
  };

  const UpadateImageSrc = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const Inference = async () => {
    const img = imageRef.current;

    if (img != null) {
      const model = await mobilenet.load();

      const predictions = await model.classify(img);

      console.log("Predictions: ");
      console.log(predictions);
    }
  };

  return (
    <React.Fragment>
      <label htmlFor="image-upload">
        Select an image to upload
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </label>
      {imagePreviewUrl && (
        <img
          src={imagePreviewUrl}
          alt="Preview"
          style={{ maxWidth: "100%" }}
          ref={imageRef}
          onLoad={() => Inference()}
        />
      )}
    </React.Fragment>
  );
};

export default ImageUpload;
