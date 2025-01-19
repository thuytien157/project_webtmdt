<script>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';

  export default {
    setup() {

      const route = useRoute();
      const checklink = computed(() => route.path.startsWith('/admin'));

      const check = ref(false);
      const signup_Username = ref('');
      const signup_Email = ref('');
      const signup_Password = ref('');
      const signup_ConfirmPassword = ref('');

      const signin_Username = ref('');
      const signin_Password = ref('');


      onMounted(() => {
        const storedUsername = localStorage.getItem('username');

        if (storedUsername) {
          signin_Username.value = storedUsername;
          check.value = true;
        }
      });

      const signUp = async () => {
        if(signup_Password.value !== signup_ConfirmPassword.value){
          alert('Mật khẩu không khớp!');
        }

        try {
          const response = await axios.post('http://localhost:3000/users', {
              username: signup_Username.value,
              email: signup_Email.value,
              password: signup_Password.value,
              role: "0",
          });

          alert('Đăng ký thành công!');
        } catch (error) {
          console.error('Lỗi đăng ký:', error);
          alert('Đăng ký chưa thành công!');
        }
      };

      const signIn = async () => {
        try {
          const response = await axios.get('http://localhost:3000/users');
          const users = response.data;
          const user = users.find(
            (user) =>
              user.username === signin_Username.value &&
              user.password === signin_Password.value
          );

          if (user) {
            alert('Đăng nhập thành công!');
            localStorage.setItem('username', signin_Username.value);
            localStorage.setItem('role', user.role); 

            check.value = true; 
          } else {
            alert('Thông tin đăng nhập không chính xác!');
          }
        } catch (error) {
          console.error('Lỗi đăng nhập:', error);
          alert('Đã xảy ra lỗi. Vui lòng thử lại!');
        }
      };

      const checkrole = computed(() => {
        const role = localStorage.getItem('role');
        return role === '1'; 
      });


      const logout = () => {
        signin_Username.value = '';
        signin_Password.value = '';
        localStorage.removeItem('username');
        check.value = false;
      };

      return {
        signup_Username,
        signup_Email,
        signup_Password,
        signup_ConfirmPassword,
        signUp,
        signin_Username,
        signin_Password,
        signIn,
        check,
        logout,
        checkrole,
        checklink
      };
    }
  }
</script>




