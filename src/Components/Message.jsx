import React from 'react';

const Message = ({ user, message, classs }) => {
    if (user) {
        return (
            <div className={`p-[1vmax] m-[1vmax] rounded-[1vw] inline-block clear-both text-[1.0vmax] font-sans ${classs} float-left bg-gray-200 text-left`}>
                {`${message}`}
            </div>
        );
    } else {
        return (
            <div className={`p-[1vmax] m-[1vmax] rounded-[1vw] inline-block clear-both text-[1.0vmax] font-sans ${classs} float-right bg-gradient-to-r from-clr1 to-clr3 text-white text-right`}>
                {`${message}`}
            </div>
        );
    }
};

export default Message;
