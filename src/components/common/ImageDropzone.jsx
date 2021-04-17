import React, {useState} from 'react';
import Dropzone from "react-dropzone";
import "./ImageDropzone.less"
import ImageIcon from '@material-ui/icons/Image';

const ImageDropzone = (props) => {
    const {imageUrl, setImage} = props;

    const [files, setFiles] = useState(imageUrl ?
        [{url: imageUrl}] : []
    );

    const handleOnDrop = async (acceptedFiles) => {
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
                <p>Upload image</p>
            </div>
        );
    }

    const UploadedDropzone = (props) => {
        return (
            <div {...props.getRootProps({className: 'uploaded-dropzone'})}>
                <input {...props.getInputProps()} />
                <img src={files[0].url} alt="Uploaded image"/>
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
