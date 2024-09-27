
import Count from './Count'
import Doughnutchat from './Doughnutchat'

const Totalbalance = ({
    accounts = [], totalBanks, totalCurrentBalance
}: TotlaBalanceBoxProps) => {
    return (
        <section className='total-balance'>
            <div className='total-balance-chart'>

<Doughnutchat accounts={accounts}/>
            </div>
            <div className='flex flex-col gap-6'>
                <h2 className='header-2'>
                    Bank Accounts:{totalBanks}
                </h2>
                <div className='flex flex-col gap-2'>
                    <p className='total-balance-label'>
                        total Current Balance
                    </p>
                    <div className='flex-center total-balance-amount gap-2'>
                        <Count
                            amount={totalCurrentBalance}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Totalbalance
