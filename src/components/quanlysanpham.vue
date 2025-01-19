<script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  // import { useRoute } from 'vue-router'; 


  export default {
    setup() {
      const sanpham = ref([]); 
      const danhmuc = ref([]);
      const name = ref('');
      const price = ref(null);
      const image = ref(null);
      const category_id = ref(0);
      const discount = ref(null);
      // const route = useRoute();
      // const id = ref(route.params.id);


      const fetchSanpham = async () => {
        try {
            const response = await axios.get("http://localhost:3000/product");

             sanpham.value = response.data;
        } catch (error) {
            console.log("Lỗi khi lấy sản phẩm:", error);
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

      const laytenDM = (categoryId) => {
        const category = danhmuc.value.find((cat) => cat.id == categoryId);
        return category.name 
    };


    function changeFile(e) {
          image.value = '/img/' + e.target.files[0].name
      }


      async function them() {
          try {
              await axios.post('http://localhost:3000/product', {
                  category_id: category_id.value,
                  name: name.value,
                  price: price.value,
                  image: image.value,
                  discount: discount.value
              })
              alert('Thêm sản phẩm thành công!')
              window.location.href = '/admin/quanlysanpham'
            } catch (error) {
              console.log(error)
          }
      }

      const xoa = async (id) => {
        try {
          if(confirm('Bạn muốn xoá sản phẩm này!')){
            await axios.delete(`http://localhost:3000/product/${id}`);
            alert('Sản phẩm đã được xóa!');
            fetchSanpham();          
          }
        } catch (error) {
          console.log("Lỗi khi xóa sản phẩm:", error);
        }
      };


      onMounted(() => {
        fetchSanpham();
        fetchDanhmuc();
        // getProduct_id(id)

      });

      return {
          sanpham,
          danhmuc,
          laytenDM,
          name,
          price,
          image,
          category_id,
          discount,
          changeFile,
          them,
          xoa,
          // handleFileUpload,
          // sua
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
                    <label class="form-label">Tên sản phẩm</label>
                    <input
                    v-model="name" 
                    type="text" 
                    class="form-control" 
                    required />
                  </div>


                  <div class="col-md-6">
                  <label class="form-label">Danh mục</label>
                  <select class="form-select" v-model="category_id" required>
                    <option value="">Chọn danh mục</option>
                    <option v-for="category in danhmuc" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>

                <div class="col-md-6">
                  <label class="form-label">Ảnh sản phẩm</label>
                  <input
                  @change="changeFile"
                  id="image" 
                  type="file" 
                  class="form-control" 
                  required />
                </div>

                <div class="col-md-6">
                  <label class="form-label">Giá gốc</label>
                  <input
                  v-model="price" 
                  type="number" 
                  class="form-control" 
                  required />
                </div>

                <div class="col-md-6">
                  <label class="form-label">Phần trăm giảm giá</label>
                  <input
                  v-model="discount" 
                  type="number" 
                  class="form-control" 
                  required />
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
                <th>Tên</th>
                <th>Danh mục</th>
                <th>Ảnh</th>
                <th>Giá</th>
                <th>Giá khuyến mãi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in sanpham" :key="product.id" class="text-center">
                
                <td>{{ ++index }}</td>
                <td>{{ product.name }}</td>
                <td>{{ laytenDM(product.category_id) }}</td>
                <td><img :src="product.image" alt="product image" class="anh" /></td>
                <td>{{  new Intl.NumberFormat('vi-VN').format((product.price)) + 'đ'  }}</td>
                <td>
                  {{
                    product.discount !== null 
                      ? new Intl.NumberFormat('vi-VN').format(
                          (product.price - (product.price * (product.discount/100))).toFixed(0)
                        ) + 'đ' 
                      :  ''
                  }}
                </td>

                <td>
                  <a @click.prevent="xoa(product.id)"><i class="bi bi-trash text-black fw-bold fs-4"></i></a>
                  <routerLink :to="`/admin/quanlysanpham/sua/${product.id}`">
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
