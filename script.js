javascript
// 1. Hiển thị ngày tháng hiện tại lên Banner
const dateBox = document.getElementById('currentDate');
const now = new Date();
const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
dateBox.innerText = `${days[now.getDay()]} - Ngày ${now.getDate()} Tháng ${now.getMonth() + 1} Năm ${now.getFullYear()}`;

// 2. Quản lý Đóng / Mở Modal Popup
const uploadModal = document.getElementById('uploadModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelBtn = document.getElementById('cancelBtn');

function toggleModal(show) {
  if(show) uploadModal.classList.add('active');
  else {
    uploadModal.classList.remove('active');
    document.getElementById('mediaFileInput').value = '';
    document.getElementById('mediaCaptionInput').value = '';
  }
}
openModalBtn.addEventListener('click', () => toggleModal(true));
closeModalBtn.addEventListener('click', () => toggleModal(false));
cancelBtn.addEventListener('click', () => toggleModal(false));

// 3. Xử lý Đăng bài và Đếm số lượng bài viết
const submitPostBtn = document.getElementById('submitPostBtn');
const feedContainer = document.getElementById('feedContainer');
const emptyMsg = document.getElementById('emptyMsg');
const postCountSpan = document.getElementById('postCount');
let totalPosts = 0;

submitPostBtn.addEventListener('click', () => {
  const fileInput = document.getElementById('mediaFileInput');
  const captionInput = document.getElementById('mediaCaptionInput');

  if (!fileInput.files || fileInput.files.length === 0) {
    alert('Vui lòng chọn một file ảnh hoặc video trước khi tải lên!');
    return;
  }

  // ĐÃ SỬA TẠI ĐÂY: Thêm [0] để lấy chính xác file ảnh/video
  const file = fileInput.files[0]; 
  const caption = captionInput.value.trim();
  const fileURL = URL.createObjectURL(file);
  const isVideo = file.type.startsWith('video/');

  const mediaCard = document.createElement('div');
  mediaCard.className = 'media-card';

  let mediaHtml = isVideo ? `<video src="${fileURL}" controls></video>` : `<img src="${fileURL}" alt="Kỷ niệm">`;
  const postTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' - ' + new Date().toLocaleDateString();

  mediaCard.innerHTML = `
    ${mediaHtml}
    <div class="media-body">
      <p class="media-caption">${caption ? caption : 'Không có mô tả cho kỷ niệm này.'}</p>
      <div class="media-footer">
        <span><i class="fa-regular fa-clock"></i> Thời gian: ${postTime}</span>
        <button class="delete-btn"><i class="fa-solid fa-trash-can"></i> Xóa bài</button>
      </div>
    </div>
  `;

  mediaCard.querySelector('.delete-btn').addEventListener('click', () => {
    if(confirm('Bạn có chắc chắn muốn xóa bài đăng kỷ niệm này?')) {
      mediaCard.remove();
      totalPosts--;
      postCountSpan.innerText = totalPosts;
      if (totalPosts === 0) emptyMsg.style.display = 'block';
    }
  });

  feedContainer.insertBefore(mediaCard, feedContainer.firstChild);
  totalPosts++;
  postCountSpan.innerText = totalPosts;
  emptyMsg.style.display = 'none';
  toggleModal(false);
});

// 4. Xử lý chức năng Tùy Chỉnh Thay Đổi Nền Giao Diện
const bgTypeSelect = document.getElementById('bgTypeSelect');
const customColorPicker = document.getElementById('customColorPicker');
const bgImageInput = document.getElementById('bgImageInput');

bgTypeSelect.addEventListener('change', (e) => {
  const value = e.target.value;
  customColorPicker.style.display = 'none';
  bgImageInput.style.display = 'none';
  
  if (value === 'default') {
    document.body.style.backgroundColor = '#f0f2f5';
    document.body.style.backgroundImage = 'none';
  } else if (value === 'color') {
    customColorPicker.style.display = 'block';
    document.body.style.backgroundColor = customColorPicker.value;
    document.body.style.backgroundImage = 'none';
  } else if (value === 'image') {
    bgImageInput.style.display = 'block';
  }
});

customColorPicker.addEventListener('input', (e) => {
  document.body.style.backgroundColor = e.target.value;
});

bgImageInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    const fileURL = URL.createObjectURL(e.target.files[0]);
    document.body.style.backgroundImage = `url('${fileURL}')`;
  }
});
