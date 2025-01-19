<script>
  import { ref, onMounted, watch } from "vue";
  import axios from "axios";
  import { useRoute } from 'vue-router'; 

  export default {

      setup() {
          const route = useRoute(); 
          const sanphamct = ref([]); 
          const sanphamlq = ref([]); 
          const productId = ref(route.params.id);
          const categoryId = ref(0);
          const active_size = ref(0);
          const active_color = ref(0);

          const fetchSanphamct = async () => {
              try {
                  const response = await axios.get(`http://localhost:3000/product?id=${productId.value}`);
                  sanphamct.value = response.data;
                  categoryId.value = sanphamct.value[0].category_id;

                  if (categoryId.value) {
                      const response = await axios.get(`http://localhost:3000/product?category_id=${categoryId.value}`);
                      sanphamlq.value = response.data.filter(item => item.id !== sanphamct.value[0].id);  
                  } else {
                      console.log("categoryId.value không hợp lệ.");
                  }
              } catch (error) {
                  console.log("Lỗi khi lấy sản phẩm chi tiết:", error);
              }
          };

          // watch(source, callback, [options])
          watch(
              () => route.params.id,
              (newId) => {
                productId.value = newId; 
                fetchSanphamct(); 
              }
            );



          onMounted(async () => {
              fetchSanphamct();
          });

          return {
            sanphamct,
            active_size,
            active_color,
            sanphamlq
          };
      }
  };
</script>

