import React, { useState } from "react";
import Gallery from "./Components/Gallery";
import ImageUpload from "./Components/ImageUpload";
import Header from "./Components/Header";

function App() {
  const [breed, setBreed] = useState<string>();

  const setDogBreed = (dogBreed: string) => {
    setBreed(dogBreed);
  };

  return (
    <React.Fragment>
      <Header />
      <ImageUpload setBreedType={setDogBreed} />
      {breed && <Gallery breed={breed} />}
    </React.Fragment>
  );
}

export default App;
