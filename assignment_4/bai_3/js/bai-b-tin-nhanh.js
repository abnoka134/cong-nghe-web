/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

const oTimKiem = document.getElementById("o-tim-kiem");
const list = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// F1 + F2 + F3. Bộ đếm "Đang hiển thị x/y tin", lọc tin khi gõ (keyup) và thông báo #khong-thay.
function locTin() {
	const tuKhoa = oTimKiem.value;
	const tuKhoaThuong = tuKhoa.toLowerCase();
	const cacMuc = Array.from(list.querySelectorAll("li"));
	let soHien = 0;

	for (const muc of cacMuc) {
		const h3 = muc.querySelector("h3");
		const p = muc.querySelector("p");
		const vanBan = (h3 ? h3.textContent : "") + " " + (p ? p.textContent : "");
		const khop = vanBan.toLowerCase().includes(tuKhoaThuong);
		if (khop) {
			muc.classList.remove("an");
			soHien++;
		} else {
			muc.classList.add("an");
		}
	}

	boDem.textContent = `Đang hiển thị ${soHien}/${cacMuc.length} tin`;

	if (soHien === 0) {
		khongThay.classList.remove("an");
		khongThay.textContent = `Không tìm thấy tin nào cho "${tuKhoa}"`;
	} else {
		khongThay.classList.add("an");
	}
}

oTimKiem.addEventListener("keyup", locTin);
locTin(); // Cập nhật bộ đếm và trạng thái ban đầu khi tải trang

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
list.addEventListener("click", (e) => {
	if (e.target.matches("button.more")) {
		const muc = e.target.closest("li");
		if (!muc) return;
		const doan = muc.querySelector("p");
		if (!doan) return;
		if (doan.classList.contains("day-du")) {
			doan.classList.remove("day-du");
			e.target.textContent = "Read more >>";
		} else {
			doan.classList.add("day-du");
			e.target.textContent = "Thu gọn <<";
		}
	}
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value.trim();
	const noiDung = oNoiDung.value.trim();

	if (tieuDe === "" || noiDung === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const li = document.createElement("li");

	const span = document.createElement("span");
	span.className = "time";
	span.textContent = homNay();

	const h3 = document.createElement("h3");
	h3.textContent = oTieuDe.value;

	const p = document.createElement("p");
	p.textContent = oNoiDung.value;

	const nutMore = document.createElement("button");
	nutMore.type = "button";
	nutMore.className = "more";
	nutMore.textContent = "Read more >>";

	li.append(span, h3, p, nutMore);
	list.prepend(li);

	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";

	locTin();
});