<template>
  <div class="container-xxl mt-2">
    <div class="card mb-3 border-0 ms-3">
      <div class="row g-4" v-for="p_detail in sanphamct" :key="p_detail.id">
        <!-- Cột hình ảnh -->
        <div class="col-md-5 mt-5">
          <div class="d-flex">
            <div class="d-flex flex-column gap-2 me-3">
              <img
               v-for="(img,index) in p_detail.detailed_images" 
               :key="index" :src="img" 
               class="img-thumbnail thumb-img" alt="">
            </div>
            <div class="flex-grow-1">
              <img :src="p_detail.image" class="img-fluid rounded main-image" alt="Main Image">
            </div>
          </div>
        </div>

        <!-- Cột thông tin sản phẩm -->
        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title fs-3 fw-bold">{{ p_detail.name }}</h5>
            <p class="card-text text-muted">Mã sản phẩm {{ p_detail.id }}</p>

            <p class="card-text text-danger fw-bold fs-4" v-if="p_detail.discount == null">{{ new Intl.NumberFormat('vi-VN').format((p_detail.price)) + 'đ' }}
              <del class="ms-2 text-muted fs-5"></del>
              <div class="badge text-bg-danger m-2"></div>
            </p>

            <p class="card-text text-danger fw-bold fs-4" v-else >{{ new Intl.NumberFormat('vi-VN').format((p_detail.price)) + 'đ' }}
              <del class="ms-2 text-muted fs-5">{{ 
                new Intl.NumberFormat('vi-VN').format(
                  (p_detail.price - (p_detail.price * (p_detail.discount/100))).toFixed(0)) + 'đ'  
                
                }}</del>
              <div class="badge text-bg-danger m-2">{{ 
                -p_detail.discount + "%"
              }}</div>
            </p>

            <p class="card-text fw-medium">Chọn kích thước</p>
            <div class="d-flex gap-2">
              <button type="button"
                  @click="active_size = index"
                  v-for="(size, index) in p_detail.sizes"
                  :key="index"
                  :class="active_size === index 
                    ? 'btn btn-outline-dark ps-5 pe-5 rounded-pill fw-bold active' 
                    : 'btn btn-outline-dark ps-5 pe-5 rounded-pill fw-bold'">
                  {{ size }}
              </button>

            </div>

            <p class="card-text fw-medium mt-3">Chọn màu sắc</p>
            <div class="d-flex gap-2">
              <button type="button" 
                v-for="(color, index) in p_detail.colors" :key="index"
                @click="active_color = index"
                :class="active_color === index 
                    ? 'color-btn btn btn-outline-dark rounded-circle shadow p-3 mb-5 active' 
                    : 'color-btn btn btn-outline-dark rounded-circle shadow p-3 mb-5'"
                :style="{ backgroundColor: color, width: '40px', height: '40px' }">              
              </button>
            </div>


            <div class="d-flex gap-2">
              <button class="btn btn-dark fs-6 fw-bold pe-5 ps-5 pt-3 pb-3">Thêm vào giỏ hàng</button>
              <button class="btn btn-danger fs-6 fw-bold pe-5 ps-5 pt-3 pb-3">Mua ngay</button>
            </div>
  
            <div class="card mt-3">
              <div class="card-body">
                <h5 class="card-title">MLB Chào bạn mới</h5>
                <p class="card-text">Nhận ngay ưu đãi 5% khi đăng ký thành viên và mua đơn hàng nguyên giá đầu tiên tại website*</p>
                <p class="card-text">Nhập mã: <strong>MLBWELCOME</strong></p>
                <p class="card-text">Ưu đãi không áp dụng cùng với các CTKM khác</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Phần chính sách -->
    <div class="chinhsach">
      <div class="card">
        <div class="card-header">
          <ul class="nav nav-tabs justify-content-center" id="policyTabs">
            <li class="nav-item">
              <a class="nav-link active" href="#" data-bs-toggle="tab" data-bs-target="#product-info">Thông tin sản phẩm</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#return-policy">Chính sách đổi trả hàng</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-bs-toggle="tab" data-bs-target="#strong_intruction">Hướng dẫn bảo quản</a>
            </li>
          </ul>
        </div>
        <div class="card-body" v-for="p_detail in sanphamct" :key="p_detail.id">
          <div class="tab-content">
            <div class="tab-pane fade show active" id="product-info">
              <div class="row">
                <div class="col-md-4">
                  <ul class="list-unstyled">
                    <li><strong>Thương hiệu:</strong> MLB</li>
                    <li><strong>Xuất xứ:</strong> Hàn Quốc</li>
                    <li><strong>Giới tính:</strong> Unisex</li>
                    <li><strong>Kiểu dáng:</strong> {{ p_detail.style }}</li>
                  </ul>
                </div>
                <div class="col-md-4">
                  <ul class="list-unstyled">
                    <li><strong>Chất liệu:</strong> {{ p_detail.materials.join(', ') }}</li>
                    <li><strong>Bo viền:</strong> Cổ, gấu tay và vạt áo</li>
                    <li><strong>Chất vải:</strong> Mềm mại, giữ ấm tốt</li>
                    <li><strong>Phom:</strong> Rộng, thoải mái</li>
                  </ul>
                </div>
                <div class="col-md-4">
                  <ul class="list-unstyled">
                    <li><strong>Dịp sử dụng:</strong> Đi chơi, đi làm</li>
                    <li><strong>Sử dụng:</strong> Phù hợp mọi mùa trong năm</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="return-policy">
              <p>Áp dụng cho toàn bộ sản phẩm quần áo nguyên giá.</p>
              <p><strong>Đối tượng khách hàng:</strong> Tất cả khách hàng sử dụng dịch vụ tại <strong><i>vn.mlb-korea.com</i></strong></p>
              <p><strong>Thời gian đổi/ trả hàng:</strong></p>
              <li><strong>Đổi hàng:</strong> Trong vòng <strong>30 ngày</strong> kể từ ngày khách hàng nhận được sản phẩm.</li>
              <li><strong>Trả hàng:</strong> Trong vòng <strong>03 ngày</strong> ngày kể từ ngày khách hàng nhận được sản phẩm.</li><br>
              <p><i>Lưu ý: Không áp dụng cho các sản phẩm giảm giá từ 30% trở lên và các sản phẩm mua trực tiếp tại hệ thống cửa hàng của Maison.</i></p>
              <p><u>Ghi chú: </u>Thời hạn đổi/trả hàng được tính từ ngày khách hàng nhận hàng cho đến ngày khách hàng gửi hàng đổi/trả cho đơn vị vận chuyển.</p>
            </div>
            <div class="tab-pane fade" id="strong_intruction">
              <p>Giặt khô.</p>
              <p>Không sử dụng hóa chất mạnh</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="sanphamlienquan">
      <p class="text-start pb-2 fw-bold mt-3 fs-4 border border-black border-top-0 border-end-0 border-start-0">Sản phẩm liên quan</p>


      <div class="hangbanchay mb-2">
          <div class="row g-3">
              <div class="col-12 col-md-6 col-lg-3" v-for="p_relevant in sanphamlq.slice(0, 4)" :key="p_relevant.id">
                <routerLink :to="`/chitietsanpham/${p_relevant.id}`" class="card text-decoration-none">
                  <div class="position-absolute top-0 start-0 badge text-bg-danger m-2">{{ p_relevant.discount !== null ? "-" + p_relevant.discount + "%" : "" }}</div>
                  <img :src="p_relevant.image" class="card-img-top img-fluid" alt="...">
                      <div class="card-body bg-body">
                          <div class="position-absolute top-0 end-0 m-2 giohang"><i class="bi bi-basket3-fill fs-4 gh m-2"></i></div>
                          <p class="card-text fw-bolder">{{ p_relevant.name }}</p>

                          <p class="card-text fw-bold text-danger fs-5" v-if="p_relevant.discount == null">{{ new Intl.NumberFormat('vi-VN').format((p_relevant.price)) + 'đ' }} 
                            <del class="text-dark fs-6"></del>
                          </p>

                          <p class="card-text fw-bold text-danger fs-5" v-else>{{ new Intl.NumberFormat('vi-VN').format(
                                                                                  (p_relevant.price - (p_relevant.price * (p_relevant.discount/100))).toFixed(0)) + 'đ'  
                                                                                }} 
                            <del class="text-dark fs-6">{{ new Intl.NumberFormat('vi-VN').format((p_relevant.price)) + 'đ' }}</del>
                          </p>

                        </div>
                  </routerLink>
              </div>
          </div>
      </div>
    </div>

  </div>

  <div class="text-center p-5 pb-2 bg-body-secondary">
          <div class="card-body"> 
              <h2 class="card-title fw-bold mb-2">ĐĂNG KÝ BẢN TIN CỦA CHÚNG TÔI</h2>
              <p class="card-text">Hãy cập nhật các tin tức thời trang về sản phẩm, BST sắp ra mắt, chương trình khuyến mãi đặc biệt và xu hướng thời trang mới nhất hàng tuần của chúng tôi.</p>
              <div class="input-group mb-3 ip_emmail border border-black rounded">
                  <input type="text" class="form-control" placeholder="Nhập email đăng ký nhận tin" aria-label="Recipient's username" aria-describedby="button-addon2">
                  <button class="btn btn-dark text-light fw-bold" type="button" id="button-addon2">ĐĂNG KÝ</button>
              </div>
          </div>
  </div>

    <div class="footer bg-dark p-3">
    <div class="container text-left">
      <div class="row justify-content-md-center">
          <div class="col col-lg-2 help">
              <ul class="list-group list-group-flush">
                  <li class="list-group-item text-light bg-dark fs-6 fw-bold border-0 mb-2">TRỢ GIÚP</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Hệ thống cửa hàng</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Liên hệ</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Chính sách Loyalty</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Điều khoản sử dụng</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Chính sách vận chuyển, giao hàng</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Chính sách thanh toán</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Chính sách đổi trả</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Câu hỏi thường gặp</li>
              </ul>                        
          </div>
          <div class="col-md-auto">
              <ul class="list-group list-group-flush">
                  <li class="list-group-item text-light bg-dark fs-6 fw-bold border-0 mb-2">THANH TOÁN</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Visa / Mastercard / JCB</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">ATM / Internet Banking</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Quét mã QR</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Mua trước trả sau</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Ví điện tử</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Thanh toán khi nhận hàng (COD)</li>
              </ul>                   
          </div>
          <div class="col col-lg-2 help">
              <ul class="list-group list-group-flush">
                  <li class="list-group-item text-light bg-dark fs-6 fw-bold border-0 mb-2">GIAO HÀNG</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Giao hàng tiêu chuẩn</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Maison NOW</li>
                  <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0"><img src="https://file.hstatic.net/1000284478/file/icon-bct_c5ff22fa4ca24fd58c49573d2114f8b0.svg" alt=""></li>
              </ul>                   
          </div>
      </div>
  </div>            
    </div>

  </template>
  
  
  
  <style>
    .thumb-img {
      width: 200px;
      height: 80px;
      object-fit: cover;
    }
  
    .main-image {
      width: 100%;
      object-fit: cover;
    }
  
    .chinhsach .card-body {
      background-color: #f9f9f9;
      padding: 30px;
    }
  
    .chinhsach .list-unstyled li {
      font-size: 14px;
      margin-bottom: 10px;
    }
  
    .chinhsach .nav-tabs .nav-link {
      font-weight: bold;
      color: #333;
      border-radius: 0;
    }
  
    .chinhsach .nav-tabs .nav-link.active {
      background-color: #f4f4f4;
      color: #000;
    }
  
    .chinhsach .row {
      display: flex;
      justify-content: space-between;
    }
  
    .chinhsach .col-md-4 {
      margin-bottom: 20px;
    }
    .color-btn {
      transition: all 0.3s ease;
  }
    .color-btn.active {
      box-shadow: 0 4px 12px rgba(139, 69, 19, 0.5); 
      transform: scale(1.15); 
    }


  </style>
  