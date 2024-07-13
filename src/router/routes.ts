import { RouteRecordRaw } from 'vue-router';
import { h } from "vue";

const baseComponent = {
  render() {
    return h("div", { innerHTML: 'null' });
  }
};

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    meta: {
      pageTitle: "monmusu-tag"
    },
    component: () => import('@/views/home')
  },
  {
    name: 'unit',
    path: '/unit/:id',
    meta: {
      scroll: true,
      pageTitle: "unit"
    },
    component: () => import('@/views/unit1')
  },
  {
    name: 'unit list',
    path: '/unitList',
    meta: {
      isKeep: true,
      pageTitle: "unitList"
    },
    component: () => import('@/views/unitList')
  },
  {
    name: 'search',
    path: '/search',
    meta: {
      isKeep: true,
      pageTitle: "monmusu-tag - search"
    },
    component: () => import('@/views/search1')
  },
  {
    name: 'gallery',
    path: '/gallery',
    meta: {
      pageTitle: "gallery"
    },
    component: () => import('@/views/gallery')
  },

  {
    name: 'quest cat',
    path: '/questCategory',
    meta: {
      pageTitle: "monmusu-tag - questCategory"
    },
    component: () => import('@/views/questCategory')
  },
  {
    name: 'quest',
    path: '/quest/:id',
    meta: {
      noScroll: true,
      pageTitle: "quest"
    },
    component: () => import('@/views/quest')
  },
  { // 
    name: 'story',
    path: '/story/:id',
    meta: {
      pageTitle: "story"
    },
    component: baseComponent
  },
  {
    name: 'attach',
    path: '/attach',
    meta: {
      pageTitle: "monmusu-tag - attach"
    },
    component: () => import("@/views/attach1")
  },
  {
    name: 'ATS',
    path: '/aboutThisSite',
    meta: {
      pageTitle: "monmusu-tag - aboutThisSite"
    },
    component: () => import('@/views/aboutThisSite')
  }
];


export default routes;