import React from 'react';
import Headerbox from '../../components/ui/Headerbox';
import Totalbalance from '../../components/Totalbalance';
import Rightsidebar from '../../components/Rightsidebar';
import { getLoggedInUser } from '../../lib/actions/user.actions';

const Home = async () => {
  const loggedin = await getLoggedInUser();
console.log(loggedin);

  if (!loggedin) {
    return (
      <section className="home">
        <div className="home-content">
          <header className="home-header">
            <Headerbox
              type="greeting"
              title="Welcome"
              user="Guest"
              subtext="Please log in to access your account and transactions."
            />
          </header>
        </div>
      </section>
    );
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Headerbox
            type="greeting"
            title="Welcome"
            user={loggedin.name}
            subtext="Access and manage your account and transactions carefully."
          />
          <Totalbalance
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={12}
          />
        </header>
      </div>
      <Rightsidebar
        user={loggedin}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 500 }]}
      />
    </section>
  );
};


export default Home;
