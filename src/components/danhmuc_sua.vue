<script setup>
    import { ref, onMounted } from "vue";
    import axios from "axios";
    import { useRoute } from "vue-router";

    const danhmuc_id = ref([]);
    const name = ref('');
    const id = ref(null); 
    const route = useRoute();

        const getCategory_id = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3000/categories/${id}`);
            danhmuc_id.value = res.data;
            name.value = danhmuc_id.value.name;
        } catch (error) {
            console.log("Lỗi khi lấy thông tin danh mục:", error);
        }
    };



        const sua = async () => {
        try {
            await axios.put(`http://localhost:3000/categories/${id.value}`, {
                name: name.value
            });

            alert("Cập nhật thành công!");
            window.location.href = "/admin/quanlyuser";
        } catch (error) {
            console.log("Lỗi khi cập nhật:", error);
        }
    };

    onMounted(() => {
        id.value = route.params.id; 
        getCategory_id(id.value); 
    });
</script>

<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Chỉnh sửa thông tin danh mục</h1>
      <form class="row g-4" @submit.prevent="sua">
        <div class="col-md-12">
          <label class="form-label">Tên danh mục</label>
          <input v-model="name" type="text" class="form-control" required />
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