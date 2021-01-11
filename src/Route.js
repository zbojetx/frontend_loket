import React from 'react';
import { Router, Route, browserHistory ,IndexRoute } from 'react-router';
import Master from './Master';
import Dashboard from './component/Dashboard';
import PermohonanFinish from './component/PermohonanFinish';
import PermohonanNew from './component/PermohonanNew';
import PermohonanProccess from './component/PermohonanProccess';
import PraBerkasNew from './component/PraBerkasNew';
import PraBerkasProccess from './component/PraBerkasProccess';
import PraBerkasFinish from './component/PraBerkasFisih';
import Login from "./component/auth/Login";

function RouteMain() {
    return (
        <Router history={browserHistory}>
            <Route path='/' component={Login} />
            <Route component={Master}>
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/praberkasnew' component={PraBerkasNew} />
                <Route path='/praberkasproccess' component={PraBerkasProccess} />
                <Route path='/praberkasfinish' component={PraBerkasFinish} />
                <Route path='/permohonannew' component={PermohonanNew} />
                <Route path='/permohonanproccess' component={PermohonanProccess} />
                <Route path='/permohonanfinish' component={PermohonanFinish} />
            </Route>
        </Router>
    )
}

export default RouteMain