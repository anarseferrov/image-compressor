import React, { Component } from "react";
import imageCompression from "browser-image-compression";

class Example extends Component {
  render() {
    function handleImageUpload(event) {
      var imageFile = event.target.files[0];
      console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      var options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      imageCompression(imageFile, options)
        .then(function (compressedFile) {
          console.log(
            "compressedFile instanceof Blob",
            compressedFile instanceof Blob
          ); // true
          console.log(
            `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
          ); // smaller than maxSizeMB

          return uploadToServer(compressedFile); // write your own logic
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
    return (
      <div>
        <input
          type="file"
          accept="image/*"
          onchange={handleImageUpload()}
        />
      </div>
    );
  }
}

export default Example;
