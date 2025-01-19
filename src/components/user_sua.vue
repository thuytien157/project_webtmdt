<script setup>
    import { ref, onMounted } from "vue";
    import axios from "axios";
    import { useRoute } from "vue-router";

    const user_id = ref([]);
    const username = ref('');
    const password = ref('');
    const email = ref('');
    const role = ref('');
    const id = ref(null); 
    const route = useRoute();

        const getUser_id = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3000/users/${id}`);
            user_id.value = res.data;
            username.value = user_id.value.username;
            password.value = user_id.value.password;
            email.value = user_id.value.email;
            role.value = user_id.value.role;
        } catch (error) {
            console.log("Lỗi khi lấy thông tin user:", error);
        }
    };



        const sua = async () => {
        try {
            await axios.put(`http://localhost:3000/users/${id.value}`, {
                username: username.value,
                password: password.value,
                email: email.value,
                role: role.value,
            });

            alert("Cập nhật thành công!");
            window.location.href = "/admin/quanlyuser";
        } catch (error) {
            console.log("Lỗi khi cập nhật:", error);
        }
    };

    onMounted(() => {
        id.value = route.params.id; 
        getUser_id(id.value); 
    });
</script>

<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Chỉnh sửa thông tin người dùng</h1>
      <form class="row g-4" @submit.prevent="sua">
        <div class="col-md-12">
          <label class="form-label">Tên người dùng</label>
          <input v-model="username" type="text" class="form-control" required />
        </div>
  
        <div class="col-md-6">
          <label class="form-label">Vai trò</label>
          <select class="form-select" v-model="role" required>
            <option disabled value="">Chọn vai trò</option>
            <option value="1">Admin</option>
            <option value="0">User</option>
          </select>
        </div>
  
        <div class="col-md-6">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>
  
        <div class="col-md-6">
          <label class="form-label">Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>
  
        <div class="col-12 text-center">
          <button type="submit" class="btn btn-dark w-100">Cập nhật</button>
        </div>
      </form>
    </div>
  </template>
  
  <style scoped>
    .container {
      max-width: 600px;
    }
  
    .form-control {
      font-size: 16px;
    }
  
    .btn {
      padding: 12px;
      font-size: 16px;
    }
  </style>