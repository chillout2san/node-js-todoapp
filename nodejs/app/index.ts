import { router } from "./presentation/router.js";

const PORT = 8000;

router.listen(PORT, () => {
  console.log("listening on port 8000...");
});
