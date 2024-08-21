import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import userReducer from "./userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const userPersistConfig = {
  key: "userRoot",
  storage,
  blacklist: [
    "isEmailVerify",
    "User_Verification",
    // "agePopUpShow",
    "loginPopUpShow",
    "forgetPasswordPopUpShow",
    "registerPopUpShow",
    "verifyAccountPopUpShow",
  ],
};
const cartPersistConfig = {
  key: "cartRoot",
  storage,
  blacklist: ["coupanCodeValue", "bannerLocation"],
};
const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  user: persistReducer(userPersistConfig, userReducer),
  wishlist: wishlistReducer,
});
export default rootReducer;
