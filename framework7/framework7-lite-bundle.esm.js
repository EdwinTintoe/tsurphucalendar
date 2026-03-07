/**
 * Framework7 8.3.4
 * Full featured mobile HTML framework for building iOS & Android apps
 * https://framework7.io/
 *
 * Copyright 2014-2025 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: January 17, 2025
 */

import $ from './shared/dom7.js';
import Framework7 from './components/app/app-class.js';
import * as utils from './shared/utils.js';
import { getSupport } from './shared/get-support.js';
import { getDevice } from './shared/get-device.js';
import DeviceModule from './modules/device/device.js';
import SupportModule from './modules/support/support.js';
import UtilsModule from './modules/utils/utils.js';
import ResizeModule from './modules/resize/resize.js';
import TouchModule from './modules/touch/touch.js';
import ClicksModule from './modules/clicks/clicks.js';
import RouterModule from './modules/router/router.js';
import HistoryModule from './modules/history/history.js';
import ServiceWorkerModule from './modules/service-worker/service-worker.js';
import StoreModule, { createStore } from './modules/store/store.js';
import Statusbar from './components/statusbar/statusbar.js';
import View from './components/view/view.js';
import Navbar from './components/navbar/navbar.js';
import Toolbar from './components/toolbar/toolbar.js';
import Subnavbar from './components/subnavbar/subnavbar.js';
import TouchRipple from './components/touch-ripple/touch-ripple.js';
import Modal from './components/modal/modal.js';
import Popup from './components/popup/popup.js';
import Popover from './components/popover/popover.js';
import Sheet from './components/sheet/sheet.js';
import Toast from './components/toast/toast.js';
import Preloader from './components/preloader/preloader.js';
import Accordion from './components/accordion/accordion.js';
import Panel from './components/panel/panel.js';
import Grid from './components/grid/grid.js';
import Fab from './components/fab/fab.js';
import Swiper from './components/swiper/swiper.js';
import Notification from './components/notification/notification.js';
import Typography from './components/typography/typography.js';
Framework7.use([DeviceModule, SupportModule, UtilsModule, ResizeModule, TouchModule, ClicksModule, RouterModule, HistoryModule, ServiceWorkerModule, StoreModule, Statusbar, View, Navbar, Toolbar, Subnavbar, TouchRipple, Modal, Popup, Popover, Sheet, Toast, Preloader, Accordion, Panel, Grid, Fab, Swiper, Notification, Typography]);
export { $ as Dom7, utils, getDevice, getSupport, createStore };
export default Framework7;
