"use server"
export default async function postPeticionAceptada(peticion) {

    try {
        const response =  await fetch(`http://localhost:8080/proveedores/20345678901/presupuesto`, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json", // Specify the content type
            },
            body: JSON.stringify(peticion), // JSON.stringify the data
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