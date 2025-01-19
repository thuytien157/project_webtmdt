<script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  // import { useRoute } from 'vue-router'; 


  export default {
    setup() {
      const users = ref([]);
      const username = ref('');
      const password = ref('');
      const email = ref('');
      const role = ref('');
      
      const fetchUser = async () => {
        try {
          const response = await axios.get("http://localhost:3000/users");
          users.value = response.data;
        } catch (error) {
          console.log("Lỗi khi lấy danh mục:", error);
        }
      };



      async function them() {
          try {
              await axios.post('http://localhost:3000/users', {
                  username: username.value,
                  password: password.value,
                  email: email.value,
                  role: role.value
              })
              alert('Thêm user thành công!')
              window.location.href = '/admin/quanlyuser'
            } catch (error) {
              console.log(error)
          }
      }

      const xoa = async (id) => {
        try {
          if(confirm('Bạn muốn xoá user này!')){
            await axios.delete(`http://localhost:3000/users/${id}`);
            alert('User đã được xóa!');
            fetchUser();          
          }
        } catch (error) {
          console.log("Lỗi khi xóa user:", error);
        }
      };



      onMounted(() => {
        fetchUser();
      });

      return {
          users,
          username,
          password,
          email,
          role,
          them,
          xoa
      };
    }
  };
</script>



<template>
  <div class="d-flex flex-column">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand fw-bolder" href="#">Admin</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <routerLink to="/admin" class="nav-link text-white fw-bolder">
                <i class="bi bi-house-door"></i> Tổng quan
              </routerLink>
            </li>
            <li class="nav-item">
              <routerLink to="/admin/quanlysanpham" class="nav-link text-white fw-bolder">
                <i class="bi bi-book"></i> Sản phẩm
              </routerLink>
            </li>
            <li class="nav-item">
              <routerLink to="/admin/quanlydanhmuc" class="nav-link text-white fw-bolder">
                <i class="bi bi-book"></i> Danh mục
              </routerLink>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white fw-bolder" href="#">
                <i class="bi bi-cart"></i> Đơn hàng
              </a>
            </li>
            <li class="nav-item">
              <routerLink to="/admin/quanlyuser" class="nav-link text-white fw-bolder">
                <i class="bi bi-person"></i> Người dùng
              </routerLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="flex-grow-1 p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h1>Quản lý sản phẩm</h1>
        <routerLink to="/" class="btn btn-dark">
        <i class="bi bi-box-arrow-right"></i> Logout
        </routerLink>
      </div>

      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div>Sản phẩm</div>
          <button data-bs-toggle="modal" data-bs-target="#addModal">Thêm mới</button>

          <!-- Modal - thêm -->
          <div class="modal fade" id="addModal" aria-hidden="true" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5 fw-bold w-100 text-center" id="registerLabel">Thêm mới</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form class="row g-3" @submit.prevent="them">

                  <div class="col-md-12">
                    <label class="form-label">Username</label>
                    <input
                    v-model="username" 
                    type="text" 
                    class="form-control" 
                    required />
                  </div>


                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input
                  v-model="email" 
                  type="email" 
                  class="form-control" 
                  required />
                </div>

                <div class="col-md-6">
                  <label class="form-label">Password</label>
                  <input
                  v-model="password" 
                  type="password" 
                  class="form-control" 
                  required />
                </div>

                <div class="col-md-6">
                  <label class="form-label">Danh mục</label>
                  <select class="form-select" v-model="role" required>
                    <option disabled value="">Thiết lập vai trò</option>
                    <option value="1">
                        Admin
                    </option>
                    <option value="0">
                        User
                    </option>
                  </select>
                </div>

                  <div class="modal-footer d-flex flex-column align-items-center">
                      <button data-bs-dismiss="modal" aria-label="Close" type="submit" class="btn btn-dark ps-5 pe-5">Thêm mới</button>
                  </div>
                </form>
              </div>
              </div>
            </div>
          </div>



        </div>
        <div class="card-body table-wrapper-scroll-y my-custom-scrollbar">
          <table class="table table-striped">
            <thead>
              <tr class="text-center">
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Vai trò</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(users, index) in users" :key="users.id" class="text-center">
                
                <td>{{ ++index }}</td>
                <td>{{ users.username }}</td>
                <td>{{ users.email }}</td>
                <td>{{  users.password }}</td>
                <td>
                  {{
                    users.role == 1 
                      ? 'Admin'
                      :  'User'
                  }}
                </td>

                <td>
                  <a @click.prevent="xoa(users.id)"><i class="bi bi-trash text-black fw-bold fs-4"></i></a>
                  <routerLink :to="`/admin/quanlyuser/sua/${users.id}`">
                    <i class="bi bi-pencil-square text-black fw-bold fs-4"></i>
                  </routerLink>                
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
    .my-custom-scrollbar {
      position: relative;
      max-height: 370px;
      overflow-y: auto;
    }

    .table-wrapper-scroll-y {
      display: block;
    }

    .anh {
      width: 50px;
    }

    .navbar {
      margin-bottom: 20px;
    }

</style>
