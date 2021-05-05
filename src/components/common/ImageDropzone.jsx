import React, {useState} from 'react';
import Dropzone from "react-dropzone";
import "./ImageDropzone.less"
import ImageIcon from '@material-ui/icons/Image';
import {useDictionary} from "../../config/dictionary.jsx";


const ImageDropzone = (props) => {
    const {imageUrl, disabled, setImage} = props;
    const {DICTIONARY} = useDictionary();
    const [isEmpty, setIsEmpty] = useState(!imageUrl)

    const [files, setFiles] = useState([{url: imageUrl}]);

    const handleOnDrop = async (acceptedFiles) => {
        setIsEmpty(false);
        setImage(acceptedFiles[0])
        setFiles(acceptedFiles.map(file =>
            Object.assign(file, {
                url: URL.createObjectURL(file)
            })
        ))
    }

    const EmptyDropzone = (props) => {
        return (
            <div {...props.getRootProps({className: 'empty-dropzone'})}>
                <input {...props.getInputProps()} />
                <ImageIcon fontSize="large"/>
                <p>{DICTIONARY.uploadImage}</p>
            </div>
        );
    }

    const UploadedDropzone = (props) => {
        return (
            <div {...props.getRootProps({className: 'uploaded-dropzone'})}>
                <input {...props.getInputProps()} />
                <img src={files[0].url} alt={DICTIONARY.uploadedImage}/>
            </div>
        );
    }

    return (
        <Dropzone onDrop={handleOnDrop}
                  maxFiles={1}
                  disabled={disabled}>
            {({getRootProps, getInputProps}) => {
                return (
                    <div className="dropzone-container">
                        {isEmpty ?
                            <EmptyDropzone getRootProps={getRootProps} getInputProps={getInputProps}/>
                            :
                            <UploadedDropzone getRootProps={getRootProps} getInputProps={getInputProps}/>
                        }
                    </div>
                );
            }}
        </Dropzone>
    );
};

export default ImageDropzone;
