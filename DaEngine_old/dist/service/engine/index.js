import { appHolder, getApp } from './initApp';
import { pageHolder, getCurrentPages } from './initPage';
window.App = appHolder;
window.getApp = getApp;
window.Page = pageHolder;
window.getCurrentPages = getCurrentPages;
