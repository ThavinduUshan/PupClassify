import axios from "axios";
import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  breed: string;
}

const Gallery = ({ breed }: Props) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://dog.ceo/api/breed/${breed
          .toLocaleLowerCase()
          .replaceAll(" ", "")}/images`
      )
      .then((response) => {
        setImages(response.data.message);
      });
  }, []);
  return (
    <React.Fragment>
      <section className="overflow-hidden text-neutral-700">
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
          <div className="-m-1 flex flex-wrap md:-m-2">
            {images &&
              images.map((image, index) => {
                return (
                  <div className="flex w-1/3 flex-wrap" key={index}>
                    <div className="w-full p-1 md:p-2">
                      <LazyLoadImage
                        effect="blur"
                        alt="gallery"
                        className="block h-full w-full rounded-lg object-cover object-center"
                        src={image}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Gallery;
