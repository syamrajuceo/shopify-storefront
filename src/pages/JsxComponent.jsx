import { useEffect, useState } from "react";
import axios from "axios";

function JsxComponent() {
    const [userDetails, setUserDetails] = useState(null);
    const [time, setTime] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [timeLoading, setTimeLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user details
                 axios.get("https://ondc.eatiko.com/api/in_category_items?category=F%26B").then((res) => {
                    setUserDetails(res.data);
                    setUserLoading(false);
                }).catch((err) => {
                    console.error("Error fetching user details:", err);
                    setUserLoading(false);
                });

                // Fetch time
                 axios.get("https://jsonplaceholder.typicode.com/todos/1").then((res) => {
                    setTime(res.data);
                    setTimeLoading(false);
                }).catch((err) => {
                    console.error("Error fetching time:", err);
                    setTimeLoading(false);
                });

                // // Run both in parallel
                // await Promise.all([userRes, timeRes]);

            } catch (error) {
                console.error("Error in fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>User Details</h2>
            {userLoading ? <p>Loading user details...</p> : <pre>{JSON.stringify(userDetails, null, 2)}</pre>}

            <h2>Time</h2>
            {timeLoading ? <p>Loading time...</p> : <pre>{JSON.stringify(time, null, 2)}</pre>}
        </div>
    );
}

export default JsxComponent;
