document.addEventListener('DOMContentLoaded', function() {
	const editBtn = document.getElementById('editBtn');
	const adminLoginBtn = document.getElementById('adminLoginBtn');
	const adminLogoutBtn = document.getElementById('adminLogoutBtn');
	const adminLoginLink = document.getElementById('adminLoginLink');

	function checkAdminStatus() {
		const isAdmin = localStorage.getItem('isAdmin') === 'true';
		editBtn.style.display = isAdmin ? 'block' : 'none';
		adminLoginBtn.style.display = isAdmin ? 'none' : 'inline-block';
		adminLogoutBtn.style.display = isAdmin ? 'inline-block' : 'none';
	}

	adminLoginLink.addEventListener('click', function() {
		adminLoginBtn.style.display = adminLoginBtn.style.display === 'none' ? 'inline-block' : 'none';
		adminLogoutBtn.style.display = 'none';
	});

	adminLoginBtn.addEventListener('click', function() {
		localStorage.setItem('isAdmin', 'true');
		checkAdminStatus();
	});

	adminLogoutBtn.addEventListener('click', function() {
		localStorage.setItem('isAdmin', 'false');
		checkAdminStatus();
	});

	checkAdminStatus();
});