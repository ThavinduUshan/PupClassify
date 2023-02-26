import React, { useState } from "react";
import Gallery from "./Components/Gallery";
import ImageUpload from "./Components/ImageUpload";

function App() {
  const [breed, setBreed] = useState<string>();

  const setDogBreed = (dogBreed: string) => {
    setBreed(dogBreed);
  };

  return (
    <React.Fragment>
      <ImageUpload setBreedType={setDogBreed} />
      {breed && <Gallery breed={breed} />}
    </React.Fragment>
  );
}

export default App;
