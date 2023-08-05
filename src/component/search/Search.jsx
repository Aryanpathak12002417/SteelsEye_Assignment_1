const Search = ({ searchText, setSearchText,mockArray,setSearchResult,inputRef,setShowResults}) => {

  function handleChange(e){
    const inputText=e.target.value
    setShowResults(true)
    setSearchText(e.target.value)
    const result=mockArray.filter((fruit)=>{
      return searchText!=='' && fruit.toLowerCase().includes(inputText.toLowerCase())
    })
  }

  return <input ref={inputRef} type="text" value={searchText} onChange={handleChange} />
}

export default Search
