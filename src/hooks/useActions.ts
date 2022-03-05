import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { bindActionCreators } from 'redux';
import { allActionCreators } from '../store/reducers/action-creators';
// хук написан для оптимизации процесса dispatch actions
export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators(allActionCreators, dispatch)
}