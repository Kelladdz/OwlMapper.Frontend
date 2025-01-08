import { useScheduleCreator } from '../../../hooks/useScheduleCreator';
import { useVariantsAddedToScheduleList } from '../../../hooks/useVariantsAddedToScheduleList';

import Crown from '../../../assets/crown.svg';
import MinusSign from '../../../assets/minusSign.svg';

import styles from './VariantsAddedToScheduleList.module.css';
import AdminIconButton from '../../Buttons/AdminIconButton/AdminIconButton';
import VariantSymbolInput from '../../Inputs/VariantSymbolInput/VariantSymbolInput';
import { useContext } from 'react';
import CreatorContext from '../../../context/creator';

export default function VariantsAddedToScheduleList() {
    const {variantsWithSymbols, variantRemoveHandle} = useVariantsAddedToScheduleList();
    const {variantsOnSchedule} = useContext(CreatorContext);
    
    if (!variantsWithSymbols) {
        return <div>Loading...</div>
    } else return (
        <div className={styles.container}>
            <div className={styles.list}>
                {variantsWithSymbols && variantsWithSymbols.map((variant, index) => {
                    // const matchedVariant = variantsWithSymbols.find(v => v.variantId === variant.variantId);
                    // const symbol = matchedVariant ? matchedVariant.symbol : null;
                    return <div key={variant.variantId} className={styles.variant}>
                        <span className={styles.name}>{variant.route}</span>
                        <div className={styles['r-side']}>
                            {index === 0 ? 
                            <img className={styles.crown} src={Crown} /> : 
                            <div className={styles['variant-symbol']}>{variant.symbol}</div>}
                            <AdminIconButton style={{height: '1.5rem', width: '1.5rem'}} icon={MinusSign} onClick={() => variantRemoveHandle(variant)} alt="delete-button" />
                        </div>
                    </div>
                    })
            }
            </div>
        </div>
    )
}
