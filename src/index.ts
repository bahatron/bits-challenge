import { app } from "./server";
import { EnvService } from "./services/env";
import { Logger } from "./services/logger";

app.listen(EnvService.PORT, () => {
    Logger.info(`Server listening on port: ${EnvService.PORT}`);
});
