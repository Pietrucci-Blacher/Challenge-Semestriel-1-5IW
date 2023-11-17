import httpClient from "./httpClient";

export const createEstablishment = ({ owner, name, street, city, zipCode }) => {
    return httpClient.post("/establishments", {
        owner,
        name,
        street,
        city,
        zipCode,
    });
};
