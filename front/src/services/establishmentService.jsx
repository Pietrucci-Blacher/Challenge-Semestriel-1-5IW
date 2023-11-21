import httpClient from "./httpClient";

export const createEstablishment = ({ name, street, city, zipCode }) => {
    return httpClient.post("/establishments", {
        name,
        street,
        city,
        zipCode,
    });
};

export const getEstablishmentById = (id) => {
    return httpClient.get(`/establishments/${id}`);
}
