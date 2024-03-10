import { useContext } from 'react';

/** Context */
import { ThemaContext } from '@/contexts/ThemaContext/ThemaContext';

/** Styles */
import s from './Header.module.scss';

const Header = () => {
    const { thema } = useContext(ThemaContext);

    return (
      <header className={s.header} style={{ color: thema.header.color }}>
        <span>
          <b>turkishairlines.com</b>
        </span>
        <span>
          <span className={s.lowerFS}>search</span>
          <b>Flight Challange</b>
        </span>
        <div
          className={s.after}
          style={{ backgroundColor: thema.header.color }}
        ></div>
      </header>
    );
};

export default Header;