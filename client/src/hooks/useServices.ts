import { useEffect, useState } from "react";
import axios from "axios";
import { Service } from "../models";

export function useServices() {
    const [data, setData] = useState<Service[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/services');
            setData(data);
        }

        fetchData();
    }, []);

    return data;
}