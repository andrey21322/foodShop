import React from 'react';
import './pages.css'

function Coupons({ coupons, addTextToModal }) {
    const handleCopyText = (coupon) => {
        navigator.clipboard.writeText(coupon)
        addTextToModal('Coupon copied')
    }
    return (
        <div className='coupons-wrapper'>
        {coupons.lenght === 0 ? "No coupons" : coupons.map( coupon => (
            <div key={coupon.name} className='coupon'>
                {coupon.name}
                <button onClick={() => handleCopyText(coupon.name)}>Copy</button>
            </div>
        ))}
        </div>
    );
};

export default Coupons;
