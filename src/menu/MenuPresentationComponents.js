import Accounts from '../Components/Accounts/Accounts';
import Routes from '../Components/Routes/Routes';
import Markets from '../Components/Markets/Markets';
import Transactions from '../Components/Transactions/Transactions';
import Summary from '../Components/SummaryPage/Summary';
import Employees from '../Components/Employees/Employees';

const presentationComponents = (props) => {
    return [
        {
            title: 'Summary',
            component: <Summary/>
        },
        {
            title: 'Markets',
            component: <Markets/>
        },
        {
            title: 'Routes',
            component: <Routes/>
        },
        {
            title: 'Accounts',
            component: <Accounts/>
        },
        {
            title: 'Employees',
            component: <Employees />
        },
        {
            title: 'Transactions',
            component: <Transactions />
        },
    ];
};


const containerComponents = (props) => {
    return [
        {
            title: 'Activities',
            component: <Transactions />
        }
    ];
};

export {presentationComponents, containerComponents};
