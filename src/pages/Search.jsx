import React, { useEffect, useState } from "react";
import styled from "styled-components";
import searchPosts from "../api/SearchPostApi";
import useDebounceSearch from "../hooks/useDebounceSearch";
import Searchbar from "../components/search/Searchbar";
import SearchResults from "../components/search/SearchResults";

const SearchPageMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  min-width: 800px;
  max-height: 100vh;
`;

const Search = () => {
  const [error, setError] = useState(null);
  const [searchedData, setsearchedData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [ordering, setOrdering] = useState("newToOld");
  const debouncedKeyword = useDebounceSearch(searchKeyword);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts =
          debouncedKeyword !== ""
            ? await searchPosts(debouncedKeyword, ordering)
            : null; // 비동기 데이터 호출
        setsearchedData(posts); // 호출된 데이터 저장
      } catch (err) {
        setError(err.message); // 에러 발생 시 에러 메시지 저장
      }
    };
    fetchData();
  }, [debouncedKeyword, ordering]);

  const handleKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  const handleOderingChange = (e) => {
    setOrdering(e.target.value);
  };

  if (error) {
    window.alert(`에러가 일어났습니다 : ${error}`);
  } // 에러 발생 시 에러 메시지 표시

  return (
    <SearchPageMain>
      <Searchbar
        searchKeyword={searchKeyword}
        handleKeywordChange={handleKeywordChange}
        handleOderingChange={handleOderingChange}
      />
      <SearchResults searchedData={searchedData} />
    </SearchPageMain>
  );
};

export default Search;
