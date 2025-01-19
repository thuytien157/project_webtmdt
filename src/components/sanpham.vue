<script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  export default {
    setup() {
      const sanpham = ref([]); 
      const danhmuc = ref([]);
      const selectdm = ref('');


      const fetchSanpham = async () => {
          try {
              const response = await axios.get("http://localhost:3000/product");
              const products = response.data;

              const randomProducts = [];
              while (randomProducts.length < products.length) {
                  const randomProduct = products[Math.floor(Math.random() * products.length)];

                  if (!randomProducts.includes(randomProduct)) {
                      randomProducts.push(randomProduct);
                  }
              }

              sanpham.value = randomProducts;
          } catch (error) {
              console.error("Lỗi khi lấy sản phẩm:", error);
          }
      };
      
      const fetchDanhmuc = async () => {
        try {
          const response = await axios.get("http://localhost:3000/categories");
          danhmuc.value = response.data;
        } catch (error) {
          console.error("Lỗi khi lấy danh mục:", error);
        }
      };

      const loctheodanhmuc = async () => {
        if (selectdm.value){
          try {
            const response = await axios.get(
              `http://localhost:3000/product?category_id=${selectdm.value}`
            );
            sanpham.value = response.data;
          } catch (error) {
            console.error("Lỗi khi lọc sản phẩm theo danh mục:", error);
          }
        }else{
          fetchSanpham();
        };
          
        
      };

      onMounted(() => {
        fetchSanpham();
        fetchDanhmuc();

      });

      return {
        sanpham,
        danhmuc,
        loctheodanhmuc,
        selectdm,
      };
    },
  };
</script>

<template>
  <div class="container-xxl">
    <div class="link d-flex justify-content-between">
      <div class="dieuhuong mt-3">
        <a class="icon-link text-dark text-decoration-none" href="#">
          TRANG CHỦ <i class="fa fa-chevron-right opacity-25"></i>
        </a>
        <a class="icon-link text-dark fw-bold text-decoration-none" href="#">
          SẢN PHẨM
        </a>
      </div>
      <select class="form-select w-25 mt-2" aria-label="Default select example" 
        v-model="selectdm" 
        @change="loctheodanhmuc">
        <option value="">Tất cả sản phẩm</option>
        <option v-for="category in danhmuc" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
    </div>

    <div class="sanpham m-4 mt-2">
      <div class="hangbanchay mb-2">
        <div class="row g-3">
          <div v-for="product in sanpham" :key="product.id" class="col-12 col-md-6 col-lg-3">
            <routerLink :to="`/chitietsanpham/${product.id}`" class="card text-decoration-none">
              <div class="position-absolute top-0 start-0 badge text-bg-danger m-2">{{ product.discount !== null ? "-" + product.discount + "%" : "" }}</div>

              <img :src="product.image" class="card-img-top img-fluid" alt="product image">
              <div class="card-body bg-body">
                <div class="position-absolute top-0 end-0 m-2 giohang">
                  <i class="bi bi-basket3-fill fs-4 gh m-2"></i>
                </div>
                <p class="card-text fw-bolder product-name">{{ product.name }}</p>
                  <p class="card-text fw-bold text-danger fs-5" v-if="product.discount == null">{{ new Intl.NumberFormat('vi-VN').format((product.price)) + 'đ' }} 
                    <del class="text-dark fs-6"></del>
                  </p>

                  <p class="card-text fw-bold text-danger fs-5" v-else>{{ new Intl.NumberFormat('vi-VN').format(
                                                                          (product.price - (product.price * (product.discount/100))).toFixed(0)) + 'đ'  
                                                                        }} 
                    <del class="text-dark fs-6">{{ new Intl.NumberFormat('vi-VN').format((product.price)) + 'đ' }}</del>
                  </p>
              </div>
            </routerLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
    .product-name {
        width: 280px; 
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
    }

</style>