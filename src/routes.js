import ErrorCode404 from "./Pages/404/index.svelte"
import Panel from "./Pages/Panel/index.svelte"

export default {
  "/":Panel,
  // The catch-all route must always be last
  "*": ErrorCode404,
}
