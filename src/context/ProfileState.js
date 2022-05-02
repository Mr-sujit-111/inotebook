import { useState } from "react";
import profileContext from "./profileContext";

const ProfileState = (props) => {
    const dataUrl = "url";
    const [url, setUrl] = useState(dataUrl);

    const getUrl = () => {
        const newUrl = "http://localhost:5000/profile/file_1649399935813_.jpg";
        console.log('get url:::' + newUrl)
        setUrl(newUrl);
    }
    return (
        <profileContext.Provider value={{ url, getUrl }}>
            {props.children}
        </profileContext.Provider>
    )
}

export default ProfileState;