import React, { useEffect, useState } from "react";
import "./App.css";

type Country = {
    code: string;
    name: string;
}

type Holiday = {
    id: string;
    name: string;
    startDate: string;
}

const HolidayList: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState("IT");
    const [holidays, setHolidays] = useState<Holiday[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch("https://openholidaysapi.org/Countries?languageIsoCode=EN");
                const data = await res.json();
                const transformed = data.map((country: any) => ({
                    code: country.isoCode,
                    name: country.name[0].text
                }));
                setCountries(transformed);
            } catch (err) {
                console.error("Failed to fetch countries", err);
            }
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const currentYear = new Date().getFullYear();
                const res = await fetch(
                    `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedCountry}&validFrom=${currentYear}-01-01&validTo=${currentYear}-12-31&languageIsoCode=EN`
                );
                const data = await res.json();
                if (Array.isArray(data)) {
                    const transformed = data.map((holiday: any) => ({
                        id: holiday.id,
                        name: holiday.name[0].text,
                        startDate: holiday.startDate
                    }));
                    setHolidays(transformed);
                } else {
                    setHolidays([]);
                }
            } catch (err) {
                console.error("Failed to fetch holidays", err);
                setHolidays([]);
            }
        };
        if (selectedCountry) fetchHolidays();
    }, [selectedCountry]);

    return (
        <div className="container">
            <h1>Public Holidays</h1>
            <select
                className="dropdown"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
            >
                {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.name}
                    </option>
                ))}
            </select>
            <p>Holidays in <strong>{countries.find(c => c.code === selectedCountry)?.name || "Selected Country"}</strong> </p>

            <ul className="holiday-list">
                {holidays.length > 0 ? (
                    holidays.map((h) => (
                        <li key={h.id || `${h.name}-${h.startDate}`}>
                <strong>{new Date(h.startDate).toLocaleDateString("en-GB")}</strong> - {h.name}
            </li>
            ))
            ) : (
            <li>No holidays found for selected country</li>
        )}
        </ul>
    </div >
  );
};

export default HolidayList;