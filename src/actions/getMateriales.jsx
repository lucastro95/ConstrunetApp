"use server"
export default async function getMateriales({page}) {

    try {
        const response =  await fetch(`http://localhost:8080/materiales/?page=${page}&limit=5`, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json", // Specify the content type
            },
        });

        // console.log("Full Response:", response); 
        const data = await response.json();
        // console.log("Parsed JSON Data:", data);
        return data;
    } catch (error) {
        console.error("Error:", error);
        // You might want to handle the error here, depending on your use case
        throw error;
    }
}