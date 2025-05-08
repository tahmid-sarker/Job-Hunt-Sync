import { useEffect, useState } from "react";
import { DataContext } from "./DataContext";

const DataProvider = ({children}) => {
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        fetch("/data/companies.json").then(res => res.json()).then(data => setCompanies(data))
    }, [])

    // console.log(companies)

    return (
        <DataContext value={companies}>
            {children}
        </DataContext>
    );
};

export default DataProvider;