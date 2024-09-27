'use client';
import CountUp from 'react-countup'
const Count = ({ amount }: { amount: number }) => {
    return (
        <div className='w-full'>
            <CountUp 
            separator=" "
                decimals={2}
                duration={2}
                prefix="$ "
                end={amount} />

        </div>
    )
}

export default Count
