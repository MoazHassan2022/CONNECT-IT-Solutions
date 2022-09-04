import axios from "axios";
import { useState } from "react";

export const CustomerMainPage = () => {

    const [finished, setFinished] = useState(false);
 
            let data;
            axios.get("http://127.0.0.1:3000/api/dummyInfo/fives").then(resp => {
                console.log(resp.data);
            });
            

    return (
        <>
        </>
    )
    
}
export default CustomerMainPage;