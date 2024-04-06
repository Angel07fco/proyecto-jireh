import axios from "axios";
import { useState } from "react";

function ImageCloudinary() {

    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "proyectojireh");

        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dl8odylct/image/upload",
            data
        );
        console.log(response.data)
        setImage(response.data.secure_url);
        console.log(response.data.secure_url)
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-5">
            <h1>Subiendo imagenes con cloudinary</h1>
            <div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={uploadImage}
                />
                {image &&
                    <div>
                        <img src={image} />
                        <button>Eliminar imagen</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ImageCloudinary;
