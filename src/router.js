import { createRouter, createWebHistory } from "vue-router";
import trangchu from "./components/trangchu.vue";
import sanpham from "./components/sanpham.vue";
import chitietsanpham from "./components/chititesanpham.vue";
import baiviet from "./components/baiviet.vue";
import giohang from "./components/giohang.vue";
import admin from "./components/admin.vue";
import quanlysanpham from "./components/quanlysanpham.vue";
import quanlydanhmuc from "./components/quanlydanhmuc.vue";
import quanlyuser from "./components/quanlyuser.vue";
import sua_sp from "./components/sanpham_sua.vue";
import sua_us from "./components/user_sua.vue";
import sua_dm from "./components/danhmuc_sua.vue";

const routes = [
  { path: '/', component: trangchu },
  { path: '/sanpham', component: sanpham },
  { path: '/chitietsanpham/:id', component: chitietsanpham},
  { path: '/baiviet', component: baiviet },
  { path: '/giohang', component: giohang },
  { path: '/admin', component: admin },
  { path: '/admin/quanlysanpham', component: quanlysanpham },
  { path: '/admin/quanlysanpham/sua/:id', component: sua_sp },
  { path: '/admin/quanlydanhmuc', component: quanlydanhmuc },
  { path: '/admin/quanlyuser', component: quanlyuser },
  { path: '/admin/quanlyuser/sua/:id', component: sua_us },
  { path: '/admin/quanlydanhmuc/sua/:id', component: sua_dm },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; 
    } else {
      return { top: 0 };
    }
  },
});

export default router;
