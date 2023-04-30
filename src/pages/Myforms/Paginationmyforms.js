import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";

function Paginationforms({
  pageCount, //ทั้งหมด
  currentPage, //ปัจจุบัน
  handlePageClick, // ฟังชั่นคลิ๊ก
}) {
  const MAX_PAGES = 5; // Maximum number of pages to display

  const startPage = Math.max(0, currentPage - Math.floor(MAX_PAGES / 2)); // Starting page number
  const endPage = Math.min(pageCount - 1, startPage + MAX_PAGES - 1); // Ending page number

  const pages = []; // Array to hold the pagination items

  if (startPage > 0) {
    pages.push(
      <Pagination.Ellipsis key="start" onClick={() => handlePageClick(startPage - 1)} />
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <Pagination.Item key={i} active={currentPage === i} onClick={() => handlePageClick(i)}>
        {i + 1}
      </Pagination.Item>
    );
  }

  if (endPage < pageCount - 1) {
    pages.push(
      <Pagination.Ellipsis key="end" onClick={() => handlePageClick(endPage + 1)} />
    );
  }

  return (
    <div>
      <div>
        <Pagination style={{margin: 0}}>
          <Pagination.First
            onClick={() => {
              if (currentPage > 0) {
                handlePageClick(0);
              }
            }}
            disabled={currentPage === 0}
          />
          <Pagination.Prev
            onClick={() => {
              if (currentPage > 0) {
                handlePageClick(currentPage - 1);
              }
            }}
            disabled={currentPage === 0}
          />
          {pages}
          <Pagination.Next
            onClick={() => {
              if (currentPage < pageCount - 1) {
                handlePageClick(currentPage + 1);
              }
            }}
            disabled={currentPage === pageCount - 1}
          />
          <Pagination.Last
            onClick={() => {
              if (currentPage < pageCount - 1) {
                handlePageClick(pageCount - 1);
              }
            }}
            disabled={currentPage === pageCount - 1}
          />
        </Pagination>
      </div>
    </div>
  );
}

export default Paginationforms;
