import React, { useEffect, memo } from "react";
import { Accordion } from "react-bootstrap";
import Aos from "aos";
import "aos/dist/aos.css";
import DataLoader from "../Loader/DataLoader";
import ReactPaginate from "react-paginate";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const FaqSection = ({ faqsList, isLoading, handlePageChange, pageCount }) => {
  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: "ease",
      delay: 0,
      once: true,
      duration: 800,
    });
  });
  return (
    <>
      <div className="shop-faq-sec pt-5">
        <div className="container">
          <h2 className="text-center" data-aos="fade-down">
            Frequently asked questions
          </h2>
          {isLoading ? (
            <DataLoader />
          ) : (
            <Accordion defaultActiveKey={0} flush className="py-5">
              {faqsList?.map((item, i) => (
                <Accordion.Item eventKey={i} data-aos="fade-up">
                  <Accordion.Header>{item?.question}</Accordion.Header>
                  <Accordion.Body>
                    <p dangerouslySetInnerHTML={{ __html: item?.answer }} />
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
          {faqsList?.length > 0 && (
            <>
              {window?.location?.pathname == "/faq" && (
                <div className="pagination_style pb-5">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<FaAngleDoubleRight fontSize={15} />}
                    pageCount={pageCount}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageChange}
                    previousLabel={<FaAngleDoubleLeft fontSize={15} />}
                    renderOnZeroPageCount={null}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default memo(FaqSection);
