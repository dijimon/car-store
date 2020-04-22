import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

//Pages
import Catalogue from '@/pages/catalogue';
import CarModel from '@/pages/carModel';
import Checkout from '@/pages/Checkout';
import NotFound from '@/pages/NotFound';

//Styless
import Styles from './styles.css';

class Application extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={Styles.container}>
                <Switch>
                    <Route exact path="/" component={Catalogue} />
                    <Route exact path="/cars/model/:id" component={CarModel} />
                    <Route exact path="/checkout" component={Checkout} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default Application;
