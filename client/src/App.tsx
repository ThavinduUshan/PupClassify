import React, { useState } from "react";
import Gallery from "./Components/Gallery";
import ImageUpload from "./Components/ImageUpload";
import Header from "./Components/Header";
import Spinner from "./Components/Spinner";

function App() {
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [breed, setBreed] = useState<string | null>(null);

  const setDogBreed = (dogBreed: string | null) => {
    setBreed(dogBreed);
  };

  const setPredictionStatus = (status: boolean) => {
    setIsPredicting(status);
  };

  return (
    <React.Fragment>
      <Header />
      <ImageUpload
        setBreedType={setDogBreed}
        setPrediction={setPredictionStatus}
      />
      {isPredicting && <Spinner />}
      {breed && <Gallery breed={breed} />}
    </React.Fragment>
  );
}

export default App;
