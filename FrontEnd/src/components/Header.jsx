import React from 'react'

const Header = () => {
    return (
        <header className='border-b-[1px] shadow'>
            <div className='flex gap-x-96 items-center justify-around'>
                <img src="Book a ride.png" alt="Book a ride logo" width={120} height={1200} />
                
                <ul className='hidden md:flex gap-7'>
                    <li className='hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-all'>Home</li>
                    <li className='hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-all'>History</li>
                    <li className='hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-all'>Help</li>
                </ul>
            </div>

        </header>
    )
}

export default Header
