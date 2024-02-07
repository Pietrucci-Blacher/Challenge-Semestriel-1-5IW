export const normalize = (data) => {
    try {
        if (data["@type"] === "hydra:Collection" && Array.isArray(data["hydra:member"])) {
            return data["hydra:member"];
        } else {
            throw new Error("Invalid data structure");
        }
    } catch (error) {
        console.error("Error normalizing data:", error);
        return [];
    }
};


