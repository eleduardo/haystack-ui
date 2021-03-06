/*
 * Copyright 2018 Expedia Group
 *
 *       Licensed under the Apache License, Version 2.0 (the "License");
 *       you may not use this file except in compliance with the License.
 *       You may obtain a copy of the License at
 *
 *           http://www.apache.org/licenses/LICENSE-2.0
 *
 *       Unless required by applicable law or agreed to in writing, software
 *       distributed under the License is distributed on an "AS IS" BASIS,
 *       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *       See the License for the specific language governing permissions and
 *       limitations under the License.
 *
 */

import React, {Component} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import HomeSearchBox from './legacyHomeSearchBox';
import serviceStore from '../../stores/serviceStore';
import servicePerfStore from './stores/servicePerfStore';
import './legacyHome.less';

const enableServicePerformance = (window.haystackUiConfig.enableServicePerformance);
const enableServiceGraph = (window.haystackUiConfig.subsystems.includes('serviceGraph'));

@observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        serviceStore.fetchServices();
        const until = Date.now();
        const from = until - (15 * 60 * 1000);
        servicePerfStore.fetchServicePerf('5-min', from, until);
        this.state = {};
    }

    componentDidMount() {
        import(/* webpackChunkName: "serviceGraph", webpackPreload: true */ '../serviceGraph/serviceGraph')
        .then((mod) => {
            this.setState({ServiceGraph: mod.default});
        });

        import(/* webpackChunkName: "servicePerformance", webpackPreload: true */  './servicePerformance')
        .then((mod) => {
            this.setState({ServicePerformance: mod.default});
        });
    }

    render() {
        const {
            ServiceGraph,
            ServicePerformance
        } = this.state;

        return (
            <article className="home-panel">
                <HomeSearchBox history={this.props.history} services={serviceStore.services}/>
                {enableServiceGraph && ServiceGraph && <ServiceGraph history={this.props.history}/>}
                {enableServicePerformance && ServicePerformance && <ServicePerformance servicePerfStore={servicePerfStore} servicePerfStats={servicePerfStore.servicePerfStats} history={this.props.history} />}
            </article>
        );
    }
}

Home.propTypes = {
    history: PropTypes.object.isRequired
};
