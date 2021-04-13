import { SEARCH_USER, GET_USER_INFO, FETCH_USER_INFO_BY_ID ,GET_USER_LIST} from '../actions/actionTypes';


const initialState = {
    userInfo: {},
    searchResult: [],
    userList:[],
    profileUser: {},
    loading: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_USER:
            return {
                ...state,
                searchResult: action.payload
            };
        case GET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
                loading: false
            };
            case GET_USER_LIST:
                return {
                    ...state,
                    userList: action.payload,
                    loading: false
                };
        case FETCH_USER_INFO_BY_ID:
            return {
                ...state,
                profileUser: action.payload
            }
        default:
            return state;

    }
}