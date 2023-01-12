const Ratings = (rate: number) => {
  return (
    <>
      <span>
        <i
          style={{ color: "#f68872" }}
          className={
            rate >= 1
              ? "fas fa-star"
              : rate >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: "#f68872" }}
          className={
            rate >= 2
              ? "fas fa-star"
              : rate >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: "#f68872" }}
          className={
            rate >= 3
              ? "fas fa-star"
              : rate >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: "#f68872" }}
          className={
            rate >= 4
              ? "fas fa-star"
              : rate >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color: "#f68872", fill: "red" }}
          className={
            rate >= 5
              ? "fas fa-star"
              : rate >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
    </>
  );
};

export default Ratings;
