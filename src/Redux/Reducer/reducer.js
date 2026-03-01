import initialState from "./initialState";
import LOADER from '../Action/ActionType'
export default reducer = (state = initialState, action) => {

    console.log('Actions : ', action)

    switch (action.type) {
        case LOADER:
            return {
                ...state,
                loading: action.loading
            }
            default :
            return{
                ...state,
            }
        }
        


}