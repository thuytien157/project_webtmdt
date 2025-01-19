<script setup>
    import { ref, onMounted } from "vue";
    import axios from "axios";
    import { useRoute } from "vue-router";

    const name = ref('');
    const price = ref('');
    const image = ref('');
    const category_id = ref('');
    const discount = ref('');
    const sanpham_id = ref({});
    const id = ref(null); 
    const danhmuc = ref([]); 
    const route = useRoute();

        const getProduct_id = async (id) => {
        try {
            const res = await axios.get(`http://localhost:3000/product/${id}`);
            sanpham_id.value = res.data;
            name.value = sanpham_id.value.name;
            price.value = sanpham_id.value.price;
            category_id.value = sanpham_id.value.category_id;
            image.value = sanpham_id.value.image;
            discount.value = sanpham_id.value.discount;
        } catch (error) {
            console.log("Lỗi khi lấy thông tin sản phẩm:", error);
        }
    };

        const fetchDanhmuc = async () => {
        try {
        const response = await axios.get("http://localhost:3000/categories");
        danhmuc.value = response.data;
        } catch (error) {
        console.log("Lỗi khi lấy danh mục:", error);
        }
    };

    const changeFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            image.value = '/img/' + file.name;
        } else {
            image.value = sanpham_id.value.image;
        }
    };


        const sua = async () => {
        try {
            const updatedImage = image.value || sanpham_id.value.image; 
            await axios.put(`http://localhost:3000/product/${id.value}`, {
                category_id: category_id.value,
                name: name.value,
                price: price.value,
                image: updatedImage,
                discount: discount.value,
            });

            alert("Cập nhật sản phẩm thành công!");
            window.location.href = "/admin/quanlysanpham";
        } catch (error) {
            console.log("Lỗi khi cập nhật sản phẩm:", error);
        }
    };

    onMounted(() => {
        id.value = route.params.id; 
        getProduct_id(id.value); 
        fetchDanhmuc(); 
    });
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Chỉnh sửa sản phẩm</h1>
    <form class="row g-3" @submit.prevent="sua">
      <div class="col-md-12">
        <label class="form-label">Tên sản phẩm</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Danh mục</label>
        <select class="form-select" v-model="category_id" required>
          <option disabled value="">Chọn danh mục</option>
          <option v-for="category in danhmuc" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label">Ảnh sản phẩm</label>
        <input @change="changeFile" id="image" type="file" class="form-control" />
    </div>

      <div class="col-md-6">
        <label class="form-label">Giá gốc</label>
        <input v-model="price" type="number" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label class="form-label">Phần trăm giảm giá</label>
        <input v-model="discount" type="number" class="form-control" required />
      </div>

      <div class="col-12 text-center">
        <button type="submit" class="btn btn-dark">Cập nhật</button>
      </div>
    </form>
  </div>
</template>
