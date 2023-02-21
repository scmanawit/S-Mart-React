import React from 'react';
import ImageUploading from 'react-images-uploading';
import {Button} from "@mui/material";

export function ImageUploader({ change }) {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList) => {
        setImages(imageList)
        change(imageList)
    };

    return (
        <div className="App">
            <ImageUploading
                multiple={false}
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <Button
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Upload Profile Picture
                        </Button>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}