<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top" v-if="!checklink">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="84" height="24" viewBox="0 0 84 24" fill="black">
          <path d="M27.6027 0L17.7745 10.585L14.1671 0H6.94734V0.005L5.41862 0L6.33686 2.365L1.14528 19.9L0 24H7.24501L10.6203 12.505L13.1177 18.435H17.8199L23.8036 12.505L20.4283 24H27.7742L34.8224 0H27.6027ZM75.8708 7.25C75.5933 8.195 74.67 9.205 72.6519 9.205H68.0758L69.2261 5.295H73.8022C75.8153 5.295 76.1483 6.305 75.8708 7.25ZM73.5499 16.585C73.2573 17.595 72.2583 18.71 70.2402 18.71H65.2908L66.5269 14.495H71.4814C73.4944 14.495 73.8526 15.575 73.555 16.585H73.5499ZM83.1208 7.04C84.3317 2.895 82.031 0 75.8203 0H61.86L62.7884 2.2L57.1831 21.68L54.7714 24H69.4078C74.7356 24 79.5336 23.5 80.8807 18.915C81.8696 15.545 80.8858 12.69 79.8464 12.08C80.916 11.575 82.3186 9.77 83.1208 7.04ZM41.1896 18.74H51.3709H51.376C51.418 18.7175 51.4112 18.7212 51.3897 18.733C51.2824 18.7916 50.8087 19.0503 54.2568 17.225L52.1984 23.995H30.6853L32.9961 21.69L38.7527 2.32L37.7891 0H46.694L41.1896 18.74Z"/>        </svg>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link me-2 fw-semibold" to="/">Trang chủ</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link me-2 fw-semibold" to="/sanpham">Sản phẩm</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link me-2 fw-semibold" to="/baiviet">Bài viết</router-link>
          </li>
          <li class="nav-item" v-if="!check">
            <div class="nav-link me-2 fw-semibold" data-bs-toggle="modal" data-bs-target="#registerModal">Đăng ký</div>
          </li>
          <li class="nav-item"  v-if="!check">
            <div class="nav-link me-2 fw-semibold" data-bs-toggle="modal" data-bs-target="#loginModal">Đăng nhập</div>
          </li>
        </ul>
      </div>
      <div class="d-flex justify-content-end gap-3 fs-5">
        <router-link to="/" class="text-dark text-decoration-none bi bi-search"></router-link>
        <router-link to="/giohang" class="text-dark text-decoration-none bi bi-basket3-fill"></router-link>
        <router-link class="text-dark text-decoration-none bi bi-heart-fill"></router-link>
        <div class="dropdown" v-if="check">
          <button class="btn btn-secondary fs-6 fw-semibold dropdown-toggle ps-5 pe-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ signin_Username }}
          </button>
          <ul class="dropdown-menu dropdown-menu-dark">
            <router-link 
            v-if="checkrole" 
            to="/admin" 
            class="dropdown-item fs-6">
            Trang quản trị
          </router-link>

            <li @click="logout"><a class="dropdown-item fs-6" href="#">Đăng xuất</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <!-- Modal Đăng Ký -->
  <div class="modal fade modal-md" id="registerModal" aria-hidden="true" aria-labelledby="registerLabel" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 fw-bold w-100 text-center" id="registerLabel">Đăng ký</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="fw-normal">Đăng ký thành viên và nhận ngay <strong>ưu đãi 10% </strong>cho đơn hàng đầu tiên <br>
              Nhập mã: <strong>MLBWELCOME</strong></p>
            <form @submit.prevent="signUp">

              <div class="mb-3">
                <label for="registerUsername" class="form-label fw-bold">Username<sup><i class="fa fa-asterisk text-danger"></i></sup></label>
                <input 
                type="text" 
                class="form-control" 
                id="registerUsername" 
                v-model="signup_Username" 
                required>
              </div>

              <div class="mb-3">
                <label for="registerEmail" class="form-label fw-bold">Email<sup><i class="fa fa-asterisk text-danger"></i></sup></label>
                <input 
                type="email" 
                class="form-control" 
                id="registerEmail" 
                v-model="signup_Email" 
                required>
              </div>

              <div class="mb-3">
                <label for="registerPassword" class="form-label fw-bold">Mật khẩu<sup><i class="fa fa-asterisk text-danger"></i></sup></label>
                <input 
                type="password" 
                class="form-control" 
                id="registerPassword" 
                v-model="signup_Password" 
                required>
              </div>

              <div class="mb-3">
                <label for="registerConfirmPassword" class="form-label fw-bold">Nhập lại mật khẩu<sup><i class="fa fa-asterisk text-danger"></i></sup></label>
                <input 
                type="password" 
                class="form-control" 
                id="registerConfirmPassword" 
                v-model="signup_ConfirmPassword" 
                required>
              </div>


              <button data-bs-dismiss="modal" aria-label="Close" type="submit" class="btn btn-dark w-100">Tạo tài khoản</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    
  <!-- Modal Đăng Nhập -->
  <div class="modal fade" id="loginModal" aria-hidden="true" aria-labelledby="loginLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-bold w-100 text-center" id="registerLabel">Đăng nhập</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="signIn">

            <div class="mb-3">
              <label for="loginEmail" class="form-label">Username <sup><i class="fa fa-asterisk text-danger"></i></sup></label>
              <input
              v-model="signin_Username" 
              type="text"
              class="form-control"
              id="loginEmail" 
              placeholder="Nhập username của bạn...">
            </div>

            <div class="mb-3">
              <label for="loginPassword" class="form-label">Mật khẩu <sup><i class="fa fa-asterisk text-danger"></i></sup></label>
              <input
               v-model="signin_Password" 
               type="password" class="form-control" 
               id="loginPassword" 
               placeholder="Nhập mật khẩu...">
            </div>
            
            <div class="modal-footer d-flex flex-column align-items-center">
              <button data-bs-dismiss="modal" aria-label="Close" type="submit" id="signin_btn" class="btn btn-dark ps-5 pe-5">Đăng nhập</button>
              <a href="" class="text-dark">Quên mật khẩu?</a>
              <div>Hoặc</div>
              <p class="text-center fw-bold">Chưa có tài khoản? 
                <a href="#" class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" data-bs-target="#registerModal" data-bs-toggle="modal">Đăng ký</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <main>
    <router-view></router-view>
  </main>
</template>
