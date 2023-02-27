import React, { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { Props } from "../interfaces/Props";
tf.setBackend("cpu");

const ImageUpload: React.FC<Props> = ({ setBreedType, setPrediction }) => {
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
    setPrediction(true);
    const img = imageRef.current;

    if (img != null) {
      const model = await mobilenet.load();

      const predictions = await model.classify(img);

      let ClassifiedBreed: string = predictions[0].className;

      if (ClassifiedBreed.includes(",")) {
        ClassifiedBreed = ClassifiedBreed.substring(
          0,
          ClassifiedBreed.indexOf(",")
        );
      }

      setBreedType(ClassifiedBreed);
      setPrediction(false);
    }
  };

  return (
    <React.Fragment>
      {imagePreviewUrl ? (
        <img
          src={imagePreviewUrl}
          alt="Preview"
          style={{ maxWidth: "100%" }}
          ref={imageRef}
          onLoad={() => Inference()}
          className="h-auto max-w-full mx-auto w-3/5 my-16"
        />
      ) : (
        <div className="flex items-center justify-center  w-3/5 mx-auto my-16">
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      )}
    </React.Fragment>
  );
};

export default ImageUpload;
