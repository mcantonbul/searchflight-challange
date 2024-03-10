import { useContext } from 'react';

/** Models */
import { Price, Subcategory } from '@/models';

/** Contexts */
import { FlightContext } from '@/contexts/FlightContext/FlightContext';

/** Components */
import FlightPackage from './FlightPackage/FlightPackage';

/** Styles */
import s from './FlightPackages.module.scss';

interface FlightPackagesProps {
    subcategories: Subcategory[]
    right:string
}

const FlightPackages = ({ subcategories, right }: FlightPackagesProps) => {
  const { promotionOpt, setSelectedPackage } = useContext(FlightContext);

  const getPackageName = (brandCode: string) => {
    const brandcodeMap = new Map([
      ["ecoFly", "Eco Fly"],
      ["extraFly", "Extra Fly"],
      ["primeFly", "Prime Fly"],
    ]);

    return brandcodeMap.get(brandCode) || "";
  };

  const getManipulatedPrice = (subcategory: Subcategory): Price => {
    if (promotionOpt.discounts.length > 0) {
      const discountValue = promotionOpt.discounts.find(
        (s) => s.brandCode === subcategory.brandCode
      );

      if (discountValue) {
        const discountedPrice =
          (subcategory.price.amount * discountValue.discountRate) / 100;
        return {
          currency: subcategory.price.currency,
          amount: discountedPrice,
        };
      }
    }
    return subcategory.price;
  };

  return (
    <div className={s.container}>
      {subcategories.map((subcategory, index) => (
        <FlightPackage
          key={index}
          disabled={promotionOpt.unavailableBrands.some(
            (s) => s === subcategory.brandCode
          )}
          onClickPackage={() => setSelectedPackage({
            brandCode: subcategory.brandCode,
          })}
          price={getManipulatedPrice(subcategory)}
          rights={subcategory.rights}
          title={getPackageName(subcategory.brandCode)}
        />
      ))}
      <div className={s.after} style={{ right }} />
    </div>
  );
};

export default FlightPackages;