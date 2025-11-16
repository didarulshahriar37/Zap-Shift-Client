import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL } = review;
    return (
        <div className="card shadow-md bg-white rounded-2xl p-6 max-w-sm border border-gray-100">
            <div className="text-primary text-3xl mb-3">
                <FaQuoteLeft />
            </div>

            <p className=" leading-relaxed">
                {testimonial}
            </p>

            {/* dashed line */}
            <div className="border-t border-dashed border-primary my-5"></div>

            {/* bottom section */}
            <div className="flex items-center gap-3">
                {/* circle avatar */}
                <div className="w-12 h-12 rounded-full bg-primary">
                    <img src={user_photoURL} alt="" />
                </div>

                <div>
                    <h3 className="font-semibold text-secondary">{userName}</h3>
                    <p className="text-gray-500 text-sm">Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;