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
import {Link} from 'react-router-dom';

export default () => (
    <header className="universal-search-header">
        <div className="container">
            <Link className="navbar-brand universal-search-header__container" to="/">
                <img src="/images/logo-white.png" className="logo universal-search-header__logo" alt="Logo"/>
                <span className="usb-logo universal-search-header__title">Haystack</span>
            </Link>
            <div className="pull-right usb-legacy-button">
                <Link to="/legacy" className="btn-sm universal-search-header__view-switch"><span className="ti-exchange-vertical"/> Switch To Legacy Haystack View</Link>
            </div>
        </div>
    </header>
);
