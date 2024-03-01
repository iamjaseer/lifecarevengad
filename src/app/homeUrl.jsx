const IS_SERVER = typeof window === "undefined"
import { frontendUrl  } from "../app/utils/variables";

export default function getURL(path) {
const baseURL = IS_SERVER
  ? frontendUrl
  : window.location.origin
return new URL(path, baseURL).toString()
}