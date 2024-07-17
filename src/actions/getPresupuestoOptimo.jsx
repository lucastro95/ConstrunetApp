"use server"
export default async function getPresupuestoOptimo(filters, id) {

    console.log(filters, id);

    try {
        const response =  await fetch(`http://localhost:8080/presupuestos/opti?menorPrecio=${filters.menorPrecio}&tiempoEntrega=${filters.tiempoEntrega}&lista=${id}`, {
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