import { app } from "./app";
import { env } from "./env";

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on the port: ${PORT}`);
    console.log(`Apis docs availables at GET /docs`);
});
