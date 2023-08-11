import { Libraries } from "@react-google-maps/api";
import { firebaseConfig } from "./firebase/FirebaseConfig";

export const mapLibs: Libraries = ["places", "drawing"]
export const DEFAULT_ZOOM = 10
export const DEFAULT_CENTER = { lat: 35, lng: 27 }

export { firebaseConfig }