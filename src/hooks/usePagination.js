import { useRef, useState } from "react";

export const usePagination = (itemsPerPage, pageCount, pageTotal, setItemOffset) => {
    const [currentPage, setCurrentPage] = useState(0);
    //const scrollContainerRef = useRef();

    console.log(currentPage)

    console.log(itemsPerPage)

    console.log(pageTotal, pageCount)
  
    function handlePageClick(index) {
      console.log("Page clicked:", index + 1);
      const newOffset = (index * itemsPerPage) % pageTotal;
      setItemOffset(newOffset);
      let newPage = index;
      if (pageCount === -1 && newPage > 0) {
        newPage = 0;
      }
      setCurrentPage(newPage);
     // scrollContainerRef.current.scrollTo(0, 0);
    }
  
    return {
      currentPage,
      handlePageClick,
      setCurrentPage
     // scrollContainerRef,
    };
  };


/*import { useState, useRef, useEffect } from "react";

const usePagination = (itemsPerPage, pageCount, pagetotal, setItemOffset) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [chickeven, setChickeven] = useState(0);
  const scrollContainerRef = useRef();

  function handlePageClick(index) {
    console.log("Page clicked:", index + 1);
    const newOffset = (index * itemsPerPage) % pagetotal;
    setItemOffset(newOffset);
    let newPage = index;
    if (pageCount === -1 && newPage > 0) {
      newPage = 0;
    }
    setCurrentPage(newPage);
    scrollContainerRef.current.scrollTo(0, 0);
  }

  useEffect(() => {
    const effect = () => {
      setChickeven(Math.ceil(currentPage * itemsPerPage));

      if (chickeven === pagetotal && pagetotal !== 0) {
        setItemOffset((prevOffset) => prevOffset - itemsPerPage);
        setCurrentPage((prevPage) => prevPage - 1);
        /*fetchworkflow();
        fetchcountwflist();
        setChickeven(0);
      }
    };

    effect();
  }, [currentPage, itemsPerPage, chickeven, pagetotal, setItemOffset]);

  return {
    currentPage,
    handlePageClick,
    scrollContainerRef,
  };
};

export default usePagination;*/

  
  