import styled from "styled-components";

const SearchResultsOrderer = styled.select`
  border: 1px solid gray;
  border-radius: 5px;
  background-color: #7e57ce;
  color: #fff;
  outline: none;
  option {
    background-color: #fff;
    color: black;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  height: 35px;
  border: 1px solid gray;
  border-radius: 15px;
  font-size: 15px;
`;
const SearchbarWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 65%;
  margin: 20px;
  margin-top: 50px;
`;

const Searchbar = ({
    searchKeyword,
    handleKeywordChange,
    handleOderingChange,
}) => {
    return (
        <SearchbarWrapper>
            <SearchInput
                type="text"
                placeholder="검색어를 입력해주세요"
                value={searchKeyword}
                onChange={handleKeywordChange}
            />
            <SearchResultsOrderer
                name="searchingOrder"
                id="searchingOrder"
                onChange={handleOderingChange}
            >
                <option value="newToOld">최신 순서</option>
                <option value="oldToNew">오래된 순서</option>
            </SearchResultsOrderer>
        </SearchbarWrapper>
    );
};

export default Searchbar;