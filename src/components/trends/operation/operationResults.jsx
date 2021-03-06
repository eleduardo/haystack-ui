/*
 * Copyright 2018 Expedia Group
 *
 *         Licensed under the Apache License, Version 2.0 (the "License");
 *         you may not use this file except in compliance with the License.
 *         You may obtain a copy of the License at
 *
 *             http://www.apache.org/licenses/LICENSE-2.0
 *
 *         Unless required by applicable law or agreed to in writing, software
 *         distributed under the License is distributed on an "AS IS" BASIS,
 *         WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *         See the License for the specific language governing permissions and
 *         limitations under the License.
 */

import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

import Loading from '../../common/loading';
import OperationResultsTable from './operationResultsTable';
import './operationResults.less';
import Error from '../../common/error';


@observer
export default class operationResults extends React.Component {
    static propTypes = {
        operationStore: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        serviceName: PropTypes.string.isRequired,
        isUniversalSearch: PropTypes.bool.isRequired
    };

    static defaultProps = {
        isUniversalSearch: false
    };

    render() {
        return (
            <section className="operation-results">
                { this.props.isUniversalSearch ?  null : <div className="results-table-heading">Operations</div>}
                { this.props.operationStore.statsPromiseState && this.props.operationStore.statsPromiseState.case({
                    empty: () => <Loading />,
                    pending: () => <Loading />,
                    rejected: () => <Error />,
                    fulfilled: () => ((this.props.operationStore.statsPromiseState && this.props.operationStore.statsResults.length)
                        ? <OperationResultsTable
                            operationStore={this.props.operationStore}
                            location={this.props.location}
                            serviceName={this.props.serviceName}
                            isUniversalSearch={this.props.isUniversalSearch}
                        />
                        : <Error />)
                })
                }
            </section>
        );
    }
}

