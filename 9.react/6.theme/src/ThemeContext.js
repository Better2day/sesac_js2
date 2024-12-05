import { createContext, useContext, useState } from 'react';

// 빈 공간(Context) 선언
const ThemeContext = createContext();
// Provider가 정보를 제공하는 제공자
// 이 Provider가 제공한 내용을 Consumer가 가져가서 쓸 수 있게 해준다.

const ThemeSelector = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        // 이전 테마 상태를 가져와서 반전
        setIsDarkMode((prevMode) => !prevMode);
    };

    // 위의 정보를 컨텍스트에 담기
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
            {/* 내가(ThemeContext) 감싼 하위 child는 내 Context에 접근 가능 */}
        </ThemeContext.Provider>
    );
}

// Custom Hook: 내가 직접 훅을 생성
const useTheme = () => useContext(ThemeContext);


// export default ThemeContext;
export { ThemeSelector, useTheme };
