<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
    setup() {
        const sanpham = ref([]); 
        const cart = ref(JSON.parse(localStorage.getItem("cart")) || []); 

        const fetchSanpham = async () => {
            try {
                const response = await axios.get("http://localhost:3000/product");
                const products = response.data;

                const randomProducts = [];
                while (randomProducts.length < 4) {
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

        const chuyen_dulieu = () => {
            localStorage.setItem("cart", JSON.stringify(cart.value));
        };

        const addToCart = (product) => {
            const p_exits = cart.value.find(item => item.id === product.id);            
            if (p_exits) {
                p_exits.quantity += 1;
            } else {
                cart.value.push({ ...product, quantity: 1 });
            }
            chuyen_dulieu();
            alert(`${product.name} đã được thêm vào giỏ hàng!`);
        };
        
        

        onMounted(() => {
            fetchSanpham();
        });

        return {
            sanpham,
            cart,
            addToCart

        };
    }
};
</script>

<template>
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="/img/mlb_desktop_en_be560d199f054efa9d99ae5826e2cdde.webp" class="d-block w-100 img-fluid" alt="...">
            </div>
            <div class="carousel-item">
                <img src="/img/msloyalty_mlb_web.webp" class="d-block w-100 img-fluid" alt="...">
            </div>
            <div class="carousel-item">
                <img src="/img/1960x640-mua-ngay.webp" class="d-block w-100 img-fluid" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>

    <div class="container-xxl mt-5 text-center">
        <!-- hàng mới về -->
        <div class="row align-items-center">
            <div class="d-flex justify-content-between w-100">
                <h2 class="fw-bolder text-start ms-2">Hàng mới về</h2>
                <!-- <div class="d-flex ms-auto">
                    <div v-for="category in danhmuc" :key="category.id" class="me-2">
                        <button 
                            :value="category.id" 
                            type="button" 
                            :class="active === category.id ? 'btn btn-outline-dark btn-sm p-2 mt-2 fw-semibold active' : 'btn btn-outline-dark btn-sm p-2 mt-2 fw-semibold'"
                            @click="loctheodanhmuc(category.id)">
                            {{ category.name }} 
                        </button>
                    </div>
                </div> -->
            </div>
        </div>
        
        <div class="hangmoive p-2 col-12">
            <div class="row g-3">
                <div class="col-12 col-md-6">
                    <div class="position-relative overflow-hidden">
                        <img src="/img/hangmoive_main.jpg" class="w-100 img-fluid" alt="">
                        <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 hover-overlay">
                            <routerLink to="/sanpham" type="button" class="btn btn-outline-light btn-sm">Xem tất cả </routerLink>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="row g-2">
                        <div v-for="(product, index) in sanpham.slice(0, 4)" :key="index" class="col-12 col-sm-6 col-md-6">
                            <routerLink :to="`/chitietsanpham/${product.id}`" class="card text-decoration-none">
                                <div class="position-absolute top-0 start-0 badge text-bg-danger m-2">{{ product.discount !== null ? "-" + product.discount + "%" : "" }}</div>
                                <img :src="product.image" class="card-img-top small-img img-fluid" alt="...">
                                <div class="card-body bg-body">
                                    <div @click.prevent="addToCart(product)" class="position-absolute top-0 end-0 m-2 giohang"><i class="bi bi-basket3-fill fs-4 gh m-2"></i></div>
                                    <p class="card-text fw-bolder product-name">{{ product.name }}</p>
                                    <p class="card-text fw-bold text-danger fs-5">{{ new Intl.NumberFormat('vi-VN').format((product.price)) + 'đ' }} <del class="text-dark fs-6">
                                        {{ 
                                            product.discount !== null 
                                            ? new Intl.NumberFormat('vi-VN').format(
                                                (product.price - (product.price * (product.discount/100))).toFixed(0)
                                                ) + 'đ' 
                                            :  ''                                        
                                        }}
                                        </del>
                                    </p>
                                </div>
                            </routerLink>
                        </div>
                    </div>
                </div>
            </div>        
        </div>

        <!-- hàng bán chạy -->
        <div class="row align-items-center mt-5">
            <div class="d-flex justify-content-between w-100">
                <h2 class="fw-bolder text-start ms-2">Hàng mới về</h2>
                <!-- <div class="d-flex ms-auto">
                    <div v-for="category in danhmuc" :key="category.id" class="me-2">
                        <button 
                            :value="category.id" 
                            type="button" 
                            :class="active === category.id ? 'btn btn-outline-dark btn-sm p-2 mt-2 fw-semibold active' : 'btn btn-outline-dark btn-sm p-2 mt-2 fw-semibold'"
                            @click="loctheodanhmuc(category.id)">
                            {{ category.name }} 
                        </button>
                    </div>
                </div> -->
            </div>
        </div>

        <div class="hangbanchay mt-2">
            <div class="row g-3">
                <div v-for="(product, index) in sanpham.slice(0, 4)" :key="index" class="col-12 col-md-6 col-lg-3">
                    <routerLink :to="`/chitietsanpham/${product.id}`" class="card text-decoration-none">
                        <div class="position-absolute top-0 start-0 badge text-bg-danger m-2">{{ product.discount !== null ? "-" + product.discount + "%" : "" }}</div>
                        <img :src="product.image" class="card-img-top img-fluid" alt="...">
                        <div class="card-body bg-body">
                            <div class="position-absolute top-0 end-0 m-2 giohang"><i class="bi bi-basket3-fill fs-4 gh m-2"></i></div>
                            <p class="card-text fw-bolder product-name">{{ product.name }}</p>
                            <p class="card-text fw-bold text-danger fs-5">{{ new Intl.NumberFormat('vi-VN').format((product.price)) + 'đ' }} <del class="text-dark fs-6">
                                {{ 
                                    product.discount !== null 
                                    ? new Intl.NumberFormat('vi-VN').format(
                                        (product.price - (product.price * (product.discount/100))).toFixed(0)
                                        ) + 'đ' 
                                    :  ''                                        
                                }}
                                </del>
                            </p>
                        </div>
                    </routerLink>
                </div>
            </div>
        </div>

        <div class="row align-items-center mt-5">
            <div class="d-flex justify-content-between w-100">
                <h2 class="fw-bolder text-start ms-2">Bộ sưu tập</h2>
                <!-- <div class="d-flex ms-auto">
                    <div v-for="colletion in bst" :key="colletion.id" class="me-2">
                        <button 
                            :value="colletion.id" 
                            type="button" 
                            :class="active === colletion.id ? 'btn btn-outline-dark btn-sm p-2 mt-2 fw-semibold active' : 'btn btn-outline-dark btn-sm p-2 mt-2 fw-semibold'"
                            @click="loctheobst(colletion.id)">
                            {{ colletion.name }} 
                        </button>
                    </div>
                </div> -->
            </div>
        </div>

        <div class="hangmoive p-2 col-12">
            <div class="row g-3">
                <div class="col-12 col-md-6">
                    <div class="row g-2">
                        <div v-for="(product, index) in sanpham.slice(0, 4)" :key="index" class="col-12 col-sm-6 col-md-6">
                            <routerLink :to="`/chitietsanpham/${product.id}`" class="card text-decoration-none">
                                <div class="position-absolute top-0 start-0 badge text-bg-danger m-2">{{ product.discount !== null ? "-" + product.discount + "%" : "" }}</div>
                                <img :src="product.image" class="card-img-top small-img img-fluid" alt="...">
                                <div class="card-body bg-body">
                                    <div class="position-absolute top-0 end-0 m-2 giohang"><i class="bi bi-basket3-fill fs-4 gh m-2"></i></div>
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
                <div class="col-12 col-md-6">
                    <div class="position-relative overflow-hidden">
                        <img src="/img/bst_hip.jfif" class="w-100 img-fluid" alt="">
                        <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 hover-overlay">
                            <routerLink to="/sanpham" type="button" class="btn btn-outline-light btn-sm">Xem tất cả</routerLink>
                        </div>
                    </div>                
                </div>
            </div>
        </div>

        <!-- bài viết nổi bật -->
        <div class="row align-items-center mt-5 mb-2">
            <div class="d-flex justify-content-between flex-wrap">
                <h2 class="fw-bolder text-start ms-2">Bài viết nổi bật</h2>
            </div>
        </div>
            <div class="baiviet m-2">
            <div class="row">
                <div class="col-12 col-md-6 col-lg-3 mb-4">
                    <div class="card img-fluid bg-dark">
                        <img class="card-img-top opacity-25" src="/img/baiviet1.jfif" alt="Card image" style="width:100%">
                    <div class="card-img-overlay text-light mt-5">
                        <p class="card-text">Bộ đôi túi Varsity Jacquard Square và giày Chunky Liner thu hút cực mạnh. Có hai “trợ thủ” trong tủ đồ thì luôn cập nhật trạng thái cực cool👏💃.</p>
                        <a href="#" class="btn btn-outline-light">Xem thêm</a>
                    </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3 mb-4">
                    <div class="card img-fluid bg-dark">
                        <img class="card-img-top opacity-25" src="/img/baiviet2.jfif" alt="Card image" style="width:100%">
                    <div class="card-img-overlay text-light w-100 mt-5">
                        <p class="card-text">Ngoài phiên bản màu trắng thời thượng, Ribbed Ringer Dress cũng tăng tốc gia nhập đường đua và trở thành chiếc đầm được yêu thích nhất.</p>
                        <a href="#" class="btn btn-outline-light">Xem thêm</a>
                    </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3 mb-4">
                    <div class="card img-fluid bg-dark">
                        <img class="card-img-top opacity-25" src="/img/baiviet3.jfif" alt="Card image" style="width:100%">
                    <div class="card-img-overlay text-light w-100 mt-5">
                        <p class="card-text">Dù có bao nhiêu mẫu giày mới, MLB Chunky Liner vẫn luôn là chân ái vì độ trendy, đế chunky hack dáng cùng các phối màu đẹp mê ly ✨
                        </p>
                        <a href="#" class="btn btn-outline-light">Xem thêm</a>
                    </div>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3 mb-4">
                    <div class="card img-fluid bg-dark">
                        <img class="card-img-top opacity-25" src="/img/baiviet4.jfif" alt="Card image" style="width:100%">
                    <div class="card-img-overlay text-light w-100 mt-5">
                        <p class="card-text">Nếu bạn đang tìm kiếm một chiếc quần Jean cơ bản dễ phối đồ, nhưng vẫn đủ gây ấn tượng, thì MLB Basic Embroidery để dành cho bạn 🤘
                        </p>
                        <a href="#" class="btn btn-outline-light">Xem thêm</a>
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
    .giohang{
        background: rgb(222, 222, 222);
        opacity: .5;
        border-radius: 100%;
        width: 40px;
        height: 40px;
    }
    .gh{
        color: #ffffff;
    }
    .small-img{
        height: 300px;
        object-fit: cover;
    }
    .hover-overlay {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }

    .position-relative:hover .hover-overlay {
        opacity: 1;
    }

    .bst .container-xxl .card {
        width: 100%;
    }

    .help{
        width: 320px;
    }
    .product-name {
        width: 280px; 
        white-space: nowrap; 
        overflow: hidden; 
        text-overflow: ellipsis; 
    }
    @media (max-width: 992px) {
        .bst .img-fluid {
            display: none; 
        }
    }

</style>
