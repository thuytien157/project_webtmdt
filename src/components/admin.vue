
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
        <h1>Tổng quan</h1>
        <routerLink to="/" class="btn btn-dark">
        <i class="bi bi-box-arrow-right"></i> Logout
        </routerLink>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="card text-dark bg-primary-subtle mb-3">
            <div class="card-header">Tổng sản phẩm</div>
            <div class="card-body">
              <h5 class="card-title">120</h5>
              <p class="card-text">Sản phẩm</p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card text-dark bg-danger-subtle mb-3">
            <div class="card-header">Tổng đơn hàng</div>
            <div class="card-body">
              <h5 class="card-title">45</h5>
              <p class="card-text">Đơn hàng</p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card text-dark bg-info-subtle mb-3">
            <div class="card-header">Tổng người dùng</div>
            <div class="card-body">
              <h5 class="card-title">85</h5>
              <p class="card-text">Users</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">Đơn hàng hôm nay</div>
        <div class="card-body table-wrapper-scroll-y my-custom-scrollbar">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Sản phẩm</th>
                <th>Ngày mua</th>
                <th>TT đơn hàng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>Vue.js Basics</td>
                <td>2024-11-28</td>
                <td><span class="badge bg-success">Hoàn thành</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jane Smith</td>
                <td>Bootstrap Guide</td>
                <td>2024-11-27</td>
                <td><span class="badge bg-warning">Chờ xử lý</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Emily Brown</td>
                <td>React Advanced</td>
                <td>2024-11-25</td>
                <td><span class="badge bg-danger">Đã huỷ</span></td>
              </tr>
              <tr>
                <td>4</td>
                <td>Michael Green</td>
                <td>Laravel Starter</td>
                <td>2024-11-23</td>
                <td><span class="badge bg-info">Đang xử lý</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.my-custom-scrollbar {
  position: relative;
  max-height: 200px;
  overflow-y: auto;
}

.table-wrapper-scroll-y {
  display: block;
}
</style>
