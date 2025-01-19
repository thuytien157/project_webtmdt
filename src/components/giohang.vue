<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const cartItems = ref([]);
    const tongtien = ref(0);
    const tongsanpham = ref(0);
    
    function loadCartItems() {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        cartItems.value = JSON.parse(cartData);
      }
    }

    onMounted(() => {
      loadCartItems();
      tinhtongtien(); 
      tongsl_sanpham(); 

    });

    function removeItem(index) {
      cartItems.value.splice(index, 1);  
      localStorage.setItem("cart", JSON.stringify(cartItems.value));
    }

    function tinhtongtien() {
      tongtien.value = 0;  
      cartItems.value.forEach(element => {
        tongtien.value += element.price * element.quantity;  
      });
    }

    function tongsl_sanpham() {
      tongsanpham.value = 0;  
      cartItems.value.forEach(element => {
        tongsanpham.value += element.quantity;  
      });
    }


    const capnhat_soluong = (index, check) => {
      if (check === "increase") {
        cartItems.value[index].quantity++;
      } else if (check === "decrease" && cartItems.value[index].quantity > 1) {
        cartItems.value[index].quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(cartItems.value));
      tongsl_sanpham();
      tinhtongtien();  
    };

    return {
      cartItems,
      removeItem,
      tongtien,
      tongsanpham,
      capnhat_soluong,
    };
  }
};
</script>


<template>
  <div class="container-fluid mt-2">
    <div class="link mb-4">
      <div class="dieuhuong">
        <a class="icon-link text-dark text-decoration-none" href="#">
          SẢN PHẨM <i class="fa fa-chevron-right opacity-50"></i>
        </a>
        <span class="fw-bold">GIỎ HÀNG</span>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-lg-8">
        <div class="list-group">
          <div
            class="list-group-item d-flex justify-content-between align-items-center"
            v-for="(item, index) in cartItems"
            :key="index"
          >
            <div class="d-flex align-items-center">
              <img :src="item.image" alt="Product Image" class="img-thumbnail" style="width: 100px;" />
              <div class="ms-3">
                <p class="mb-1 fw-bold">{{ item.name }}</p>
                <p class="text-muted">Số lượng: {{ item.quantity }}</p>
              </div>
            </div>
            <div class="text-center">
              <p class="fw-bold">{{ item.price }}<sup class="fw-bold">đ</sup></p>
              <div class="input-group input-group-sm">
                <button @click="capnhat_soluong(index, 'decrease')" class="btn btn-outline-secondary" type="button">-</button>
                <input type="number" class="form-control text-center" :value="item.quantity" readonly />
                <button @click="capnhat_soluong(index, 'increase')" class="btn btn-outline-secondary" type="button">+</button>
              </div>
              <button @click="removeItem(index)" class="btn btn-danger btn-sm mt-2">Xoá</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Thanh toán -->
      <div class="col-12 col-lg-4 mt-4 mt-lg-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title fw-bold">Tóm tắt đơn hàng</h5>
            <div class="d-flex justify-content-between">
              <p>Tổng sản phẩm:</p>
              <p>{{ tongsanpham }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>Tổng tiền:</p>
              <p class="fw-bold">{{ tongtien }} VND</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>Tạm tính:</p>
              <p class="fw-bold">{{ tongtien }} VND</p>
            </div>
            <div class="d-flex justify-content-between">
              <p>Phí vận chuyển:</p>
              <p class="fw-bold">50,000 VND</p>
            </div>
            <div class="d-flex justify-content-between">
              <p><strong>Tổng cộng:</strong></p>
              <p class="fw-bold">{{ tongtien + 50000 }} VND</p>
            </div>
            <button class="btn btn-dark w-100 mt-3">Tiến hành thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center p-5 pb-2 bg-body-secondary">
    <div class="card-body">
      <h2 class="card-title fw-bold mb-2">ĐĂNG KÝ BẢN TIN CỦA CHÚNG TÔI</h2>
      <p class="card-text">
        Hãy cập nhật các tin tức thời trang về sản phẩm, BST sắp ra mắt, chương trình khuyến mãi đặc biệt và xu hướng thời trang mới nhất hàng tuần của chúng tôi.
      </p>
      <div class="input-group mb-3 ip_emmail border border-black rounded">
        <input
          type="text"
          class="form-control"
          placeholder="Nhập email đăng ký nhận tin"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
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
            <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">ATM nội địa</li>
            <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Thanh toán qua ví điện tử</li>
            <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Thanh toán khi nhận hàng</li>
          </ul>
        </div>
        <div class="col col-lg-2">
          <ul class="list-group list-group-flush">
            <li class="list-group-item text-light bg-dark fs-6 fw-bold border-0 mb-2">VẬN CHUYỂN</li>
            <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Giao hàng tận nơi</li>
            <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Giao hàng qua đối tác</li>
            <li class="list-group-item text-light bg-dark fs-6 fw-normal border-0">Giao hàng quốc tế</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
