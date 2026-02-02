import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Table = ({ product }) => {
    // 1. UPDATED: Changed 'jumium' to 'jumia' to match Django API field
    const platforms = ['jumia', 'amazon', 'kilimall', 'shopify'];
    const [sortBy, setSortBy] = useState('price');

    // Safety check in case product is loading
    if (!product) return <div>Loading data...</div>;

    const platformData = platforms.map((platform) => {
        // 2. UPDATED: Direct access to nested Django objects
        const pro = product[platform];
        
        // Skip if this vendor data is missing
        if (!pro) return null;

        const { price, shipping_cost, days_to_ship, review, product_location } = pro;

        // 3. UPDATED: Parse strings to floats to ensure math works correctly
        const numPrice = parseFloat(price);
        const numShipping = parseFloat(shipping_cost);
        const numDays = parseFloat(days_to_ship);
        const numReview = parseFloat(review);

        // Perform calculations
        const costBenefit = ((1 / numPrice) + (1 / numShipping) * 100).toFixed(2);
        const marginalBenefit = (((1 / numDays) - (1 / numReview)) * 100).toFixed(2);

        return {
            name: platform,
            price: numPrice,
            ShippingCost: numShipping,
            daysToShip: numDays,
            review: numReview,
            productLocation: product_location,
            costBenefit: costBenefit,
            marginalBenefit: marginalBenefit
        };
    }).filter(Boolean); // Filter out any nulls

    // Sort the data based on user selection
    const sortedData = [...platformData].sort((a, b) => b[sortBy] - a[sortBy]);

    return (
        <div>
            <div>
                {/* Recommendation Header */}
                {sortedData.length > 0 && (
                    <h3 className='uppercase text-3xl font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-lg shadow-lg animate-pulse'>
                        SHOPCRAWL RECOMMENDS {sortedData[0].name}
                    </h3>
                )}
            </div>

            <p className='text-white p-4 rounded-lg hover:text-red-500 transition-colors duration-300'>
                FILTER RANKINGS BELOW:
            </p>

            <div className='p-4'>
                <select 
                    onChange={e => setSortBy(e.target.value)}
                    className='mb-4 px-2 py-1 border rounded'
                    value={sortBy}
                >
                    <option value="price">Price</option>
                    <option value="costBenefit">Cost Benefit</option>
                    {/* Fixed casing for value to match object key */}
                    <option value="marginalBenefit">Marginal Benefit</option>
                </select>

                <table className='w-full border-collapse'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='p-2'>RANKINGS</th>
                            <th className='p-2'>PRICE (KSH)</th>
                            <th className='p-2'>SHIPPING COST(KSH)</th>
                            <th className='p-2'>SHIPPING DAYS</th>
                            <th className='p-2'>STAR RATING</th>
                            <th className='p-2'>SHIPPED FROM</th>
                            <th className='p-2'>COST BENEFIT</th>
                            <th className='p-2'>MARGINAL BENEFIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((platform, index) => (
                            <tr key={index} className='relative border-t bg-white hover:bg-gray-50'>
                                <td className='p-2'>
                                    <Link to={`https://${platform.name}.com`}>
                                        <span className='uppercase text-red-500 font-bold underline group relative'>
                                            {platform.name}
                                            <span className='absolute left-0 bottom-full mb-1 w-max bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                                                click {platform.name}'s shopping site
                                            </span>
                                        </span>
                                    </Link>
                                </td>
                                <td className='p-2'>{platform.price}</td>
                                <td className='p-2'>{platform.ShippingCost}</td>
                                <td className='p-2'>{platform.daysToShip}</td>
                                <td className='p-2'>{platform.review}</td>
                                <td className='p-2'>{platform.productLocation}</td>
                                <td className='p-2'>{platform.costBenefit}%</td>
                                <td className='p-2'>{platform.marginalBenefit}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;