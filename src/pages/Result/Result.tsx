import { useContext, useLayoutEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

/** Models */
import { ResultModel } from "@/models";

/** FontAwesome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

/** Contenx */
import { ThemaContext } from "@/contexts/ThemaContext/ThemaContext";

/** Components */
import Layout from "@/components/Layout/Layout";

/** Thema */
import FlightListingThema from "../FlightListing/FlightListingThema";

/** Styles */
import s from "./Result.module.scss";

const Result = () => {
  const [result, setResult] = useState<ResultModel>();
  const { changeThema } = useContext(ThemaContext);
  const navigate = useNavigate();

  const checkLocalStorage = () => {
    try {
      const resultItem = localStorage.getItem("result");
      if (resultItem) {
        const result = JSON.parse(resultItem);
        setResult(result);
        localStorage.removeItem("result");
      }
    } catch (e) {
      setResult({ success: false });
    }
  };

  const onClickReturn = () => {
    navigate({
      pathname: "/",
    });
  };

  useLayoutEffect(() => {
    checkLocalStorage();
    changeThema(FlightListingThema);
  }, []);


  return (
    <Layout>
      <div className={s.container}>
        <div className={s.header}>
          {
            <FontAwesomeIcon
              className={`${result?.success ? s.successIcon : s.errorIcon}`}
              icon={result?.success ? faCircleCheck : faCircleXmark}
              size="3x"
            />
          }
          <div className={s.description}>
          {result?.success
            ? "Kabin seçiminiz tamamlandı."
            : "Kabin seçiminiz tamamlanamadı."}
            </div>
        </div>
        <div className={s.footer}>
          {result?.success ? (
            <>
              <div className={s.totalPrice}>Toplam tutar</div>
              <div className={s.amount}>
                {result.price?.currency} {result.price?.amount}
              </div>
            </>
          ) : (
            <div onClick={onClickReturn} className={s.error}>Başa Dön</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Result;
