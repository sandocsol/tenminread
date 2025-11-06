/**
 * localStorage 헬퍼 함수

 * getStorage(key, defaultValue)
localStorage에서 값을 읽어옴
JSON.parse 자동 처리
값이 없으면 기본값 반환
에러 발생 시 기본값 반환

 * setStorage(key, value)
localStorage에 값을 저장
JSON.stringify 자동 처리
객체, 배열 등도 저장 가능

 * removeStorage(key)
localStorage에서 값 삭제
 */

/**
 * localStorage에서 값을 읽어옵니다.
 * @param {string} key - 저장된 키
 * @param {any} defaultValue - 기본값
 * @returns {any} 저장된 값 또는 기본값
 */
export const getStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from localStorage for key ${key}:`, error);
    return defaultValue;
  }
};

/**
 * localStorage에 값을 저장합니다.
 * @param {string} key - 저장할 키
 * @param {any} value - 저장할 값
 */
export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage for key ${key}:`, error);
  }
};

/**
 * localStorage에서 값을 삭제합니다.
 * @param {string} key - 삭제할 키
 */
export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage for key ${key}:`, error);
  }
};

