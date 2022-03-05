import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store/index';

// делаем обычный useSelector -- типизированным
// также используем здесь RootState
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;