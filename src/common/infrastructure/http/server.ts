import { dataSources } from "../typeorm";
import { app } from "./app";
import { env } from "./env";
import { logger } from "./logger";

const PORT = env.PORT;

dataSources
    .initialize()
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`Server is running on the PORT: ${PORT}`);
            logger.info("API docs available at GET / docs");
        });
    })
    .catch((error) => {
        logger.error(`Erro initializing data source ${error}`);
    });
