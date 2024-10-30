// components/PhoneInput.js
import Inputmask from 'inputmask';
import { useEffect, useRef } from 'react';

const PhoneInput = () => {
    const inputRef = useRef(null);

    useEffect(() => {
        const im = new Inputmask('(99) 99999-9999');
        im.mask(inputRef.current);
    }, []);

    return (
        <input
            type="text"
            ref={inputRef}
            className={`appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            placeholder="(00) 00000-0000"
        />
    );
};

export default PhoneInput;