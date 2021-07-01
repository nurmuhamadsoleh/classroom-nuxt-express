import Vue from "vue";
import currency from "~/mixins/currency";
import request from "~/mixins/request";
Vue.mixin(currency);
Vue.mixin(request);
