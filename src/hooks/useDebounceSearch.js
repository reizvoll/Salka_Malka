import { useState, useEffect, useRef } from "react";

const useDebounceSearch = (keywordState) => {
    const [debouncedKeyword, setDebouncedKeyword] = useState('');
    const debouncedTimer = useRef(null); //이번 렌더링에 만든 타이머 기억
    
    useEffect(() => {
        clearTimeout(debouncedTimer.current); //직전 렌더링때 만든 타이머 삭제
        debouncedTimer.current = setTimeout(() => { setDebouncedKeyword(keywordState); }, 300);
    }, [keywordState]);

    return debouncedKeyword;
}

export default useDebounceSearch