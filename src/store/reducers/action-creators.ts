import { AuthActionCreators } from "./auth/action-creators";
import { EventActionCreators } from "./event/action-creators";

// экспорт всех actions-creators
export const allActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
}