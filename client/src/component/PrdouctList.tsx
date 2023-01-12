import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../api";
import { useAppDispatch } from "../redux/hooks";
import { openSnackBar } from "../redux/snackBarSlice";
import CustomError from "./CustomError";
import Loading from "./Loading";
import Pagination from "./Pagination";
import ProductListItem from "./ProductListItem";
import SnackBar from "./SnackBar";

export type ProductType = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const Container = styled.div`
  min-height: 50vh;
  padding: 8rem 0;
`;

const LoadingContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;
const ProductContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const PrdouctList = () => {
  const location = useLocation();
  const keyword = location.pathname.split("/")[2];
  const PRODUCT_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(PRODUCT_PER_PAGE);
  const [totalPage, setTotalPage] = useState(1);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getProductList = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get("/product");
        const data = res.data;
        setProducts(data);
        setProductPerPage((prev) => {
          setTotalPage(Math.ceil(data.length / PRODUCT_PER_PAGE));
          return PRODUCT_PER_PAGE;
        });
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };

    const getSearchResult = async () => {
      try {
        setLoading(true);
        const res = await publicRequest.get(`/product/search/${keyword}`);
        const data = res.data;
        setProducts(data);
        setProductPerPage(data.length);
        setTotalPage(1);
        setLoading(false);

        if (!data.length)
          dispatch(openSnackBar(`No Search Results for "${keyword}"`));
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    keyword ? getSearchResult() : getProductList();
  }, [dispatch, keyword, productPerPage]);

  return (
    <>
      <SnackBar />
      {loading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : error ? (
        <CustomError />
      ) : (
        <Container>
          <ProductContainer>
            {products
              .slice(
                (currentPage - 1) * productPerPage,
                currentPage * productPerPage
              )
              .map((product) => (
                <ProductListItem key={product._id} product={product} />
              ))}
          </ProductContainer>
          <Pagination
            current={currentPage}
            setCurrent={setCurrentPage}
            total={totalPage}
          />
        </Container>
      )}
    </>
  );
};

export default PrdouctList;
