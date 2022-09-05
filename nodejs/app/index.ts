import { router } from "./interface_layer/router.js";
import { database } from "./infrastructure_layer/database.js";

const PORT = 8000;

router.listen(PORT, () => {
  console.log("listening on port 8000...");
});
