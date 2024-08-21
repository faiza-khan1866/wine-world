import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { fetchHeaderSearchData } from "../http/apiService";
import DataLoader from "../components/Loader/DataLoader";
import { IoMdCloseCircle } from "react-icons/io";
const SearchBar = (props) => {
  const [query, setQuery] = useState("");
  const [queryList, setQueryList] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  const inputQuerySearch = (e) => {
    const { value } = e.target;
    setQuery(value);
  };

  const getQueryData = async () => {
    let formdata = {
      query: query,
    };
    try {
      setIsLoading(true); // Show the loader
      const { data } = await fetchHeaderSearchData(formdata);
      setQueryList(data);
      setShowList(true);
    } catch (error) {
      console.error("Error fetching Data:", error);
    } finally {
      setIsLoading(false); // Hide the loader
    }
  };

  useEffect(() => {
    if (query.length > 3) {
      getQueryData();
    }
    return () => {
      setShowList(false);
    };
  }, [query]);

  return (
    <div className="search-content">
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="text"
            placeholder={"Search ..."}
            onChange={inputQuerySearch}
            value={query}
          />
          <button type="button" className="button-search">
            {isLoading ? (
              <DataLoader size={24} pd={true} />
            ) : (
              <>
                {query ? (
                  <div onClick={() => setQuery("")}>
                    <IoMdCloseCircle fontSize="24px" />
                  </div>
                ) : (
                  <FaSearch fontSize="24px" />
                )}
              </>
            )}
          </button>
        </div>
        {isLoading ? (
          <>{/* // <DataLoader /> */}</>
        ) : (
          query !== "" &&
          query?.length >= 3 && (
            <Container fluid className="serach_suggestions">
              <Row>
                <Col>
                  <h3>Products</h3>
                  {queryList?.products?.length > 0 ? (
                    queryList?.products?.map((x, i) => (
                      <p key={i}>
                        <Link
                          to={`/product/${x?.route}`}
                          dangerouslySetInnerHTML={{ __html: x?.name }}
                          onClick={() => {
                            props?.setSearch(false);
                            props?.setSearchMobile(false);
                          }}
                        ></Link>
                      </p>
                    ))
                  ) : (
                    <p>
                      <small>No Product Found !!!</small>
                    </p>
                  )}
                </Col>
                {/* <Col sm={6}>
                  <h3>Blogs</h3>
                  {queryList?.blogs?.length > 0 ? (
                    queryList?.blogs?.map((x, i) => (
                      <p key={i}>
                        <Link
                          to={`/blog/${x?.route}`}
                          onClick={() => {
                            props?.setSearch(false);
                            props?.setSearchMobile(false);
                          }}
                        >
                          {x?.title}
                        </Link>
                      </p>
                    ))
                  ) : (
                    <p>
                      <small>No Blog Found !!!</small>
                    </p>
                  )}
                </Col> */}
              </Row>
            </Container>
          )
        )}
      </form>
    </div>
  );
};

export default SearchBar;
