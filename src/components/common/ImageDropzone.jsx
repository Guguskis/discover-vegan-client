import React, {useState} from 'react';
import Dropzone from "react-dropzone";
import "./ImageDropzone.less"
import ImageIcon from '@material-ui/icons/Image';


const ImageDropzone = () => {

    const [files, setFiles] = useState([]);

    const handleOnDrop = (acceptedFiles) => {
        setFiles(acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        ))
    }

    const EmptyDropzone = (props) => {
        return (
            <div {...props.getRootProps({className: 'empty-dropzone'})}>
                <input {...props.getInputProps()} />
                <ImageIcon fontSize="large"/>
                <p>Upload image</p>
            </div>
        );
    }

    const UploadedDropzone = (props) => {
        return (
            <div {...props.getRootProps({className: 'uploaded-dropzone'})}>
                <input {...props.getInputProps()} />
                <img src={files[0].preview} alt="Uploaded image"/>
            </div>
        );
    }

    return (
        <Dropzone onDrop={handleOnDrop}
                  maxFiles={1}>
            {({getRootProps, getInputProps}) => {
                return (
                    <div className="dropzone-container">
                        {files.length === 0 ?
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
